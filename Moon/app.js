
const express = require("express");
const helmet = require("helmet");
const app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon')
var path = require('path')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.use(helmet());
app.use(express.static("./webcodes"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(favicon(path.join(__dirname, 'frontendWM', 'icon.ico')))

app.listen(3000, console.log("Server Connected"));



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/*
//create db connection
var con = mysql.createConnection({
  host: "localhost",
  user: "demouser",
  password: "demopassword",
  database: "distro"
});

//This stores the cloud list and if theres new clouds just add to this
var cloudlist = ["https://cloud1cloudsandmoon.xyz", "https://cloud2cloudsandmoon.xyz"];

//For search algorithm
var winnerrec = [];

//Function to check syntaxes
function stringchecker(string) {
  //alphanumberic
  var x = /^[A-Za-z0-9]+$/;
  //only numbers
  var y=/^\d+$/;
  if (string.match(x)) {
    if(!string.match(y)){
    return true;
    }
  } else {
    return false;
  }
}

//Create tables (POST) 
//This api gets called for every table creation
app.post('/addtable', function (req, res) {
  var tablename = req.body.tablename;
  var colum1name = req.body.colum1name;
  var colum2name = req.body.colum2name;
  var colum3name = req.body.colum3name;
  console.log("addtable before regchecks")
  console.log(stringchecker(colum1name));
  if (stringchecker(tablename) === true) {
    if (stringchecker(colum1name) === true) {
      if (stringchecker(colum2name) === true) {
        if (stringchecker(colum3name) === true) {
          for (index = 0, len = cloudlist.length; index < len; ++index) {
            createtable(cloudlist[index], tablename, colum1name, colum2name, colum3name);
          }
          console.log("came to moon add tables api");

        }
      }

    }

  }

  res.end();

});
//Http call for creating tables
function createtable(url, tabname, col1, col2, col3) {
  console.log("start of createtable function in moon");
  url = url + "/addtable";
  var body = {};
  body.tablename = tabname;
  body.colum1name = col1;
  body.colum2name = col2;
  body.colum3name = col3;

  var json = JSON.stringify(body);
  var http = new XMLHttpRequest();
  console.log(url + body);
  http.open("POST", url + "?" + body, true);
  http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      if (http.responseText === "done") {
        console.log("sent through moon create table function");
      }

    }
  };
  http.send(json);

}




//Create entries (POST)
//this api sends data to a random cloud on the network
//random function to select the server to store the records
app.post('/createentry', function (req, res) {
  var tabn = req.body.tabn;
  var col1 = req.body.col1;
  var col2 = req.body.col2;
  var col3 = req.body.col3;
  var entry1 = req.body.entry1;
  var entry2 = req.body.entry2;
  var entry3 = req.body.entry3;

  createentry(tabn, col1, col2, col3, entry1, entry2, entry3);
  console.log("came to moon createentry api");

  res.end();
});
//Get a random server
function getrandServer() {
  return cloudlist[Math.floor(Math.random() * cloudlist.length)];
}
//Http call for creating entries
function createentry(tabn, col1, col2, col3, entry1, entry2, entry3) {
  console.log("start of createentry function in moon");
  var server = getrandServer();
  url = server + "/addentry";
  var body = {};
  body.tabn = tabn;
  body.col1 = col1;
  body.col2 = col2;
  body.col3 = col3;
  body.entry1 = entry1;
  body.entry2 = entry2;
  body.entry3 = entry3;

  var json = JSON.stringify(body);
  var http = new XMLHttpRequest();
  console.log(url + body);
  http.open("POST", url + "?" + body, true);
  http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      if (http.responseText === "done") {
        console.log("sent through moon create entry function");

      }

    }
  };
  http.send(json);

}




//Find records | search (GET)

app.post('/findentry', function (req, res) {
  console.log("Came to findentry in moon")
  var tabn = req.body.tabn;
  var col = req.body.col;
  var find = req.body.find;
  var reqID = req.body.reqID;

  for (index = 0, len = cloudlist.length; index < len; ++index) {
    findrecord(cloudlist[index], tabn, col, find, reqID);
  }

  res.end();
});

//Http call for Find records 
function findrecord(url, tabn, col, find, reqID) {
  console.log("start of findrecord function in moon");
  url = url + "/findentry";
  var body = {};
  body.tabn = tabn;
  body.col = col;
  body.find = find;
  body.reqID = reqID;

  var json = JSON.stringify(body);
  var http = new XMLHttpRequest();
  console.log(url + body);
  http.open("POST", url + "?" + body, true);
  http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      if (http.responseText === "done") {
        console.log("sent through moon find record function");
      }

    }
  };
  http.send(json);

}



//Find record response
//Function to record the responses and give priority only for the fist comer
app.post('/findRecordResponse', function (req, res) {

  var reqID = req.body.reqID;
  var tablename = req.body.tabn;
  var tabledata = req.body.tabledata;

  var struct = {};
  struct.reqID = reqID;
  struct.tablename = tablename;
  struct.tabledata = tabledata;

  console.log(reqID + " " + tablename + " " + tabledata.aaa + " " + tabledata.bbb + " " + tabledata.ccc);

  var check = 0;
  if (winnerrec.length === null) {
    winnerrec.push(struct);
    console.log("came to push if null");
  } else {
    for (var key in winnerrec) {
      console.log("came to for initial loop");
      //this is the first entry in the array
      var obj = winnerrec[key];
      //this is iterating inside the first entry in the array which is a json
      Object.keys(obj).forEach(function (k) {
        var row = obj[k];
        console.log(obj[k]);
        console.log("came to object keys loop");

        //console.log("obj" + obj + " objreq " + obj.reqID);
        if (row === req.body.reqID) {
          check = 1;
          console.log("came to check");
        }


      })

    };
    if (check === 0) {
      winnerrec.push(struct);
      console.log(req.body.reqID + "was pushed")
    }


  }

});




//Update records (POST)

//Delete records (POST)




//temporary login for MIT
app.get('/admindata', function (req, res) {


  var url = "https://www.nisalgamage.com/logdet";
  console.log(url);
  var http = new XMLHttpRequest();
  console.log("GET", url);
  http.open("GET", url, true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function () {
    if (http.readyState === 4) {
      console.log(http.responseText);

      var data = http.responseText;
      var jsonResponse = JSON.parse(data);
      if (jsonResponse["username"] === req.query.username) {
        if (jsonResponse["password"] === req.query.password) {
          res.json({ "answer": "correct" });
          console.log("came here");
        }

      } else {
        console.log("caaame here");
        res.json({ "answer": "incorrect" });
      }
    }
  }
  http.send();
});

//check if admin is correct.this has been modified for the aove api so change  to admindata fi you want this tho work
app.get('/admindata1', function (req, res) {
  con.query("SELECT username, password FROM admin", function (err, result, fields) {
    if (err) throw err;
    console.log(req.query.username);
    console.log(req.query.password);
    if (result[0].username == req.query.username && result[0].password == req.query.password) {
      res.json({ "answer": "correct" });
    } else {
      res.json({ "answer": "incorrect" });
    }

  });
});

//get orders
app.get('/orders', function (req, res) {
  if (req.query.key == "secret") {
    con.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) throw err;
      //var ord=JSON.stringify(result);
      res.json(result);
    });
  } else { res.send('*unauthorized*') }
});

//create orders
app.post('/Cord', function (req, res) {
  var oid = req.body.oid;
  var cdet = req.body.cdet;
  var otype = req.body.otype;
  var oprog = req.body.oprog;
  var empid = req.body.empid;
  res.send("oid = " + oid + ",cdet = " + cdet + ",otype = " + otype + ",oprog = " + oprog + ",empid = " + empid);
  //var userN="'"+user_name;
  //res.send("User name = "+user_name+", password is "+password);
  //res.end("yes");
  // var sql = "INSERT INTO orders (orderid,clientdetails,ordertype,orderprogress,employeeID) VALUES ("+oid+','+cdet+','+otype+','+oprog+','+empid+')';
  console.log("INSERT INTO orders (orderid, clientdetails, ordertype, orderprogress, employeeID) VALUES (" + oid + ",'" + cdet + "','" + otype + "','" + oprog + "'," + empid + ")");
  var sql = "INSERT INTO orders (orderid, clientdetails, ordertype, orderprogress, employeeID) VALUES (" + oid + ",'" + cdet + "','" + otype + "','" + oprog + "'," + empid + ")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});
//delete orders
app.post('/delo', function (req, res) {
  var oid = req.body.oid;
  console.log(oid);
  var sql = "DELETE FROM orders WHERE orderid =" + oid;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });

});
*/
