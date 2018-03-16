var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 1000;
var path = require("path");
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname + "/")));
app.use("/api", express.static(path.join(__dirname + "/")));

app.get("/api/getImageFilePaths/:propertyId", function (req, res, next) {
  var propertyId = req.params.propertyId;

  var readFile = function () {
    return new Promise(function (resolve, reject) {
      fs.readFile("./data/properties.json", "utf-8", (err, properties) => {
        properties = JSON.parse(properties);
        var property = properties.find(function (item) {
          return item.id == propertyId;
        });
        resolve(property);
      });
    });
  };

  var getImageFilePaths = function (property) {
    var dir = property.img_directory;
    return new Promise(function (resolve, reject) {
      fs.readdir("./data/pics/" + dir, "utf-8", (err, paths) => {
        resolve(paths);
      });
    });

  };

  var sendImageFilePaths = function (paths) {
    res.send(paths);
  };

  readFile()
    .then(getImageFilePaths)
    .then(sendImageFilePaths);


});

app.get("/*", function (req, res, next) {
  res.sendFile("views/index.html", {root: __dirname});
});



app.listen(port, "0.0.0.0");
console.log("Listening to port: " + port);
