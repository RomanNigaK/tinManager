const { Router } = require("express");
const Workshop = require("../models/worshop").Workshop;
const User = require("../models/user").User;
const router = Router();

const CreateTable = require("../models/createTables").CreateTable;

CreateTable.startApp();

router.post("/get", (req, res) => {
  const data = req.body;
  console.log(data);
  Workshop.get(data.id, (err, workshop) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });

    User.findUserWorkshop(data.id, (err, users) => {
      if (err)
        return res.status(400).send({
          data: [],
          error: { message: err.message },
          messageFromServer: "",
        });
      workshop[0].users = users;
      console.log("workshop", workshop);

      return res.status(200).send({
        data: workshop,
        error: {},
        messageFromServer: "",
      });
    });
  });
});

router.post("/apdatesetting", (req, res) => {
  const data = req.body;
  console.log(data);

  Workshop.updateSetting(data, (err, workshop) => {
    if (err)
      return res.status(400).send({
        data: [],
        error: { message: err.message },
        messageFromServer: "",
      });
    return res.status(200).send({
      data: [],
      error: {},
      messageFromServer: "Изменения сохранены",
    });
  });
});

router.post("/deletetin", (req, res) => {
  const data = req.body;
  console.log(data);

  CreateTable.deleteTin(data.id, () => {
    return res.status(200).send({
      data: [],
      error: {},
      messageFromServer: "",
    });
  });
});

module.exports = router;
