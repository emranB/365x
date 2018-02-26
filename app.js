var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 1000;
var path = require("path");
var fs = require("fs");

app.use("/static", express.static(path.join(__dirname + "/")));


app.get("/*", function (req, res, next) {
  res.sendFile("views/index.html", {root: __dirname});
});



console.log("Listening to port: " + port);
app.listen(port);
