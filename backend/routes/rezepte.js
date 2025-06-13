const express = require("express");
const router = express.Router();
const rezeptController = require("../controllers/rezeptController");

router.get("/", rezeptController.getAll);
router.post("/create", rezeptController.create);

module.exports = router;
