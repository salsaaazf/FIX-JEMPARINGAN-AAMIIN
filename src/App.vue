<script setup>
import { useAuthStore } from '@/stores/authStore'
import LoginView from '@/components/LoginView.vue'
import InputPage from '@/components/InputPage.vue'

const authStore = useAuthStore()
</script>

<template>
  <LoginView v-if="!authStore.user" />
  <div v-else>
    
    <InputPage v-if="authStore.role === 'committee'" />

    <div v-else-if="authStore.role === 'participant'" class="placeholder-page">
      <h1>Halaman Participant</h1>
      <p>Halo, {{ authStore.user.name }}!</p>
      <p>Status: Peserta (Menunggu modul Rekap Skor)</p>
      <button @click="authStore.logout()" style="margin-top: 20px;">Logout</button>
    </div>

  </div>
</template>

<style>
.placeholder-page {
  text-align: center;
  padding: 50px;
  font-family: 'Poppins', sans-serif;
}
</style>