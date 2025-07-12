<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import LogoutBtn from '@/components/LogoutBtn.vue';
</script>

<template>
  <main>
      
      <LogoutBtn/>
      
      <h3>Home</h3>
      
    
      
    <br>
    
  </main>
</template>

<style scoped>
  header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
  }

</style>
