const { Router } = require("express");
const config = require("config");
const User = require("../models/user").User;
const CreateTable = require("../models/createTables").CreateTable;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(config.dbName);

const jwt = require("jsonwebtoken");
const router = Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/login", (req, res) => {
  console.log("Auth Router");

  const data = req.body;
  console.log("body", data);

  User.findUserLogin(data.login, (err, user) => {
    if (!user) {
      console.log("user false");

      res.status(401).send({
        data: [],
        error: { message: "Не верная пара логин/пароль" },
        messageFromServer: "",
      });
      return;
    }

    bcrypt.compare(data.pass, user.pass, (err, isMatch) => {
      if (err) {
        console.log("err");
        return err;
      }

      if (!isMatch) {
        console.log(isMatch);
        return res.status(401).send({
          data: [],
          error: { message: "Не верная пара логин/пароль" },
          messageFromServer: "",
        });
      }
      // const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      //   expiresIn: "1h",
      // });
      console.log(user);

      User.findWorkShop(user.workshop, (err, workshop) => {
        if (err) return res.status(400).send({ message: err.message });
        console.log("workshop", workshop);
        if (!workshop) {
          return res.status(400).send({
            data: [],
            error: {},
            messageFromServer: "Ошибка загрузки данных",
          });
        } else {
          res.send({
            data: {
              id: user.id,
              name: user.nameUser,
              sename: user.senameUser,
              login: user.login,
              workshop: user.workshop,
              access: user.access,
              token: user.pass,
            },
            error: {},
            messageFromServer: "",
          });
        }
      });
    });
  });
});

router.post("/new", (req, res) => {
  const data = req.body;

  User.findUserEmail(data.email, (err, user) => {
    if (!user) {
      User.findUserLogin(data.login, (err, user) => {
        if (!user) {
          let i = 0;
          User.create(data, (err, user) => {
            if (err) console.log(err);
            CreateTable.material(data.id);
            CreateTable.movements(data.id);
            CreateTable.provider(data.id);
            CreateTable.buyer(data.id);
            CreateTable.sales(data.id);
            CreateTable.money(data.id);

            if (i > 0) {
              return res.status(201).send({
                data: [],
                error: {},
                messageFromServer: "Пользователь успешно зарегистрирован",
              });
            }

            i++;
          });
        } else {
          return res.status(400).send({
            data: [],
            error: { message: "Логин занят" },
            messageFromServer: "",
          });
        }
      });
    } else {
      return res.status(400).send({
        data: [],
        error: { message: "Пользователь с таким Email зарегистрирован" },
        messageFromServer: "",
      });
    }
  });
});

router.post("/auth", async (req, res) => {
  console.log("req.body", req.body);
  try {
    User.findUserLogin(req.body.login, (err, user) => {
      if (err) console.log(err);
      if (!user) {
        console.log("usernotfound");
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      User.findWorkShop(user.workshop, (err, workshop) => {
        if (err) return res.status(400).send({ message: err.message });
        console.log("workshop", workshop);
        if (!workshop) {
          return res.status(400).send({
            data: [],
            error: {},
            messageFromServer: "Ошибка загрузки данных",
          });
        } else {
          res.send({
            data: {
              id: user.id,
              name: user.nameUser,
              sename: user.senameUser,
              login: user.login,
              workshop: user.workshop,
              access: user.access,
              token: user.pass,
              //setting: JSON.parse(workshop.setting),
            },
            error: {},
            messageFromServer: "",
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/adduser", (req, res) => {
  const data = req.body;
  console.log(data);
  User.findUserLogin(data.login, (err, user) => {
    if (!user) {
      User.adduser(data, (err, user) => {
        User.lastRow((err, newuserrow) => {
          return res.status(201).send({
            data: newuserrow,
            error: {},
            messageFromServer: "Пользователь успешно добавлен",
          });
        });
      });
    } else {
      return res.status(400).send({
        data: [],
        error: { message: "Логин занят" },
        messageFromServer: "",
      });
    }
  });
});

router.post("/delete", (req, res) => {
  const data = req.body;
  console.log(data);
  User.deleteUser(data.idUser, (err, user) => {
    if (err) console.log(err);

    return res.status(200).send({
      data: [],
      error: "",
      messageFromServer: "Пользователь удален",
    });
  });
});

module.exports = router;
