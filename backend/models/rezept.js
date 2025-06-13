const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Recipe = sequelize.define("Recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { type: DataTypes.TEXT, allowNull: false },
  zutaten: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  introductions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Recipe;
