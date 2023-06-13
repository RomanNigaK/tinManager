const { Router } = require("express");
const Rko = require("../models/rko").Rko;

const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;
  console.log(data);
  data.workshop = req.headers.workshop;
  data.userId = req.headers.userid;

  Rko.new(data, (err, rows) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    return res.status(200).send({
      data: rows,
      error: {},
      messageFromServer: "Наименование добавлено",
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;
  Rko.all(data.id, (err, rows) => {
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
