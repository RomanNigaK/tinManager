const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Movement {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_movements`, cb);
  }
  static new(data, cb) {
    let d = new Date();

    const sql = `INSERT INTO id_${data.workshop}_movements (type,items,link,comment,author,date) VALUES (?,?,?,?,?,?)`;
    return db.run(
      sql,
      data.type,
      data.items,
      data.link,
      data.comment,
      data.userId,
      d,
      cb
    );
  }
}
module.exports = db;
module.exports.Movement = Movement;
