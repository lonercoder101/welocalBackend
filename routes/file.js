const express = require("express");
const file = require("../models/file");

const router = express.Router();

//post request
router.post("/", (req, res) => {
  console.log("+++++++", req.body);
  const { userId, invoice, userPdf, financial, status } = req.body;
  const newFile = new file({
    userId,
    invoice,
    userPdf,
    financial,
    status,
  });
  newFile
    .save()
    .then((f) => {
      res.json(f);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
});

//fetch request by Financial
router.post("/fetchInvFinancial", (req, res) => {
  file
    .find({ financial: req.body.finId })
    .populate("userId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((file) => {
      res.json(file);
    });
});

//fetch request by Company
router.post("/fetchInvCompany", (req, res) => {
  file
    .find({ userId: req.body.userId })
    .populate("financial")
    .sort({ createdAt: "desc" })
    .exec()
    .then((file) => {
      res.json(file);
    });
});

//Approve Invoice request by Financial
router.post("/ApproveInvoice", (req, res) => {
  file
    .findByIdAndUpdate(req.body.id, { status: "Approved" })
    .exec()
    .then((file) => {
      res.json(file);
    });
});

//Delete Invoice request by Financial
router.post("/DeleteInvoice", (req, res) => {
  file
    .findByIdAndRemove(req.body.id)
    .then((f) => {
      res.json(f);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;
