<template>
  <div class="room-grid">
    <div v-for="room in rooms" :key="room.id" class="room-card">
      <h3>{{ room.name }}</h3>
      <p><strong>Building:</strong> {{ room.building }}</p>

      <div v-if="sensorData[room.id]">
      <p>🌡 Temperature: {{ sensorData[room.id].temperature }}°C</p>
      <p :class="getCO2Class(sensorData[room.id].co2)">
      🫁 CO₂: {{ sensorData[room.id].co2 }} ppm
      </p>
      <p>
        👤 Occupied: 
          <span :style="{ color: sensorData[room.id].occupancy ? 'green' : 'gray' }">
            {{ sensorData[room.id].occupancy ? 'Yes' : 'No' }}
          </span>
      </p>

    </div>
    <div v-else>
      <p>Loading sensor data...</p>
    </div>
  </div>
  </div>
</template> 


<script setup lang="ts">
import { onMounted, ref } from 'vue';


interface Room {
  id: string
  name: string
  building: string
}

interface SensorReading {
  sensor_type: string
  value: string
  timestamp: string
}

const rooms = ref<Room[]>([])
const sensorData = ref<Record<string, { temperature: string, co2: string, occupancy: boolean }>>({})



onMounted(async () => {
  const roomRes = await fetch('http://localhost:8000/api/rooms')
  rooms.value = await roomRes.json()

  for (const room of rooms.value) {
    const res = await fetch(`http://localhost:8000/api/sensors/${room.id}/latest`)
    const readings: SensorReading[] = await res.json()

    const data = {
      temperature: '',
      co2: '',
      occupancy: false
    }

    for (const reading of readings) {
      if (reading.sensor_type === 'temperature') data.temperature = reading.value
      if (reading.sensor_type === 'co2') data.co2 = reading.value
      if (reading.sensor_type === 'occupancy') data.occupancy = reading.value === 'true'
    }

    sensorData.value[room.id] = data
  }
})

function getCO2Class(value: string): string {
  const ppm = parseInt(value)
  if (ppm > 1000) return 'alert'
  if (ppm > 800) return 'warning'
  return 'normal'
}
</script>

<style scoped>
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.room-card {
  background: rgb(87, 40, 40);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.alert {
  color: red;
}

.warning {
  color: orange;
}

.normal {
  color: green;
}
</style>
