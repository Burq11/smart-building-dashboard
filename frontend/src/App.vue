<template>
  <div class="container">
    <h1>🏢 Smart Building Dashboard</h1>
    <RoomList />
  </div>
</template>

<script setup>
import RoomList from './components/RoomList.vue';
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #963535;
}
.container {
  padding: 2rem;
}
</style>
