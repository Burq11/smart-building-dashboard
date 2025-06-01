# 🏢 Smart Building Dashboard – Backend API

A simulation-based backend API for monitoring environmental and occupancy data in a smart office building. Sensor data is generated and sent periodically for three rooms inspired by the TV series *The Office*.

---

## Features Implemented

### 📡 Sensor Simulation
- Simulates 3 sensor types: `temperature`, `co2`, and `occupancy`
- Sends randomized, realistic data every minute for each room
- Uses `axios` to post data to backend API

### 📦 Backend API (Node.js + Express)
- REST API to receive and retrieve sensor data
- In-memory simulation replaced with persistent storage using SQLite
- Modular routes for rooms and sensors

### 🗄️ Database (SQLite)
- Stores sensor data persistently in `smart_building.db`
- Automatically creates `sensor_data` table if not present

---

## 🧱 Rooms Config

Stored in `data/rooms.json`:

```json
[
  {
    "id": "michael_office",
    "name": "Michael's Office",
    "building": "Dunder Mifflin Scranton HQ"
  },
  {
    "id": "conference_room",
    "name": "Conference Room",
    "building": "Dunder Mifflin Scranton HQ"
  },
  {
    "id": "bullpen",
    "name": "Bullpen",
    "building": "Dunder Mifflin Scranton HQ"
  }
]

| Method | Endpoint                                 | Description                                 |
| ------ | ---------------------------------------- | ------------------------------------------- |
| GET    | `/api/rooms`                             | List all rooms                              |
| POST   | `/api/sensors`                           | Submit new sensor reading                   |
| GET    | `/api/sensors/latest`                    | Last 20 sensor entries                      |
| GET    | `/api/sensors/:room_id/latest`           | Latest value of each sensor in one room     |
| GET    | `/api/sensors/:room_id/history?sensor=x` | Historical readings of one sensor in a room |

How to Run
1. Install dependencies
npm install
2. Start the backend
node app.js
3. Start the sensor simulator (in another terminal)
node sensors/simulator.js