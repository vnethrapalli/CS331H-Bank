require("dotenv").config();
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const oracledb = require("oracledb");
const cors = require("cors");
const PORT = process.env.PORT || 80;

setupDatabase();

async function setupDatabase() {
  oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_3" });
  connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.DB_HOST})(PORT = ${process.env.DB_PORT}))(CONNECT_DATA =(SID= ${process.env.DB_SID})))`,
  });
}

express()
  .use(express.static(path.join(__dirname, "build")))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      return callback(null, true);
    }
  
  }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  })
  .post("/login", async function (req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    result = await connection.execute(`SELECT * FROM LOAN`);
    res.send({
        data: "Success",
        firstname: "bob",
        lastname: "smith"
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
