const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");

router.use(verifyToken, checkRole("admin"));

router.get("/users", adminController.getAllUsers);
router.get("/projects", adminController.getAllProjects);
router.get("/bids", adminController.getAllBids);
router.delete("/users/:id", adminController.deleteUser);
router.patch("/users/:id/block", adminController.blockUser);

module.exports = router;
