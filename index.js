var express = require("express");
var mysql = require("mysql");

const app = express();
app.use(express.json());
const md5 = require('md5')
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

  app.post("/newhotel", (req, res) => {
    let cantidad_habitacion = 15
    let precio = 18.65
    let fecha = "2022-05-06"
    let id_servicio = 1
    let ciudad = "Ciudad Juarez"    
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

  app.post("/addreservahotel", (req, res) => {
    
    var {cantidad_habitacion, id_user,id_servicio} = req.body;
    connectionMYSQL.query("call addReservaHotel(?,?,?)", 
    [cantidad_habitacion, id_user,id_servicio,  ], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

  app.post("/newuser", (req, res) => {
     var {Nombre,Fecha,Email,User,Pass,Id_Tipo_Usuario} = req.body
     Pass = md5(Pass);
    
    connectionMYSQL.query("call addUser(?,?,?,?,?,?)", 
    [Nombre, Fecha, Email, User, Pass, Id_Tipo_Usuario], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

  app.post("/login", (req, res) => {
     var {User, Pass} = req.body;
     Pass = md5(Pass);
    
    connectionMYSQL.query("call login(?,?)", [User, Pass], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

app.listen(3000);
