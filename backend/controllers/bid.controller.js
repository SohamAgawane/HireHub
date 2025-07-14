const Bid = require("../models/Bid");

// Place a bid on a project
exports.placeBid = async (req, res) => {
    const { bidAmount, proposal } = req.body;
    const projectId = req.params.projectId;
    const freelancerId = req.user.id;

    try {
        // Prevent multiple bids on same project
        const existing = await Bid.findOne({ project: projectId, freelancer: freelancerId });
        if (existing) {
            return res.status(400).json({ message: "You have already bid on this project" });
        }

        const bid = await Bid.create({
            project: projectId,
            freelancer: freelancerId,
            bidAmount,
            proposal,
        });

        res.status(201).json(bid);
    } catch (err) {
        res.status(500).json({ message: "Failed to place bid", error: err.message });
    }
};

// Get all bids for a project (for employer)
exports.getBidsForProject = async (req, res) => {
    try {
        const bids = await Bid.find({ project: req.params.id }).populate("freelancer", "name email");
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch bids", error: err.message });
    }
};

// Get all bids placed by the logged-in freelancer
exports.getMyBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancer: req.user.id }).populate("project", "title budget");
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch your bids", error: err.message });
    }
};
