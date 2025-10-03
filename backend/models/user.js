// models/User.js
"use strict";

const { DataTypes, literal } = require("sequelize");
const sequelize = require("../database");

const schemaName = process.env.DB_SCHEMA || "public";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: literal("gen_random_uuid()"),
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 254],
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    schema: schemaName,
    tableName: "Users",
    timestamps: true,
    paranoid: true,
    underscored: false,
    indexes: [
      { unique: true, fields: ["email"], name: "users_email_unique" },
      { fields: ["is_active"], name: "users_is_active_idx" },
    ],
    defaultScope: {
      attributes: {
        exclude: ["password_hash"],
      },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password_hash"] },
      },
    },
  }
);

User.prototype.toJSON = function toJSON() {
  const values = { ...this.get() };
  delete values.password_hash;
  return values;
};

module.exports = User;
