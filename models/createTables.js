const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const db = new sqlite3.Database(config.dbName);

class CreateTable {
  static _serialize(sql) {
    db.serialize(() => {
      sql.forEach((element) => {
        db.run(element);
      });
    });
  }
  static provider(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_providers (
        id        INTEGER      PRIMARY KEY AUTOINCREMENT,
        name      TEXT (50),
        inn       INTEGER ,
        adress    TEXT (10),
        manager   TEXT (50),
        phone     INTEGER (12),
        author    INTEGER (20)
    );
    `,
    ];
    this._serialize(sql);
  }
  static buyer(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_buyers (
        id        INTEGER      PRIMARY KEY AUTOINCREMENT,
        name      TEXT (150),
        phone     INTEGER (12),
        author    INTEGER (20),
        sale      INTEGER (3)
    );
    `,
    ];
    this._serialize(sql);
  }
  static material(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_materials (
        id        INTEGER      PRIMARY KEY AUTOINCREMENT,
        name      TEXT (50),
        coverage  TEXT (30),
        color     TEXT (10),
        thickness NUMERIC,
        stock     NUMERIC,
        inprice   NUMERIC,
        costprice NUMERIC,
        author    INTEGER (20),
        deleted   INTEGER(1)
    );
    `,
    ];
    this._serialize(sql);
  }

  static arrivals(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_arrivals (
        id            INTEGER      PRIMARY KEY AUTOINCREMENT,
        provider      TEXT (50),
        amount        TEXT (30),
        createdata    TEXT (10),
        innumber      TEXT (30),
        inmumberdata  TEXT (30),
        data          TEXT

    );
    `,
    ];
    this._serialize(sql);
  }
  static movements(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_movements (
        id            INTEGER      PRIMARY KEY AUTOINCREMENT,
        type          TEXT (30),
        items         TEXT,
        link          INTEGER(10),
        comment       TEXT,
        author        INTEGER,
        date          INTEGER

    );
    `,
    ];
    this._serialize(sql);
  }

  static rko(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_rko (
        id            INTEGER      PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        author        INTEGER,
    );
    `,
    ];
    this._serialize(sql);
  }

  static sales(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_sales (
        id            INTEGER      PRIMARY KEY AUTOINCREMENT,
        pay           INTEGER (1),
        items         TEXT,
        summa         NUMERIC,
        movement      TEXT(30),
        link          INTEGER(10),
        comment       TEXT,
        author        INTEGER,
        date          INTEGER

    );
    `,
    ];
    this._serialize(sql);
  }
  static money(id) {
    const sql = [
      `CREATE TABLE IF NOT EXISTS id_${id}_money
        (id            INTEGER      PRIMARY KEY AUTOINCREMENT,
        type      TEXT (10),
        summa     NUMERIC,
        category  INTEGER(2),
        link      INTEGER (10),
        basis     TEXT,
        date      NUMERIC,
        author    INTEGER,
        comment   TEXT
       );
    `,
    ];
    this._serialize(sql);
  }
  static startApp() {
    const sql = [
      `CREATE TABLE IF NOT EXISTS workshop
        (id INTEGER PRIMARY KEY,
          typeuser      TEXT (100),
          namecompany   TEXT (100),
          email         TEXT (100),
          phone         TEXT (100),
          setting       TEXT (100)
          )`,

      `CREATE TABLE IF NOT EXISTS users (
        id         INTEGER     PRIMARY KEY AUTOINCREMENT,
        nameUser   TEXT (100),
        senameUser TEXT (100),
        login      TEXT (100),
        pass       TEXT,
        workshop   INTEGER,
        access     TEXT,
        deleted    INTEGER (1) 
    )`,

      `CREATE TABLE IF NOT EXISTS materials (
        id            INTEGER     PRIMARY KEY AUTOINCREMENT,
        name          TEXT (100),
        coverage      TEXT (50),
        color         TEXT (20),
        thickness     INTEGER (5),
        manufacturer  TEXT(50) 
  );
  `,
      `DELETE FROM materials`,
      `INSERT INTO materials (manufacturer,thickness,color,coverage,name,id)
        VALUES
        
          ('noname',0.45,'RAL8017','Полиэстер','Гладкий лист',1),
          ('noname',0.45,'RAL5015','Полиэстер','Гладкий лист',2),
          ('noname',0.45,'RAL5002','Полиэстер','Гладкий лист',3),
          ('noname',0.45,'RAL1014','Полиэстер','Гладкий лист',4),
          ('noname',0.45,'RAL3005','Полиэстер','Гладкий лист',5),

          ('GRAND LINE',0.5,'RAL3005','Quarzit Matt','Гладкий лист',6),
          ('GRAND LINE',0.5,'RAL6005','Quarzit Matt','Гладкий лист',7),
          ('GRAND LINE',0.5,'RAL7024','Quarzit Matt','Гладкий лист',8),
          ('GRAND LINE',0.5,'RAL8004','Quarzit Matt','Гладкий лист',9),
          ('GRAND LINE',0.5,'RAL8017','Quarzit Matt','Гладкий лист',10),
          ('GRAND LINE',0.5,'RR32','Quarzit Matt','Гладкий лист',11),

          ('GRAND LINE',0.5,'RAL3005','Quarzit','Гладкий лист',12),
          ('GRAND LINE',0.5,'RAL6005','Quarzit','Гладкий лист',13),
          ('GRAND LINE',0.5,'Cuprum Steel','Quarzit','Гладкий лист',14),
          ('GRAND LINE',0.5,'RAL8017','Quarzit','Гладкий лист',15),
          ('GRAND LINE',0.5,'RR32','Quarzit','Гладкий лист',16),

          ('GRAND LINE',0.5,'RAL3005','Quarzit Lite','Гладкий лист',17),
          ('GRAND LINE',0.5,'RAL6005','Quarzit Lite','Гладкий лист',18),
          ('GRAND LINE',0.5,'RAL7024','Quarzit Lite','Гладкий лист',19),
          ('GRAND LINE',0.5,'RAL8017','Quarzit Lite','Гладкий лист',20),
          ('GRAND LINE',0.5,'RR32','Quarzit Lite','Гладкий лист',21),
          ('GRAND LINE',0.5,'RAL9005','Quarzit Lite','Гладкий лист',22),

          ('GRAND LINE',0.5,'RAL3005','Velur','Гладкий лист',23),
          ('GRAND LINE',0.5,'RAL3009','Velur','Гладкий лист',24),
          ('GRAND LINE',0.5,'RAL6005','Velur','Гладкий лист',25),
          ('GRAND LINE',0.5,'RAL6020','Velur','Гладкий лист',26),
          ('GRAND LINE',0.5,'RAL7024','Velur','Гладкий лист',27),
          ('GRAND LINE',0.5,'RAL8004','Velur','Гладкий лист',28),
          ('GRAND LINE',0.5,'RAL8017','Velur','Гладкий лист',29),
          ('GRAND LINE',0.5,'RR32','Velur','Гладкий лист',30),
          ('GRAND LINE',0.5,'RAL9005','Velur','Гладкий лист',31),
    
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR32','PURMAN','Гладкий лист',32),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'Бронзовый металик','PURMAN','Гладкий лист',33),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'Tourmalin','PURMAN','Гладкий лист',34),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'Galmei','PURMAN','Гладкий лист',35),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'Citrine','PURMAN','Гладкий лист',36),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL3005','PURMAN','Гладкий лист',37),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL3011','PURMAN','Гладкий лист',38),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL5005','PURMAN','Гладкий лист',39),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL6005','PURMAN','Гладкий лист',40),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL7024','PURMAN','Гладкий лист',41),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL8017','PURMAN','Гладкий лист',42),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL9005','PURMAN','Гладкий лист',43),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL9010','PURMAN','Гладкий лист',44),

          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR11','Puretan','Гладкий лист',45),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR23','Puretan','Гладкий лист',46),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR29','Puretan','Гладкий лист',47),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR32','Puretan','Гладкий лист',48),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR35','Puretan','Гладкий лист',49),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR750','Puretan','Гладкий лист',50),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL8017','Puretan','Гладкий лист',51),

          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL1014','NormanMP','Гладкий лист',52),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL1015','NormanMP','Гладкий лист',53),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL3005','NormanMP','Гладкий лист',54),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL3011','NormanMP','Гладкий лист',55),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL5002','NormanMP','Гладкий лист',56),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL6002','NormanMP','Гладкий лист',57),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL6005','NormanMP','Гладкий лист',58),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL7004','NormanMP','Гладкий лист',59),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL7024','NormanMP','Гладкий лист',60),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL8004','NormanMP','Гладкий лист',61),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL8017','NormanMP','Гладкий лист',62),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL9002','NormanMP','Гладкий лист',63),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL9003','NormanMP','Гладкий лист',64),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RAL9006','NormanMP','Гладкий лист',65),
          ('МЕТАЛЛ ПРОФИЛЬ',0.5,'RR32','NormanMP','Гладкий лист',66)
         

          
          ;
  `,
      `CREATE TABLE IF NOT EXISTS basisforcashflow (
    id            INTEGER     PRIMARY KEY AUTOINCREMENT,
    name          TEXT (50),
    isappitemname INTEGER (1),
    author        INTEGER,
    workshop      INTEGER
);`,
      //`DELETE FROM basisforcashflow`,
      `
     
      REPLACE INTO basisforcashflow (workshop,author,isappitemname,name,id)

              VALUES  (1,NULL,1,'Оплата по поступлению',1),
                      (1,NULL,1,'Оплата по реализации',2),
                      (1,NULL,1,'Ввод денежных средств',3),
                      (1,NULL,0,'Аренда',4),
                      (1,NULL,0,'ЖКХ',5),
                      (1,NULL,0,'Расходные материалы',6),
                      
                      (1,NULL,0,'Транспортные расходы',20);`,
    ];

    this._serialize(sql);
  }
  static deleteTin(idworkshop, cb) {
    const sql = [
      `DROP TABLE IF EXISTS id_${idworkshop}_money`,
      `DROP TABLE IF EXISTS id_${idworkshop}_rko`,
      `DROP TABLE IF EXISTS id_${idworkshop}_movements`,
      `DROP TABLE IF EXISTS id_${idworkshop}_materials`,
      `DROP TABLE IF EXISTS id_${idworkshop}_buyers`,
      `DROP TABLE IF EXISTS id_${idworkshop}_providers`,
      `DROP TABLE IF EXISTS id_${idworkshop}_sales`,
      `DELETE FROM users WHERE workshop=${idworkshop}`,
      `DELETE FROM workshop WHERE id=${idworkshop}`,
    ];

    this._serialize(sql);
    cb();
  }
}

module.exports.CreateTable = CreateTable;
