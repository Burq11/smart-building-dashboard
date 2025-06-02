<template>
  <div>
    <h2>Rooms</h2>
    <ul v-if="rooms.length">
      <li v-for="room in rooms" :key="room.id">
        🏠 {{ room.name }} <small>({{ room.building }})</small>
      </li>
    </ul>
    <p v-else>Loading rooms...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const rooms = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/api/rooms');
    rooms.value = await res.json();
  } catch (err) {
    console.error("Failed to fetch rooms:", err);
  }
});
</script>
