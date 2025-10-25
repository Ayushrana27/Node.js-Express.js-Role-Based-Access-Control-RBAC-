const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

// Admin-only route
router.get("/admin", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin! Access granted." });
});

// Moderator-only route
router.get("/moderator", verifyToken, authorizeRoles("Moderator", "Admin"), (req, res) => {
  res.json({ message: "Hello Moderator! You have access." });
});

// General User route
router.get("/user", verifyToken, authorizeRoles("User", "Admin", "Moderator"), (req, res) => {
  res.json({ message: "User profile accessed successfully." });
});

module.exports = router;
