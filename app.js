("use strict");

var express = require("express");
var bodyParser = require("body-parser");

var config = require("./config");
// var connect = require("./db/connect");
var routes = require("./routes/routes");

var app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

function allowCrossDomain(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
}
app.use(allowCrossDomain);

app.use("/", routes);

const PORT = process.env.PORT || config.PORT;

var server = app.listen(PORT, function () {
	console.log("app running on port.", PORT);
});
