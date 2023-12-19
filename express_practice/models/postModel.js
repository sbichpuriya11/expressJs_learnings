const mongoose = require("mongoose");

const post = mongoose.Schema(
  {
    creator: {
      type: String,
      required: [true],
    },
    title: {
      type: String,
      required: [true],
    },

    description: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post);
