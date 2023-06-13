const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);
const bcrypt = require("bcryptjs");

class User {
  static all(cb) {
    db.all("SELECT * FROM users", cb);
  }
  static findUserEmail(email, cb) {
    db.get("SELECT * FROM  workshop WHERE email = ?", email, cb);
  }
  static findWorkShop(id, cb) {
    db.get("SELECT * FROM  workshop WHERE id = ?", id, cb);
  }

  static findUserWorkshop(id, cb) {
    db.all("SELECT * FROM  users WHERE workshop = ?", id, cb);
  }
  static findUserLogin(login, cb) {
    db.get("SELECT * FROM  users WHERE login = ?", login, cb);
  }
  static findUserId(id, cb) {
    console.log("id", id);
    db.get("SELECT * FROM  users WHERE id = ?", id, cb);
  }

  static lastRow(cb) {
    db.all(`SELECT * FROM users ORDER BY id DESC LIMIT 1  `, cb);
  }

  static create(data, cb) {
    bcrypt.hash(data.pass, 8, (err, hashedPassword) => {
      if (err) {
        return err;
      }
      const sql =
        "INSERT INTO workshop (id,typeuser,namecompany,email,phone) VALUES (?,?,?,?,?)";
      db.run(
        sql,
        data.id,
        data.typePerson,
        data.namecompany,
        data.email,
        data.phone,
        cb
      );

      const sql2 =
        "INSERT INTO users (nameUser,senameUser,pass,login,workshop,access,deleted) VALUES (?,?,?,?,?,?,?)";
      db.run(
        sql2,
        data.name,
        data.sename,
        hashedPassword,
        data.login,
        data.id,
        "Основатель",
        0,
        cb
      );
    });
  }

  static adduser(data, cb) {
    bcrypt.hash(data.pass, 8, (err, hashedPassword) => {
      if (err) {
        return err;
      }

      const sql2 =
        "INSERT INTO users (nameUser,senameUser,pass,login,workshop,access,deleted) VALUES (?,?,?,?,?,?,?)";
      db.run(
        sql2,
        data.nameUser,
        data.senameUser,
        hashedPassword,
        data.login,
        data.workshop,
        data.access,
        0,
        cb
      );
    });
  }

  static deleteUser(iduser, cb) {
    db.all(`UPDATE users SET deleted = 1 WHERE id = ?`, iduser, cb);
  }
}
module.exports = db;
module.exports.User = User;
