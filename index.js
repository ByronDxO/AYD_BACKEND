var express = require("express");
var mysql = require("mysql");
var cors = require('cors')
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

app.use(cors())
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
  var {Nombre, Fecha,Email,User,Pass,Tipo} = req.body;    

  
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
///// seccion de ABC hotel 
////// añadir hotel 
  app.post("/newhotel", (req, res) => {
    var {cantidad_habitacion, precio,fecha,id_servicio,ciudad} = req.body;    
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
//// añadir reserva hotel 
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
//// añadir modificar hotel 



  app.post("/newuser", (req, res) => {
     var {name,fechanac,email,password,rol} = req.body
     password = md5(password);
    
    connectionMYSQL.query("call addUser(?,?,?,?,?)", 
    [name, fechanac, email, password, rol], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

  app.post("/login", (req, res) => {
     var {user, pass} = req.body;
     pass = md5(pass);
    
    connectionMYSQL.query("call login(?,?)", [user, pass], function (err, result) {
      if (err) {
        console.log("err:", err);
      } else {
        console.log("results:", result);
      }
    });
    res.send(true);
  });

app.listen(3000);
