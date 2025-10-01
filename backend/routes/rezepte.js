const express = require("express");
const router = express.Router();
const rezeptController = require("../controllers/rezeptController");

router.get("/", rezeptController.getAll);
router.post("/create", rezeptController.create);
router.get("/:id", rezeptController.getRecipeById);
router.patch("/:id/edit", rezeptController.updateRecipeById);

module.exports = router;
