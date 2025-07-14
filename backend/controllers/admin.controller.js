const User = require("../models/User");
const Project = require("../models/Project");
const Bid = require("../models/Bid");

// Get all users with pagination & optional filter
exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, role } = req.query;
  const filter = role ? { role } : {};

  try {
    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
};

// Get all bids with populated fields
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find()
      .populate("project", "title")
      .populate("freelancer", "name email");
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bids", error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};

// Block user
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "blocked" },
      { new: true }
    );
    res.json({ message: "User blocked", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to block user", error: err.message });
  }
};
