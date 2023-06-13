const { Router } = require("express");
const Sale = require("../models/sale").Sale;
const Material = require("../models/material").Material;
const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;
  let messages = {
    enteringbalances: "Ввод остатков выполнен",
    writedowns: "Списание материала выполнено",
    entrance: "Поступление сохранено",
  };

  Sale.new(data, (err, rows) => {
    if (err) console.log(err);
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
  Sale.all(data.id, (err, rows) => {
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
router.post("/updatepay", (req, res) => {
  const data = req.body;

  data.workshop = req.headers.workshop;

  Sale.updatePay(data, (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    return res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/updatemovement", (req, res) => {
  const data = req.body;
  data.workshop = req.headers.workshop;
  console.log(data);

  Sale.updateMovement(data, (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    return res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
