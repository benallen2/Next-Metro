var express = require("express");

var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/views"));



app.get("/", function (req, res){
  res.render("index");
});

app.listen(8888, function() {
  console.log("Listening on 8888");
});
