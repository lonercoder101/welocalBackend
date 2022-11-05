const express = require("express");
const file = require("../models/file");

const router = express.Router();

//post request
router.post("/", (req, res) => {
  console.log("+++++++", req.body);
  const { userId, description, jobType,price, status } = req.body;
  const newFile = new file({
    userId,
    description,
    price,
    jobType,
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
  console.log(req.body)
  file
    .find({ jobType: req.body.jobType })
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
      .populate("applierId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((file) => {
      res.json(file);
    });
});

//Approve Invoice request by Financial
router.post("/ApproveInvoice", (req, res) => {
  console.log(req.body, '+++++')
  file
    .findByIdAndUpdate(req.body.id, { status: "Applied", biddingPrice : req.body.biddingPrice,
      applierId: req.body.applierId })
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

//Delete Invoice request by Financial
router.post("/AcceptInvoice", (req, res) => {
  file
      .findByIdAndUpdate(req.body.id, { status: "Accepted By User" })
      .then((f) => {
        res.json(f);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("An error occured");
      });
});

module.exports = router;
