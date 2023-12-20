const express = require("express");
const noteRouter = require("./routes/notesRoute");
const userRouter = require("./routes/userRoute");
const dbConnect = require("./config/dbConfig");

const app = express();
const dotenv = require("dotenv").config();

dbConnect();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`HTTP Method - ${req.method}, URL - ${req.url}`);
  next();
});

app.use("/api/note", noteRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
