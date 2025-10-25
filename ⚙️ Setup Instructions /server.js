const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { verifyToken, authorizeRoles } = require("./middleware/authMiddleware");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.json());

// Sample users (in real apps, use MongoDB/MySQL)
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("admin123", 8), role: "Admin" },
  { id: 2, username: "mod", password: bcrypt.hashSync("mod123", 8), role: "Moderator" },
  { id: 3, username: "user", password: bcrypt.hashSync("user123", 8), role: "User" },
];

// LOGIN route → issues JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = users.find((u) => u.username === username);

  if (!foundUser) return res.status(400).json({ message: "User not found" });

  const valid = bcrypt.compareSync(password, foundUser.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: foundUser.id, role: foundUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// Protected routes
app.use("/api", protectedRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
