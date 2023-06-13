const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Money {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_money  LIMIT 0,100  `, cb);
  }

  static lastRow(id, cb) {
    console.log("lastrow", id);
    db.all(`SELECT * FROM id_${id}_money ORDER BY id DESC LIMIT 1  `, cb);
  }

  static kassa(id, cb) {
    db.all(`SELECT type, summa FROM id_${id}_money`, cb);
  }
  static count(id, cb) {
    db.all(`SELECT Count(*) FROM id_${id}_money`, cb);
  }

  static new(data, cb) {
    let d = new Date();

    const sql = `INSERT INTO id_${data.workshop}_money 
                (type,summa,category,link,basis,date,author,comment) 
                VALUES (?,?,?,?,?,?,?,?)`;
    return db.run(
      sql,
      data.type,
      data.summa,
      data.category,
      data.link,
      data.basis,
      d,
      data.userId,
      data.comment,
      cb
    );
  }
}
module.exports = db;
module.exports.Money = Money;
