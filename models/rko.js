const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Rko {
  static all(workshop, cb) {
    db.all(
      `SELECT * FROM basisforcashflow where workshop = 1 or workshop=${workshop}`,
      cb
    );
  }

  static new(data, cb) {
    let d = new Date();

    const sql = `INSERT INTO basisforcashflow (name,isappitemname,author,workshop) VALUES (?,?,?,?)`;
    return db.run(
      sql,
      data.name,
      data.isappitemname,
      data.userId,
      data.workshop,
      cb
    );
  }
}
module.exports = db;
module.exports.Rko = Rko;
