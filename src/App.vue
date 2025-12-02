<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useInputStore } from '@/stores/inputStore'
import { useJemparinganStore } from '@/stores/jemparinganStore'
import LoginView from '@/components/LoginView.vue'
import InputPage from '@/components/InputPage.vue'
import rekapTable from '@/components/rekap-table.vue'
import InputScorePage from '@/components/InputScorePage.vue'

const store = useInputStore()
const authStore = useAuthStore()
const jemparinganStore = useJemparinganStore()

</script>

<template>
  <LoginView v-if="!authStore.user" />
  <div v-else>
    
    <InputPage v-if="authStore.role === 'committee'" />

    <InputScorePage v-else-if="authStore.role === 'score_input'" /> <rekap-table v-else-if="authStore.role === 'recap'" />

    <div v-else-if="authStore.role === 'participant'" class="placeholder-page">
      <h1>Halaman Participant</h1>
      <p>Halo, {{ authStore.user.name }}!</p>
      <p>Status: Peserta (Menunggu modul Rekap Skor)</p>
      <button @click="authStore.logout()" style="margin-top: 20px;">Logout</button>
    </div>
    
    <rekap-table v-else-if="authStore.role === 'recap'" />
  </div>
</template>

<style>

body {
  margin: 0;
  padding: 0;
  background-color: #E5E5E5;
  font-family: 'Poppins', sans-serif;
}

.placeholder-page {
  text-align: center;
  padding: 50px;
  font-family: 'Poppins', sans-serif;
}

.btn-logout {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #355f56;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>