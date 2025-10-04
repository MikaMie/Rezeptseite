import express from "express";
import { config } from "dotenv";
import sequelize from "./database.js";
import rezepteRoutes from "./routes/rezepte.js";
import authRoutes from "./routes/authRoutes.js";

config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/recipes/", rezepteRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Datenbank synchronisiert");
    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Fehler beim Start:", err);
  });
