import Recipe from "../models/rezept.js";

// fetch all recipes
export const getAll = async (req, res) => {
  try {
    const recipies = await Recipe.findAll();
    res.json(recipies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create new recipe
export const create = async (req, res) => {
  try {
    const parsedTags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const recipe = await Recipe.create({
      ...req.body,
      tags: parsedTags,
    });

    res.status(201).json(recipe);
  } catch (err) {
    console.error("Fehler beim Erstellen des Rezepts:", err);
    res.status(400).json({
      error: err.message || "Ungültige Rezeptdaten.",
    });
  }
};

// fetch a specifig recipe
export const getRecipeById = async (req, res) => {
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

// UPDATE a specifig recipe
export const updateRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updates = req.body;

    // Direktes Update mit Sequelize
    const [affectedRows] = await Recipe.update(updates, {
      where: { id: recipeId },
    });

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Rezept nicht gefunden oder keine Änderungen" });
    }

    // Aktualisiertes Rezept abrufen
    const updatedRecipe = await Recipe.findByPk(recipeId);

    res.json({
      message: "Rezept erfolgreich aktualisiert",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
