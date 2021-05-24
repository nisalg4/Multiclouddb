const express = require("express");
const helmet = require("helmet");
const app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon')
var path = require('path')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.use(helmet());
app.use(express.static("./public"));





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(favicon(path.join(__dirname, 'frontendWM', 'icon.ico')))
app.listen(3000, console.log("Server Connected"));
//create db connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nisal",
    database: "distro"
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

//create table
app.post('/addtable', function (req, res) {
    var tablename = req.body.tablename;
    var colum1name = req.body.colum1name;
    var colum2name = req.body.colum2name;
    var colum3name = req.body.colum3name;

    var x = "CREATE  TABLE " + tablename + " ( " + colum1name + " VARCHAR(255)," + colum2name + " VARCHAR(255)," + colum3name + " VARCHAR(255))";
    console.log(x);

    con.query("CREATE  TABLE " + tablename + " ( " + colum1name + " VARCHAR(255)," + colum2name + " VARCHAR(255)," + colum3name + " VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Table created");
        res.send("done");
    });

});

//create entry
//has to recieve 6 parameters plus the table parameter
//again suseptible to sql injections till the string check function is built
//colums are editable to give max functionality to the api for the customers to have multiple tables with different attributes
app.post('/addentry', function (req, res) {
    var tabn=req.body.tabn;
    var col1 = req.body.col1;
    var col2 = req.body.col2;
    var col3 = req.body.col3;
    var entry1 = req.body.entry1;
    var entry2 = req.body.entry2;
    var entry3 = req.body.entry3;
    
var x="INSERT INTO "+ tabn +"(colum1name,colum2name,colum3name) VALUES (?,?,?)";
console.log(x);

    con.query("INSERT INTO "+ tabn +" ("+col1+","+col2+","+col3+") VALUES (?,?,?)",[entry1,entry2,entry3], function (err, result) {
            if (err) throw err;
            console.log("Row inserted");
            res.send("done");
        });

});

//Find record
app.post('/findentry', function (req, res) {
    var tabn = req.body.tabn;
    var col = req.body.col;
    var find = req.body.find;
    var reqID = req.body.reqID;


    var x = "SELECT * FROM " + tabn + " WHERE " + col + " = ?";
    console.log(x);

    con.query("SELECT * FROM " + tabn + " WHERE " + col + " = ?", [find], function (err, result) {
        if (err) throw err;
        console.log("SELECT results done");
        //res.end('done');

        Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(result[key]);


            console.log("start of findrecordresponse function in cloudA");
            var url="https://cloudsandmoon.com";
            url = url + "/findRecordResponse";
            var body = {};
            body.reqID = reqID;
            body.tabn = tabn;
            body.tabledata = row;
            
            
 
            var json = JSON.stringify(body);
            var http = new XMLHttpRequest();
            console.log(url + body);
            http.open("POST", url + "?" + body, true);
            http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            http.onreadystatechange = function () {
              if (http.readyState === 4) {
                if (http.responseText === "done") {
                  console.log("sent through cloudA find record function");
                }
          
              }
            };
            http.send(json);

        });
    });

});