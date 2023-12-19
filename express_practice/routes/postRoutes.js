const express = require("express");
const {
  getPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts).post("/", createNewPost);

router
  .get("/:id", getPostById)
  .put("/:id", updatePost)
  .delete("/:id", deletePost);

module.exports = router;
