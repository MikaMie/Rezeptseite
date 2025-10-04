import express from "express";
const router = express.Router();
import {
  getAll,
  create,
  getRecipeById,
  updateRecipeById,
} from "../controllers/rezeptController.js";

router.get("/", getAll);
router.post("/create", create);
router.get("/:id", getRecipeById);
router.patch("/:id/edit", updateRecipeById);

export default router;
