const express = require("express");
const router = express.Router();

const {createStartup,getAllStartups,deleteStartup} = require("../controller/startupController");

router.post("/",createStartup);
router.get("/",getAllStartups);
router.delete("/:id",deleteStartup);
module.exports = router;