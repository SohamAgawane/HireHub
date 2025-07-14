const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Test protected route
router.get("/protected", verifyToken, checkRole("freelancer", "employer"), (req, res) => {
  res.json({
    message: "✅ You have access to this protected route",
    user: req.user,
  });
});

module.exports = router;
