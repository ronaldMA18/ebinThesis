const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/Auth");

router.post("/data", (req, res) => {
  const data = req.body;
  console.log(data);

  res.status(200).json({ message: "Data received" });
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "HIIII" });
});

module.exports = router;

//new: api.js change in index.js
