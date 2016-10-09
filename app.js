var express = require("express");

var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res){
  res.render("index");
});

app.listen(3000, function() {
  console.log("Listening on 3000");
});
