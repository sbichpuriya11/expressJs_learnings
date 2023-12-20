const express = require("express");
const { signUp, singIn } = require("../controller/userController");
const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", singIn);

module.exports = router;
