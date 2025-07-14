const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User");
const Project = require("./models/Project");
const Bid = require("./models/Bid");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const bidRoutes = require("./routes/bid.routes");


app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/bids", bidRoutes);
app.use("/admin", require("./routes/admin.routes"));


// Base route
app.get("/", (req, res) => res.send("HireHub API Running"));

app.get("/test-user", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => console.error("DB connection failed:", err));
