const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/Auth");
const { ebins, logs } = require("../models");

router.get("/bins", async (req, res) => {
  try {
    const bins = await ebins.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(bins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/logs", async (req, res) => {
  try {
    const lgs = await logs.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      limit: 20,
      order: [["dateCreated", "DESC"]],
    });
    res.json(lgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/data", async (req, res) => {
  //id
  //name: lcoation_of_bin
  //action: 1
  //status: 0/1
  const data = req.body;
  console.log("data here:", data);

  await ebins.update(
    {
      status: data.status,
    },
    {
      where: { id: data.id },
    }
  );

  await logs.create({
    idOfEvent: data.id,
    activity:
      data.status === 1
        ? `${data.name} status has changed to FULL`
        : `${data.name} status has changed to EMPTY`,
  });

  const stats = await ebin.findAll();

  console.log("stats:", stats);

  res.status(200).json({ message: "Data received" }, data);
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "HIIII" });
});

module.exports = router;

///create models for logs and ebin
