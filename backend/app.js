const express = require("express");
const cors = require("cors");
const app = express();
const roomsRouter = require("./routes/rooms");
const sensorsRouter = require("./routes/sensors");


const PORT = process.env.PORT || 8000;
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use("/api/rooms", roomsRouter);
app.use("/api/sensors", sensorsRouter);

app.listen(PORT, () => {
    console.log(`Smart Office API is running at http://localhost:${PORT}`);
});