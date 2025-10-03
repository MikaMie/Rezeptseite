"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const schemaName = process.env.DB_SCHEMA || "public";

    await queryInterface.sequelize.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}";`
    );
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS pgcrypto;`
    );

    await queryInterface.createTable(
      { schema: schemaName, tableName: "Users" },
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal("gen_random_uuid()"),
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(254),
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(32),
          allowNull: false,
          defaultValue: "user",
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        email_verified_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        last_login_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        // Soft delete (optional): aktiviere paranoid im Model
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
      },
      {
        // table options
        paranoid: true,
      }
    );

    // Indexe
    await queryInterface.addIndex(
      { schema: schemaName, tableName: "Users" },
      ["email"],
      { unique: true, name: "users_email_unique" }
    );
    await queryInterface.addIndex(
      { schema: schemaName, tableName: "Users" },
      ["is_active"],
      { name: "users_is_active_idx" }
    );
  },

  async down(queryInterface) {
    const schemaName = process.env.DB_SCHEMA || "public";
    await queryInterface.dropTable({ schema: schemaName, tableName: "Users" });
    // Extension lassen wir bestehen (kann von anderen Tabellen genutzt werden).
  },
};
