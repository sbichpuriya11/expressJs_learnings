const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Registering an user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password ${hashedPassword}`);

  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    res.status(200).json({ _id: user.id, _username: username, email: email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login an user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  //compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password not valid");
  }

  res.status(200).json({ message: "User logged in successfully" });
});

//@desc Get current logged in user
//@route POST /api/users/current
//@access private

const fetchCurrent = asyncHandler(async (req, res) => {
  res.json(req.user);
  res.status(200).json({ message: "Current logged in user" });
});

module.exports = { registerUser, loginUser, fetchCurrent };

// User 1
// {
//   "username": "sbich11",
//   "password": "1234",
//   "email": "somil@gmail.com"
// }

// Data1
// [
//   {
//     "_id": "65811ba1410f10a1d16edc94",
//     "user_id": "65811ab347eb3e5a6142d9e9",
//     "name": "Somil Bichpuriya",
//     "company": "Infogain Soln. Pvt. Ltd.",
//     "role": "Software Engineer",
//     "createdAt": "2023-12-19T04:27:13.908Z",
//     "updatedAt": "2023-12-19T04:27:13.908Z",
//     "__v": 0
//   },
//   {
//     "_id": "65811bb7410f10a1d16edc96",
//     "user_id": "65811ab347eb3e5a6142d9e9",
//     "name": "Anukul Singhal",
//     "company": "Infogain Soln. Pvt. Ltd.",
//     "role": "Manager",
//     "createdAt": "2023-12-19T04:27:35.242Z",
//     "updatedAt": "2023-12-19T04:27:35.242Z",
//     "__v": 0
//   }
// ]

// User 2
// {
//   "username": "ankitb133",
//   "password": "33342",
//   "email": "ankit@gmail.com"
// }

// Data 2
// [
//   {
//     "_id": "65811d024902aaad7930d91d",
//     "user_id": "65811c684902aaad7930d91a",
//     "name": "Ankit Bichpuriya",
//     "company": "HSBC Pvt. Ltd.",
//     "role": "ML Engineer",
//     "createdAt": "2023-12-19T04:33:06.517Z",
//     "updatedAt": "2023-12-19T04:33:06.517Z",
//     "__v": 0
//   }
// ]
