const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Sale {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_sales`, cb);
  }
  static new(data, cb) {
    let d = new Date();

    const sql = `INSERT INTO id_${data.workshop}_sales (pay,items,summa,movement,link,comment,author,date) VALUES (?,?,?,?,?,?,?,?)`;
    return db.run(
      sql,
      data.pay,
      data.items,
      data.summa,
      data.movement,
      data.link,
      data.comment,
      data.userId,
      d,
      cb
    );
  }

  static updatePay(data, cb) {
    db.all(
      `UPDATE id_${data.workshop}_sales SET pay = 1 WHERE id = ?`,
      data.link,
      cb
    );
  }

  static updateMovement(data, cb) {
    db.all(
      `UPDATE id_${data.workshop}_sales SET movement = '${data.movement}' WHERE id = ?`,
      data.id,
      cb
    );
  }
}
module.exports = db;
module.exports.Sale = Sale;
