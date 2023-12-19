const express = require("express");

const router = express.Router();

const {
  getContact,
  postContact,
  putContact,
  deleteContact,
  getContactById,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(postContact);

router.route("/:id").get(getContactById).put(putContact).delete(deleteContact);

module.exports = router;
