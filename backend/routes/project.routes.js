const express = require("express");
const router = express.Router();
const {
    createProject,
    getMyProjects,
    updateProject,
    deleteProject,
} = require("../controllers/project.controller");

const { verifyToken, checkRole } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, checkRole("employer"), createProject);
router.get("/my", verifyToken, checkRole("employer"), getMyProjects);
router.put("/:id", verifyToken, checkRole("employer"), updateProject);
router.delete("/:id", verifyToken, checkRole("employer"), deleteProject);

module.exports = router;
