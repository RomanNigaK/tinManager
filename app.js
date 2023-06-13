const express = require("express");
const config = require("config");
const path = require("path");
const fs = require("fs");
const PORT = config.get("port") || 5000;
const auth = require("./middleware/auth");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(config.dbName);

// const https = require("https");
const http = require("http");
// const httOptions = {
//   key: fs.readFileSync("./ssl/596017.key"),
//   cert: fs.readFileSync("./ssl/www_tinmanager_ru.crt"),
//   ca: [
//     fs.readFileSync("./ssl/AlphaSSL CA - SHA256 - G4.crt"),
//     fs.readFileSync("./ssl/GlobalSign Root CA.crt"),
//   ],
// };

const app = express();

//const httpsServer = https.createServer(httOptions, app);
const httpServer = http.createServer(app);

app.use(express.json({ extended: true }));
app.use("/image", express.static(path.join(__dirname, "image")));

app.use("/api/user", require("./routes/user.router"));
app.use("/api/material", require("./routes/material.router"));
app.use("/api/movement", require("./routes/movement.router"));
app.use("/api/provider", require("./routes/provider.router"));
app.use("/api/product", require("./routes/product.router"));
app.use("/api/client", require("./routes/client.router"));
app.use("/api/sale", require("./routes/sale.router"));
app.use("/api/money", require("./routes/money.router"));
app.use("/api/rko", require("./routes/rko.router"));
app.use("/api/workshop", require("./routes/workshop.router"));
const CreateTable = require("./models/createTables").CreateTable;

const bcrypt = require("bcryptjs");

CreateTable.startApp();

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

async function start() {
  if (process.env.NODE_ENV === "production") {
    //httpsServer.listen(443, () => console.log(`Server start ${443}`));
    httpServer.listen(PORT, () => console.log(`Server start ${80}`));
  } else {
    http
      .createServer(app)
      .listen(PORT, () => console.log(`Server start ${PORT}`));
  }
}
start();
app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});
