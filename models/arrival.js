const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Arrival {
  static all(id, cb) {
    db.all(`SELECT * FROM id_${id}_arrivals`, cb);
  }
  static new(data, cb) {
    console.log(data);
    const sql = `INSERT INTO id_${data.workshop}_arrivals (provider,amount,createdata,innumber,inmumberdata,data) VALUES (?,?,?,?,?,?)`;
    return db.run(
      sql,
      data.provider,
      data.ammout,
      data.createddata,
      data.innomer,
      data.indata,
      data.data,
      cb
    );
  }
}
module.exports = db;
module.exports.Arrival = Arrival;
