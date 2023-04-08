const { application } = require("express");
const express = require("express");
const router = express.Router();
const { logs, users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/Auth");

router.get("/", async (req, res) => {
  try {
    const usrs = await users.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log(usrs);
    res.json(usrs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "Wrong Username or Password1" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username or Password2" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "asdkjfh2134ujashged"
    );

    res.json({
      accessToken,
      id: user.id,
      fName: user.firstName,
      lName: user.lastName,
    });
  });
  await logs
    .create(
      {
        idOfEvent: user.id,
        activity: `User ${user.username} logged in`,
      },
      { fields: ["idOfEvent", "activity"] }
    )
    .catch((error) => {
      console.error(error);
    });
});

router.post("/logout", async (req, res) => {
  const { username, id } = req.body;
  await logs
    .create(
      {
        idOfEvent: id,
        activity: `User ${username} logged out`,
      },
      { fields: ["idOfEvent", "activity"] }
    )
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
