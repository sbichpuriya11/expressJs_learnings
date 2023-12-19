const express = require("express");
const {
  registerUser,
  fetchCurrent,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/current", validateToken, fetchCurrent);

router.post("/login", loginUser);

module.exports = router;
