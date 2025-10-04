import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";
import { UniqueConstraintError, ValidationError } from "sequelize";

export const getCSRFToken = async (req, res, next) => {
  return res.status(200).json({ csrfToken: req.csrfToken() });
};

export const register = async (req, res, next) => {
  const name = (req.body.name || "").trim();
  const emailRaw = (req.body.email || "").trim();
  const password = req.body.password || "";

  if (!name || !emailRaw || !password) {
    return res.status(400).json({ message: "Bitte alle Felder ausfüllen!" });
  }

  const email = emailRaw.toLowerCase();

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({
        message: "Ein User mit dieser E‑Mail-Adresse ist schon vorhanden!",
      });
    }
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      message: "User wurde erfolgreich angelegt",
      user: user.toJSON(),
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: "Ein User mit dieser E‑Mail-Adresse ist schon vorhanden!",
      });
    }
    if (err instanceof ValidationError) {
      return res
        .status(400)
        .json({ message: err.errors?.[0]?.message || "Validierungsfehler" });
    }

    console.error("Fehler bei der Registrierung:", err);
    return res.status(500).json({
      message:
        "Fehler beim Anlegen des Users, bitte versuchen Sie es gleich erneut!",
    });
  }
};

export const login = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    return res.status(400).json({ message: "Bitte alle Felder ausfüllen!" });
  }

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Ungültiger Benutzername oder Passwort" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken(user);
      return res.status(200).json({ message: "Erfolgreich eingeloggt", token });
    } else {
      return res.status(400).json({ message: "Falsches Passwort eingegeben" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Es liegt ein Fehler vor, bitte versuche es in ein paar Minuten erneut!",
    });
  }
};
