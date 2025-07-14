const express = require("express");
const router = express.Router();
const { placeBid, getBidsForProject, getMyBids } = require("../controllers/bid.controller");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");

// Freelancer places a bid
router.post("/:projectId", verifyToken, checkRole("freelancer"), placeBid);

// Employer views bids on a project
router.get("/project/:id", verifyToken, checkRole("employer"), getBidsForProject);

// Freelancer views their own bids
router.get("/my", verifyToken, checkRole("freelancer"), getMyBids);

module.exports = router;
