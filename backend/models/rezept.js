const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Recipe = sequelize.define("Recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { type: DataTypes.TEXT, allowNull: false },
  ingredients: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
  },
});

module.exports = Recipe;
