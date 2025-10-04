// database.js
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const useSSL = String(process.env.DB_SSL || "false").toLowerCase() === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME || "rezeptdb",
  process.env.DB_USER || "rezeptuser",
  process.env.DB_PASS || "rezeptpass",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
    schema: process.env.DB_SCHEMA || "public",
    dialectOptions: useSSL
      ? { ssl: { require: true, rejectUnauthorized: true } }
      : {},
  }
);

export default sequelize;
