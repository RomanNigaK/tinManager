const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Workshop {
  static get(id, cb) {
    db.all(`SELECT * FROM workshop WHERE id=?`, id, cb);
  }

  static updateSetting(data, cb) {
    const jsonSetting = JSON.stringify(data.setting);
    console.log(jsonSetting);
    db.all(
      `UPDATE workshop SET setting = '${jsonSetting}'  WHERE id = ?`,
      data.id,
      cb
    );
  }
}
module.exports = db;
module.exports.Workshop = Workshop;
