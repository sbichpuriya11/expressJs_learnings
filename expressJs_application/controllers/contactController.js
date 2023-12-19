const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access private

const getContactById = asyncHandler(async (req, res) => {
  const user = await Contact.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`User with ${req.params.id} not found`);
  }
  res.status(200).json(user);
});

//@desc Create new Contact
//@route POST /api/contacts
//@access private

const postContact = asyncHandler(async (req, res) => {
  console.log(`Body Req ${JSON.stringify(req.body)}`);
  const { name, role, company } = req.body;
  if (!name || !role || !company) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    role,
    company,
    user_id: req.user.id,
  });

  res.status(200).json(contact);
});

//@desc Update existing contact
//@route PUT /api/contacts/:id
//@access private
const putContact = asyncHandler(async (req, res) => {
  const user = await Contact.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`User with ${req.params.id} not found`);
  }

  console.log("User fetched::", user);
  const { name, role, company } = req.body;
  if (!name || !role || !company) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  console.log("Updated Contact", updatedContact);
  res.status(200).json(updatedContact);
});

//@desc Delete existing contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const user = await Contact.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`User with ${req.params.id} not found`);
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Details deleted for ${req.params.id}` });
});

module.exports = {
  getContact,
  getContactById,
  postContact,
  putContact,
  deleteContact,
};
