module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Recipes", "tags", {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Recipes", "tags");
  },
};
