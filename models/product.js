const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class Product {
  static all(data, cb) {
    db.all(`SELECT * FROM products`, cb);
  }
}
module.exports = db;
module.exports.Product = Product;
