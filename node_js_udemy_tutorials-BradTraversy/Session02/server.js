const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const logger = require("./middleware/logger");

//User defined middleware for logging
// app.use(logger);

// ThirdParty middleware for logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

app.use(errorHandler);

//app.get("/", (req, res) => {
// res.send("<h1 style='font-family:sans-serif'>Hello from express</h1>");
// res.send({ name: "Brad" });
// OR (only for JSON content)
// res.json({ name: "Brad" });
// res.sendStatus(400);
// OR (if we want to send error message)
//   res.status(400).json({ message: "Something went wrong" });
//res.status(200).json({ success: true, data: { id: 1 } });
//});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  //Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});
