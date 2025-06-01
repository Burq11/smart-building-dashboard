const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Middleware
router.get("/", (req, res) => {
    const filePath = path.join(__dirname, "..", "data", "rooms.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading rooms.json:", err);
            return res.status(500).json({ error: "Failed to load room data" });
        }
        res.json(JSON.parse(data));
        });
    });

module.exports = router;