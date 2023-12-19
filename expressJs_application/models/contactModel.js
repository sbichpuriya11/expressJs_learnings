const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    company: {
      type: String,
      required: [true, "Please add the company"],
    },
    role: {
      type: String,
      required: [true, "Please add the role"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
