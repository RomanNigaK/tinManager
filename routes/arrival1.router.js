const { Router } = require("express");
const Arrival = require("../models/arrival").Arrival;
const CreateTable = require("../models/createTables").CreateTable;
const router = Router();

router.post("/new", (req, res) => {
  const data = req.body;
  Arrival.new(data, (err, arrivals) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    res.status(200).send({
      data: arrivals,
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/list", (req, res) => {
  const data = req.body;
  console.log("data1", data);
  Arrival.all(data.id, (err, arrivals) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    if (!arrivals.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Нет данных",
      });
    }

    res.status(200).send({
      data: arrivals,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
