const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type:
            String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employer", "freelancer", "admin"],
        default: "freelancer"
    },

    // Resume Parsing & AI
    resumeUrl: String,
    skills: [String],
    experience: String,
    bio: String,
    verified: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
});

module.exports = mongoose.model("User", userSchema);
