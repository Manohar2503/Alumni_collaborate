const express = require("express");
const route = express.Router();
const bookmarks = require("../controller/bookMarksController");

route.post('/add',bookmarks);

module.exports = route;