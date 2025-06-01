const fs = require("fs");
const path = require("path");
const axios = require("axios");

const SENSOR_TYPES = ["temperature", "co2", "occupancy"];
const API_URL = "http://localhost:8000/api/sensors";
const INTERVAL_MS = 60 * 1000; // 30 seconds

// Load room definitions
const roomsPath = path.join(__dirname, "..", "data", "rooms.json");
const rooms = JSON.parse(fs.readFileSync(roomsPath, "utf8"));

function getRandomSensorValue(sensorType) {
  switch (sensorType) {
    case "temperature":
      return +(Math.random() * 5 + 20).toFixed(1); // 20–25°C
    case "co2":
      return Math.floor(Math.random() * 800 + 400); // 400–1200 ppm
    case "occupancy":
      return Math.random() > 0.5;
    default:
      return null;
  }
}

async function sendFakeData() {
  for (const room of rooms) {
    for (const sensor of SENSOR_TYPES) {
      const value = getRandomSensorValue(sensor);
      const payload = {
        room_id: room.id,
        sensor_type: sensor,
        value: value,
        timestamp: new Date().toISOString()
      };

      try {
        await axios.post(API_URL, payload);
        console.log(`[${new Date().toLocaleTimeString()}] Sent:`, payload);
      } catch (error) {
        console.error("Error sending data:", error.message);
      }
    }
  }
}

// Run once now, then repeat every minute
sendFakeData();
setInterval(sendFakeData, INTERVAL_MS);