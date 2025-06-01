const Database = require("better-sqlite3");
const db = new Database("smart_building.db");

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    sensor_type TEXT NOT NULL,
    value TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )
`).run();

module.exports = db;