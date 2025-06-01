const express = require("express");
const db = require("../db/database"); 
const router = express.Router();


// Middleware to handle JSON requests
router.post("/", (req, res) => {
    const {room_id, sensor_type, value, timestamp} = req.body;

    if (!room_id || !sensor_type || value === undefined || !timestamp) {
        return res.status(400).json({error: "Invalid format for sensor data"});
    }

    const stmt = db.prepare(`
    INSERT INTO sensor_data (room_id, sensor_type, value, timestamp)
    VALUES (?, ?, ?, ?)
  `);

   stmt.run(room_id, sensor_type, String(value), timestamp);
   res.json({status: "ok"});
});

//return last 20 entries
router.get("/latest", (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM sensor_data
    ORDER BY timestamp DESC
    LIMIT 20
  `).all();

  res.json(rows);
});

// Get latest sensor data for a specific room
router.get("/:room_id/latest", (req, res) => {
  const roomId = req.params.room_id;

  const stmt = db.prepare(`
    SELECT sensor_type, value, timestamp
    FROM sensor_data
    WHERE room_id = ?
    AND timestamp = (
      SELECT MAX(timestamp)
      FROM sensor_data s2
      WHERE s2.sensor_type = sensor_data.sensor_type
      AND s2.room_id = ?
    )
    GROUP BY sensor_type
  `);

  const rows = stmt.all(roomId, roomId);
  res.json(rows);
});

// Get sensor history for a specific room and sensor type
router.get("/:room_id/history", (req, res) => {
  const { sensor } = req.query;
  const { room_id } = req.params;
  const limit = parseInt(req.query.limit) || 50;

  if (!sensor) {
    return res.status(400).json({ error: "Missing sensor query parameter" });
  }

  const stmt = db.prepare(`
    SELECT value, timestamp
    FROM sensor_data
    WHERE room_id = ? AND sensor_type = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `);

  const rows = stmt.all(room_id, sensor, limit);
  res.json(rows.reverse()); // chronological order
});

module.exports = router;