const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");

//Load env vars

dotenv.config({ path: "./config/config.env" });

const app = express();

//Route files
const bootcamps = require("./routes/bootcamps");
const logger = require("../middleware/logger");

//User defined middleware for logging
// app.use(logger);

// ThirdParty middleware for logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

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

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
