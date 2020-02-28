const api = require("./db.js");
var express = require("express");
var bodyParser = require("body-parser"); // post 数据是需要

var app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", function(req, res, next) {
  api.getApp(req, res, next);
});

app.post("/register", function(req, res, next) {
  api.addApp(req, res, next);
});

app.post("/update", function(req, res, next) {
  api.update(req, res, next);
});

app.post("/login", function(req, res, next) {
  api.login(req, res, next);
});

app.post("/delete", function(req, res, next) {
  api.delete(req, res, next);
});

app.listen(3000, function() {
  console.log("server runnning at port 3000");
});
