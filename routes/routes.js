var express = require("express");
var router = express.Router();

// Require controller modules.
var shorten_controler = require("../controllers/shorten");

//Validate and Save URL
router.post("/", shorten_controler.shorten);
router.get("/urls/:hash", shorten_controler.shorten_getByHash);
router.get("/:hash", shorten_controler.shorten_redirect);

module.exports = router;
