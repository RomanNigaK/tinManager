const { Router } = require("express");
const Client = require("../models/client").Client;

const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;

  Client.new(data, (err, client) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    res.status(200).send({
      data: [],
      error: {},
      messageFromServer: "Новый клиент создан",
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;

  Client.all(data.id, (err, client) => {
    if (err) return res.status(400).send({ message: err.message });

    if (!client.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Список клиентов пуст",
      });
    }

    res.status(200).send({
      data: client,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
