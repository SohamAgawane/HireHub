const Project = require("../models/Project");

// Create project
exports.createProject = async (req, res) => {
    const { title, description, tags, budget, imageUrl } = req.body;
    try {
        const project = await Project.create({
            title,
            description,
            tags,
            budget,
            imageUrl,
            employer: req.user.id,
        });
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: "Failed to create project", error: err.message });
    }
};

// Get all projects by logged-in employer
exports.getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ employer: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch projects", error: err.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, budget, imageUrl } = req.body;

    try {
        const project = await Project.findOneAndUpdate(
            { _id: id, employer: req.user.id },
            { title, description, tags, budget, imageUrl },
            { new: true }
        );

        if (!project) return res.status(404).json({ message: "Project not found or unauthorized" });

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: "Failed to update project", error: err.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Project.findOneAndDelete({ _id: id, employer: req.user.id });
        if (!deleted) return res.status(404).json({ message: "Project not found or unauthorized" });

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete project", error: err.message });
    }
};
