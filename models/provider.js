const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Provider {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_providers`, cb);
  }

  static findInn(data, cb) {
    console.log(data);
    db.get(
      `SELECT * FROM id_${data.workshop}_providers WHERE inn=?`,
      data.inn,
      cb
    );
  }

  static new(data, cb) {
    console.log(data);
    const sql = `INSERT INTO id_${data.workshop}_providers (name,inn,adress,manager,phone,author) VALUES (?,?,?,?,?,?)`;
    return db.run(
      sql,
      data.name,
      data.inn,
      data.adress,
      data.manager,
      data.phone,
      data.userId,
      cb
    );
  }
}
module.exports = db;
module.exports.Provider = Provider;
