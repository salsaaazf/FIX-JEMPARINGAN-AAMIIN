<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useJemparinganStore } from '@/stores/jemparinganStore.js'
import { ArrowLeft, Save, CheckSquare } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const jemparinganStore = useJemparinganStore()

const formData = reactive({
  idPemanah: '',
  idPanah: '',
  status: '' // 'Merah' atau 'Putih'
})

// State untuk List Local (Untuk tampilan tabel sesuai gambar)
// Kita gunakan dummy data awal agar mirip mockup, lalu data baru akan di-push ke sini
const entryList = ref([
  { idPemanah: '5382', idPanah: 'P-01', status: 'Merah' },
  { idPemanah: '5382', idPanah: 'P-02', status: 'Putih' },
  { idPemanah: '5382', idPanah: 'P-03', status: 'Putih' },
  { idPemanah: '5382', idPanah: 'P-04', status: 'Merah' },
])

const goBack = () => {
  authStore.role = 'committee'
}

const handleSave = () => {
  // 1. Validasi Input
  if (!formData.idPemanah || !formData.idPanah || !formData.status) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Data',
      text: 'Please fill in ID Pemanah, ID Panah, and select a Status.',
      confirmButtonColor: '#3B5D50'
    })
    return
  }

  const dataPayload = { 
    nomorPemanah: formData.idPemanah, 
    nama: `Pemanah ${formData.idPemanah}` 
  }

  if (formData.status === 'Merah') {
    // Clone array lama, tambah data baru, lalu update store
    const currentRed = [...jemparinganStore.redHits]
    currentRed.push(dataPayload)
    jemparinganStore.setRedHits(currentRed)
  } else if (formData.status === 'Putih') {
    const currentWhite = [...jemparinganStore.whiteHits]
    currentWhite.push(dataPayload)
    jemparinganStore.setWhiteHits(currentWhite)
  }

  // 3. Masukkan ke List Tampilan Lokal (Untuk Tabel di bawah form)
  // Masukkan ke paling atas (unshift) atau bawah (push). Di gambar urutannya P-01 s/d P-06, kita pakai push.
  entryList.value.push({
    idPemanah: formData.idPemanah,
    idPanah: formData.idPanah,
    status: formData.status
  })

  // 4. Notifikasi Sukses
  Swal.fire({
    icon: 'success',
    title: 'Saved!',
    text: `Data for ${formData.idPanah} has been saved.`,
    timer: 1500,
    showConfirmButton: false
  })

  // 5. Reset Form (kecuali ID Pemanah biasanya tetap sama untuk input cepat)
  formData.idPanah = ''
  formData.status = ''
  // formData.idPemanah = '' // Uncomment jika ingin reset ID pemanah juga
}
</script>

<template>
  <div class="page-container">
    
    <div class="top-nav">
      <button @click="goBack" class="btn-back">
        <ArrowLeft size="20" />
      </button>
      <span class="nav-title">Score Input</span>
      <div style="width: 20px;"></div> </div>

    <div class="content">
      
      <h2 class="section-title">Input Panah</h2>
      
      <div class="card form-card">
        <div class="card-header">New Entries</div>
        
        <div class="card-body">
          
          <div class="form-group">
            <label>ID Pemanah :</label>
            <input 
              v-model="formData.idPemanah" 
              type="text" 
              placeholder="input here......" 
            />
          </div>

          <div class="form-group">
            <label>ID Panah :</label>
            <input 
              v-model="formData.idPanah" 
              type="text" 
              placeholder="input here......" 
            />
          </div>

          <div class="form-group radio-group">
            <label>Status Panah :</label>
            <div class="radio-options">
              <label class="radio-label">
                <input 
                  type="radio" 
                  value="Merah" 
                  v-model="formData.status" 
                />
                <span class="custom-radio"></span>
                Merah
              </label>

              <label class="radio-label">
                <input 
                  type="radio" 
                  value="Putih" 
                  v-model="formData.status" 
                />
                <span class="custom-radio"></span>
                Putih
              </label>
            </div>
          </div>

          <div class="action-right">
            <button @click="handleSave" class="btn-save">
              <CheckSquare size="16" /> Save
            </button>
          </div>

        </div>
      </div>

      <h2 class="section-title mt-large">List ID & Status Panah</h2>
      
      <div class="card table-card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Pemanah</th>
                <th>ID Panah</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in entryList" :key="index">
                <td>{{ item.idPemanah }}</td>
                <td>{{ item.idPanah }}</td>
                <td>
                  <span 
                    class="badge" 
                    :class="{
                      'bg-red': item.status === 'Merah',
                      'bg-gray': item.status === 'Putih',
                      'bg-yellow': item.status === 'Cadangan' 
                    }"
                  >
                    {{ item.status }} 
                    <span class="arrow-down">▼</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>5382</td>
                <td>P-05</td>
                <td><span class="badge bg-yellow">Cadangan ▼</span></td>
              </tr>
               <tr>
                <td>5382</td>
                <td>P-06</td>
                <td><span class="badge bg-yellow">Cadangan ▼</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.page-container {
  background-color: #F5F5F5;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}

/* Header/Nav Style */
.top-nav {
  background-color: #3B5D50;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.btn-back {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
}
.nav-title {
  font-weight: 600;
  font-size: 16px;
}

.content {
  padding: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 15px;
  margin-top: 5px;
}

.mt-large {
  margin-top: 30px;
}

/* Card Styles */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  border: 1px solid #E0E0E0;
}

.card-header {
  background-color: #3B5D50;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.card-body {
  padding: 20px;
}

/* Form Styles */
.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  width: 110px; /* Fixed width labels aligned like image */
  font-weight: 600;
  font-size: 13px;
  color: #000;
}

.form-group input[type="text"] {
  flex: 1;
  background-color: #F9F9F9;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 13px;
  color: #666;
  outline: none;
}
.form-group input[type="text"]::placeholder {
  color: #ccc;
}

/* Radio Button Styling */
.radio-options {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  color: #000;
}

.radio-label input {
  display: none; /* Hide default radio */
}

.custom-radio {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}

.radio-label input:checked + .custom-radio {
  border-color: #3B5D50;
}

.radio-label input:checked + .custom-radio::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #3B5D50;
  border-radius: 50%;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

/* Button Save */
.action-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-save {
  background-color: #3B5D50;
  color: white;
  border: none;
  padding: 8px 25px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.btn-save:hover {
  background-color: #2e4b40;
}

/* Table Styles */
.table-container {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #3B5D50;
  color: white;
  padding: 12px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.2);
}
th:last-child { border-right: none; }

td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
  font-size: 13px;
  color: #333;
}
td:last-child { border-right: none; }

/* Status Badges */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  min-width: 80px;
  gap: 5px;
}

.bg-red {
  background-color: #E74C3C; /* Warna Merah */
  color: white;
}

.bg-gray {
  background-color: #E0E0E0; /* Warna Putih/Abu */
  color: #555;
}

.bg-yellow {
  background-color: #F6E58D; /* Warna Cadangan */
  color: #F39C12; /* Text agak gelap */
  color: #bfa319; 
  color: #cfb11a;
  color: #8a7304;
}
/* Adjusting yellow to match image better */
.bg-yellow {
  background-color: #EBE888; 
  color: white; /* Image text looks white actually on yellow? No, looks whiteish/light */
  color: #fff;
}
/* Correction based on image: Yellow bg with white text is hard to read, image uses lighter yellow with white text maybe? 
   Let's use a standard accessible yellow or mimics the image strictly.
   Image yellow: looks like #EBEFA0 approx. Text is white.
*/
.bg-yellow {
   background-color: #E6EE9C;
   color: #fff;
   text-shadow: 0px 0px 2px rgba(0,0,0,0.2);
}

/* Override colors to match exact image aesthetic */
.bg-red { background-color: #D9534F; }
.bg-gray { background-color: #D3D3D3; color: #555; }
.bg-yellow { background-color: #E6EE9C; color: #fff; font-weight: bold; text-shadow: 0 1px 1px rgba(0,0,0,0.2); }

.arrow-down {
  font-size: 8px;
  margin-left: 2px;
}

</style>