const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/Auth");

router.get("/", async (req, res) => {
  const getUsers = await Users.findAll();
  res.json(getUsers);
});

router.post("/create", async (req, res) => {
  const values = req.body;
  const users = await Users.findAll();
  const checker = users.filter((x) => x.username === values.username);
  if (checker) res.json({ error: "username already exists" });
  else {
    bcrypt.hash(values.password, 10).then((hashpw) => {
      Users.create({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contactNum: values.contactNum,
        username: values.username,
        password: hashpw,
      });
      res.json({ success: "success" });
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "Wrong Username or Password1" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username or Password2" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "asdkjfh2134ujashged"
    );

    res.json({ accessToken, fName: user.firstName, lName: user.lastName });
  });
});

module.exports = router;
