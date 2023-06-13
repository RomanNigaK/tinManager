const { Router } = require("express");
const Provider = require("../models/provider").Provider;

const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;

  Provider.findInn(data, (err, row) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    if (!!row) {
      return res.status(208).send({
        data: [],
        error: {},
        messageFromServer: "Поставщик уже сохранен",
      });
    }
    Provider.new(data, (err, provider) => {
      if (err)
        return res.status(400).send({
          data: [],
          error: { message: err.message },
          messageFromServer: "",
        });

      res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Поставщик сохранен",
      });
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;

  Provider.all(data.id, (err, provider) => {
    if (err) return res.status(400).send({ message: err.message });

    if (!provider.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Список поставщиков пуст",
      });
    }

    res.status(200).send({
      data: provider,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
