const { Router } = require("express");
const Product = require("../models/product").Product;

const router = Router();

router.post("/list", (req, res) => {
  const data = req.body;

  Product.all(data, (err, product) => {
    if (err) return res.status(400).send({ message: err.message });

    if (!product.length) {
      return res.status(200).send({
        data: [],
        error: {},
        messageFromServer: "Нет данных",
      });
    }

    res.status(200).send({
      data: product,
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
