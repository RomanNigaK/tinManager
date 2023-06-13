const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Material {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_materials`, cb);
  }
  static standard(cb) {
    db.all(`SELECT * FROM materials`, cb);
  }
  static findId(data, cb) {
    db.get(
      `SELECT * FROM  id_${data.workshop}_materials WHERE id = ?`,
      data.id,
      cb
    );
  }

  static updateStock(data, cb) {
    JSON.parse(data.items).forEach((element) => {
      let quantity = Math.round(element.quantity * 100) / 100;

      if (data.type === "writedowns") quantity = quantity * -1;
      if (data.type === "sales") quantity = quantity * -1;
      db.all(
        `UPDATE id_${data.workshop}_materials SET stock = stock + ${quantity}, 
        costprice = ${element.price ? element.price / 100 : null},
        inprice = ${element.price ? element.price : null} WHERE id = ?`,
        element.iditem,
        cb
      );
    });
  }

  static updateStockDec(data, cb) {
    data.items.forEach((element) => {
      let quantity = element.quantity;
      let sqrt = quantity * (element.h / 100);

      sqrt = (Math.round(quantity * 100) / 100) * -1;

      console.log("sqrt", sqrt);
      db.all(
        `UPDATE id_${data.workshop}_materials SET stock = stock + ${sqrt} WHERE id = ?`,
        element.idMaterial,
        cb
      );
    });
  }

  static deleteid(data, cb) {
    console.log(data);
    db.all(
      `UPDATE id_${data.workshop}_materials SET deleted = 1 WHERE id = ?`,
      data.id,
      cb
    );
  }
  static new(data, cb) {
    console.log(data);
    const sql = `INSERT INTO id_${data.workshop}_materials (name,coverage,color,thickness,stock,author,deleted) VALUES (?,?,?,?,0,?,0)`;
    return db.run(
      sql,
      data.name,
      data.coverage,
      data.color,
      data.thickness,

      data.userId,

      cb
    );
  }
}
module.exports = db;
module.exports.Material = Material;
