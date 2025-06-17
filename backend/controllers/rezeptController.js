const Recipe = require("../models/rezept");

exports.getAll = async (req, res) => {
  try {
    const recipies = await Recipe.findAll();
    res.json(recipies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findOne({ where: { id: recipeId } });

    if (!recipe) {
      return res.status(404).json({ message: "Rezept nicht gefunden" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Fehler beim Abrufen des Rezepts:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

