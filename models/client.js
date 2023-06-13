const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Client {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_buyers`, cb);
  }

  static new(data, cb) {
    console.log(data);
    const sql = `INSERT INTO id_${data.workshop}_buyers (name,phone,author,sale) VALUES (?,?,?,?)`;
    return db.run(sql, data.name, data.phone, data.userId, data.sale, cb);
  }
}
module.exports = db;
module.exports.Client = Client;
