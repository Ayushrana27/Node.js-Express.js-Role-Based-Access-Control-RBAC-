const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based authorization
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access Denied: Requires one of these roles: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRoles };
