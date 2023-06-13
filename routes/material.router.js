const { Router } = require("express");
const Material = require("../models/material").Material;

const router = Router();

router.post("/list", (req, res) => {
  const data = req.body;

  console.log("material/list", data);
  Material.all(data.id, (err, material) => {
    if (err) return res.status(400).send({ message: err.message });

    if (!material.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Список материаллов пуст",
      });
    }

    res.status(200).send({
      data: material,
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/liststandart", (req, res) => {
  const data = req.body;
  console.log("material/liststandart", data);
  Material.standard((err, material) => {
    if (err) return res.status(400).send({ message: err.message });

    if (!material.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Список стандартных материалов пуст",
      });
    }

    res.status(200).send({
      data: material,
      error: {},
      messageFromServer: "",
    });
  });
});

router.post("/new", (req, res) => {
  const data = req.body;
  console.log("data", data);
  Material.new(data, (err, material) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    res
      .status(201)
      .send({ data: [], error: {}, messageFromServer: "Запись добавлена" });
  });
});

router.post("/deleteid", (req, res) => {
  const data = req.body;
  console.log("data", data);
  Material.findId(data, (err, material) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    console.log(material);
    if (material.stock) {
      returnSend = true;
      return res.status(201).send({
        data: [],
        error: {},
        messageFromServer: "Не возможно удалить материал, есть на остатке",
      });
    }
    Material.deleteid(data, (err, material) => {
      if (err)
        return res.status(400).send({
          data: [],
          error: { message: err.message },
          messageFromServer: "",
        });

      res
        .status(201)
        .send({ data: [], error: {}, messageFromServer: "Запись удалена" });
    });
  });
});

router.post("/save", (req, res) => {
  const data = req.body;
  try {
    data.materials.forEach((element) => {
      element.userId = data.userId;
      element.workshop = data.workshop;
      Material.new(element, (err, material) => {
        if (err) throw err;
      });
    });
    res.status(201).send({
      data: [],
      error: {},
      messageFromServer: "Список материалов сохранен",
    });
  } catch (error) {
    return res.status(400).send({
      data: [],
      error: { message: error.message },
      messageFromServer: "",
    });
  }
});

router.post("/updatestock", (req, res) => {
  const data = req.body;
  data.workshop = req.headers.workshop;

  Material.updateStockDec(data, (err) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    res.status(200).send({
      data: [],
      error: {},
      messageFromServer: "",
    });
  });
});
module.exports = router;
