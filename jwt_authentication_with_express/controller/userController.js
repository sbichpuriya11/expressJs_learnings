const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const singIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signUp = async (req, res) => {
  // Existing User check;
  // Hashed Password
  // User Creation
  // Token Generate
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

    res.status(201).json({ user: result, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signUp, singIn };
