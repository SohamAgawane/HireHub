const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    project: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true },
    freelancer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    bidAmount: { 
        type: Number, 
        required: true },
    proposal: String,
    status: { 
        type: String, 
        enum: ["pending", "accepted", "rejected"], 
        default: "pending" },

    createdAt: { 
        type: Date, 
        default: Date.now },
});

module.exports = mongoose.model("Bid", bidSchema);
