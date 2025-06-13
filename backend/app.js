const express = require("express");
const sequelize = require("./database");
const rezepteRoutes = require("./routes/rezepte");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/recipes/", rezepteRoutes);

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
