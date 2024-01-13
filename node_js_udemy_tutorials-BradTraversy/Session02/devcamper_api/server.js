const express = require("express");
const dotenv = require("dotenv");

//Load env vars

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
  // res.send("<h1 style='font-family:sans-serif'>Hello from express</h1>");
  // res.send({ name: "Brad" });
  // OR (only for JSON content)
  // res.json({ name: "Brad" });
  // res.sendStatus(400);
  // OR (if we want to send error message)
  //   res.status(400).json({ message: "Something went wrong" });
  res.status(200).json({ success: true, data: { id: 1 } });
});

app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp ${req.params.id}` });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "Create new bootcamps" });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
