const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Untitled Cover Letter",
    },

    content: {
      type: String,
      default: "",
    },

    company: String,

    jobTitle: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CoverLetter", coverLetterSchema);