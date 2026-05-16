const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

const JWT_SECRET =
  process.env.JWT_SECRET || "student_project_marketplace_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

async function register(req, res) {
  try {
    const { name, fullName, email, password } = req.body;
    const normalizedName = (name || fullName || "").trim();

    if (!normalizedName || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    const existing = await findUserByEmail(email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await createUser({
      name: normalizedName,
      email: email.toLowerCase(),
      password_hash,
    });

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.error("Register error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await findUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register, login };
