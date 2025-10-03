require("dotenv").config();

const useSSL = String(process.env.DB_SSL || "false").toLowerCase() === "true";

const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 5432,
  dialect: "postgres",
  logging: false,
  schema: process.env.DB_SCHEMA || "public",
  dialectOptions: useSSL
    ? { ssl: { require: true, rejectUnauthorized: true } }
    : {},
};

module.exports = {
  development: { ...common },
  test: { ...common, database: process.env.DB_NAME_TEST || "rezeptdb_test" },
  production: { ...common },
};
