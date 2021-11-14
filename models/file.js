const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    invoice: {
      type: String,
      unique: true,
      required: true,
    },
    financial: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userPdf: {
      type: schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", postSchema);
