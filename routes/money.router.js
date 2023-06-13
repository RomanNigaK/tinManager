const { Router } = require("express");
const Money = require("../models/money").Money;

const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;

  data.workshop = req.headers.workshop;
  data.userId = req.headers.userid;

  console.log(req.headers.workshop);
  const message = {
    1: "Оплата по поступлению произведена",
    2: "Оплата по реализации произведена",
    3: "Денежные средства внесены",
  };

  console.log(message[data.category]);
  Money.new(data, (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    Money.lastRow(data.workshop, (err, row) => {
      return res.status(200).send({
        data: row,
        error: {},
        messageFromServer: message[data.category] || "Выполнено",
      });
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;
  Money.all(data.id, (err, rows) => {
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

router.post("/count", (req, res) => {
  const data = req.body;
  data.id = req.headers.workshop;
  Money.count(data.id, (err, rows) => {
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
      data: rows[0]["Count(*)"],
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/kassa", (req, res) => {
  const data = req.body;
  data.id = req.headers.workshop;
  Money.kassa(data.id, (err, rows) => {
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
        messageFromServer: "",
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
