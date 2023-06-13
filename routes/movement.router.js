const { Router } = require("express");
const Movement = require("../models/movement").Movement;
const Material = require("../models/material").Material;

const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;
  console.log("data", data);
  let messages = {
    enteringbalances: "Ввод остатков выполнен",
    writedowns: "Списание материала выполнено",
    entrance: "Поступление сохранено",
    sales: "Отправлено в цех",
  };

  Material.updateStock(data, (err) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });
  });

  Movement.new(data, (err, rows) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    return res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: messages[data.type],
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;
  Movement.all(data.id, (err, rows) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    if (!rows.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Нет данных",
      });
    }

    res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/addprovider", (req, res) => {
  const data = req.body;
  Movement.all(data.id, (err, rows) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    if (!rows.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Нет данных",
      });
    }

    res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
