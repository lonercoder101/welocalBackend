const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    jobType: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
      applierId: {
          type: schema.Types.ObjectId,
          ref: "user",
          required: false,
      },
      biddingPrice: {
          type: String,
          required: false,
      },

    // financial: {
    //   type: schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    // userPdf: {
    //   type: schema.Types.Mixed,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", postSchema);
