const express = require("express");
const {
  getNote,
  deleteNote,
  updateNote,
  createNote,
} = require("../controller/noteController");
const auth = require("../middleware.js/auth");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNote);

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;
