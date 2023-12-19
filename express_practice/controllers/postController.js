const asyncHandler = require("express-async-handler");
const POST = require("../models/postModel");

//@desc Get all POSTs
//@route GET /api/posts/
//@access public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await POST.find();
  res.status(200).json(posts);
});

//@desc Get specific POST
//@route GET /api/posts/:id
//@access public
const getPostById = asyncHandler(async (req, res) => {
  const post = await POST.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error(`No record found for ${req.params.id}`);
  }
  res.status(200).json(post);
});

//@desc Create new POST
//@route POST /api/posts/
//@access public
const createNewPost = asyncHandler(async (req, res) => {
  const { creator, title, description } = req.body;
  if (!creator || !title || !description) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const post = await POST.create({ creator, title, description });
  res.status(200).json(post);
});

//@desc Update specific POST
//@route PUT /api/posts/:id
//@access public

const updatePost = asyncHandler(async (req, res) => {
  const { creator, title, description } = req.body;
  const post = await POST.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error(`No record found for ${req.params.id}`);
  }
  if (!creator || !title || !description) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  console.log("This is executed..");
  const updatedUser = await POST.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//@desc Delete existing POST
//@route DELETE /api/posts/:id
//@access public
const deletePost = asyncHandler(async (req, res) => {
  const post = await POST.findById(req.params.id);
  console.log(`Post::${post}`);
  if (!post) {
    res.status(404);
    throw new Error(`No record found for ${req.params.id}`);
  }
  await POST.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleting post for ${req.params.id}` });
});

module.exports = {
  getPosts,
  getPostById,
  createNewPost,
  updatePost,
  deletePost,
};

// [
//     {
//       "_id": "65815d9f02545ef98ee6d1b5",
//       "creator": "Somil Bichpuriya",
//       "title": "Express Js Learning",
//       "description": "This is demo course for Express Js Tutorials by NikkieMedia",
//       "createdAt": "2023-12-19T09:08:47.950Z",
//       "updatedAt": "2023-12-19T09:08:47.950Z",
//       "__v": 0
//     },
//     {
//       "_id": "6581778e4ca9699f0627974b",
//       "creator": "Jin Juliet",
//       "title": "Node Js Learning",
//       "description": "This course provide learning on node js and mongoDb",
//       "createdAt": "2023-12-19T10:59:26.389Z",
//       "updatedAt": "2023-12-19T11:06:11.073Z",
//       "__v": 0
//     }
//   ]
