const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user").User;
module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }

  try {
    console.log("middleware", req.body);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token111", token);

    if (!token) {
      return res.status(401).send({
        data: [],
        error: { message: "пользователь не авторизован" },
        messageFromServer: "",
      });
    }

    console.log("istoken", true);
    User.findUserLogin(req.body.login, (err, user) => {
      if (!user) {
        return res.status(401).send({
          data: [],
          error: { message: "пользователь не авторизован" },
          messageFromServer: "",
        });
      }
      console.log("token", token);
      console.log("tokenbody", req.body.token);
      console.log("tokenuser", user.pass);
      if (token !== user.pass) {
        return res.status(401).send({
          data: [],
          error: { message: "Токен не действителен" },
          messageFromServer: "",
        });
      } else {
        console.log("next");
        next();
      }
    });

    //const fromToken = jwt.verify(token, config.get("jwtSecret"));
    //console.log(fromToken, "fromToken");
    //req.user = fromToken;
  } catch (error) {
    res.status(401).json({ message: "Пользователь не авторизован111111" });
  }
};
