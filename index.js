var express = require("express");
var mysql = require("mysql");

const app = express();
app.use(express.json());

var connectionMYSQL = mysql.createConnection({
  host: "database-1.c5jhksftgxws.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "db1",
  port: 3306,
});

connectionMYSQL.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conn mysql");
  }
});

app.get("/", (req, res) => {
  connectionMYSQL.query("call getCiudad()", [], function (err, result) {
    if (err) {
      console.log("err:", err);
    } else {
      console.log("results:", result);
    }
  });
  res.send(true);
});

app.get("/u", (req, res) => {
    let Nombre = "n"
    let Fecha = "2022-05-06"
    let Email = "e"
    let User = "u"
    let Pass = "p"
    let Tipo = "admin"
    connectionMYSQL.query("call addUser(?,?,?,?,?,?)", 
    [Nombre, Fecha, Email,User, Pass, Tipo ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

  app.get("/newhotel", (req, res) => {
    let cantidad_habitacion = 15
    let precio = 18.65
    let fecha = "2022-05-06"
    let id_servicio = 2
    let ciudad = "2"    
    connectionMYSQL.query("call addHotel(?,?,?,?,?)", 
    [cantidad_habitacion, precio, fecha,id_servicio, ciudad ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

  app.get("/addreservahotel", (req, res) => {
    let cantidad_habitacion = 15
    let precio = 18.65
    let id_user = 1
    let id_servicio = 2
       
    connectionMYSQL.query("call addReservaHotel(?,?,?,?)", 
    [cantidad_habitacion, precio, id_user,id_servicio,  ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });
app.listen(3000);
