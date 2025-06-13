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
