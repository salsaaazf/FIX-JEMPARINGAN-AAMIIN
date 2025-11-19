<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'
import { User, Trophy, CreditCard } from 'lucide-vue-next'

const authStore = useAuthStore()

const step = ref(1) 
const selectedRole = ref('') 

const formData = ref({
  idNumber: '',
  name: ''
})

const selectRole = (role) => {
  selectedRole.value = role
  step.value = 2 
}

const handleLogin = () => {
  if (!formData.value.idNumber || !formData.value.name) {
    Swal.fire('Error', 'Mohon lengkapi data', 'error')
    return
  }

  authStore.login(formData.value, selectedRole.value)
  
  Swal.fire({
    icon: 'success',
    title: `Welcome, ${formData.value.name}!`,
    text: `Login as ${selectedRole.value}`,
    timer: 1500,
    showConfirmButton: false
  })
}
</script>

<template>
  <div class="login-container">
    <div class="bg-image"></div>
    <div class="bg-overlay"></div>

    <div class="header-text">
      <h1>Simplify your scoring, sharpen your focus, and aim for perfection</h1>
    </div>

    <div class="white-card">
      
      <div v-if="step === 1" class="content-wrapper">
        <div class="title-group">
          <h2>Sign <u>in as</u></h2>
          <p>*Choose your role to continue</p>
        </div>

        <div class="button-group">
          <button @click="selectRole('participant')" class="btn-role">
            <Trophy size="20" /> Participant
          </button>
          <button @click="selectRole('committee')" class="btn-role">
            <User size="20" /> Committee
          </button>
        </div>
      </div>

      <div v-else class="content-wrapper">
        <div class="title-group">
          <h2>Sign <u>in</u></h2>
        </div>

        <div class="form-input">
          <label>ID Number</label>
          <div class="input-box">
            <CreditCard size="18" class="icon" />
            <input v-model="formData.idNumber" type="text" placeholder="83733847" />
          </div>
        </div>

        <div class="form-input">
          <label>Name</label>
          <div class="input-box">
            <User size="18" class="icon" />
            <input v-model="formData.name" type="text" placeholder="John Doe" />
          </div>
        </div>

        <button @click="handleLogin" class="btn-confirm">Confirm</button>
        <p @click="step = 1" class="back-link">Change Role</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
* { font-family: 'Poppins', sans-serif;
  box-sizing: border-box; 
  margin: 0; padding: 0; 
}

.login-container {
  position: relative;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
  background: #333;
}

.bg-image {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 60%;
  background-image: url('/fotoLogin.png');
  background-size: cover;
  background-position: center;
}

.bg-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 60%;
  background: linear-gradient(to bottom, rgba(59, 93, 80, 0.8), rgba(59, 93, 80, 0.4));
}

.header-text {
  position: absolute;
  top: 8%; left: 25px; right: 20px;
  color: white;
  z-index: 10;
}

.header-text h1 { 
    font-size: 20px; 
    font-weight: 600; 
    line-height: 1.4; 
}

.white-card {
  position: absolute;
  bottom: 0; left: 0; width: 100%;
  height: 60%; 
  background: white;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;

  clip-path: ellipse(130% 100% at 50% 100%);
  padding: 80px 25px 30px 25px;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

.white-card {
  clip-path: none; /* Reset */
  border-radius: 0;
  background: transparent;
}

.white-card::before {
  content: "";
  position: absolute;
  top: 40px; 
  left: -10%;
  width: 120%;
  height: 120%;
  background: #F9F9F9;
  border-top-left-radius: 50% 100px; 
  border-top-right-radius: 50% 100px;
  z-index: -1;
  box-shadow: 0 -10px 20px rgba(0,0,0,0.1);
}

.content-wrapper { 
    position: relative; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    justify-content: center;
}

.title-group { 
    margin-bottom: 30px; 
}

h2 { 
    font-size: 28px; 
    font-weight: 700; 
    color: #000; 
    margin: 0; 
}
h2 u { 
    text-decoration-color: #3B5D50; 
    text-decoration-thickness: 4px; 
}
p { 
    color: #666; 
    font-size: 12px; 
    margin-top: 5px; 
}

.button-group { 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
}

.btn-role {
  background-color: #3B5D50;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 20px;  
  font-weight: 600;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 10px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-role:active { transform: scale(0.98); }

.form-input { 
    margin-bottom: 20px; 
}

.form-input label { 
    display: block; 
    font-size: 12px; 
    font-weight: 700; 
    margin-bottom: 5px; 
}

.input-box {
  display: flex; align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 5px;
}
.input-box input {
  border: none; 
  background: transparent; 
  width: 100%; outline: none;
  padding-left: 10px; 
  font-size: 14px;
}

.btn-confirm {
  background-color: #3B5D50;
  color: white;
  width: 100%; padding: 15px;
  border: none; border-radius: 30px;
  font-size: 16px; font-weight: 600;
  margin-top: 20px; cursor: pointer;
}

.back-link { 
    text-align: center; 
    cursor: pointer; 
    text-decoration: underline; 
    margin-top: 15px; }
</style>