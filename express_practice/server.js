const express = require("express");
const router = require("./routes/postRoutes");
const connectDb = require("./config/dbConnect");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const dotenv = require("dotenv").config();

const port = process.env.port || 3001;

connectDb();
app.use(express.json());
app.use("/api/posts", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
