<script setup>
import { ref } from 'vue'
import { useInputStore } from '@/stores/inputStore.js' 
import { useAuthStore } from '@/stores/authStore.js' 
import { useJemparinganStore } from '@/stores/jemparinganStore.js'
import { Trash2, Edit, Calendar, User, Save, RefreshCw, FileText  } from 'lucide-vue-next' 
import Swal from 'sweetalert2' 

const store = useInputStore()
const authStore = useAuthStore()
const jemparinganStore = useJemparinganStore()

const form = ref({
  round: '',
  target: '',
  date: ''
})

const isEditing = ref(false)
const editingId = ref(null)

const handleSave = () => {
  if (!form.value.round || !form.value.target || !form.value.date) {

    Swal.fire({
      icon: 'error',
      title: `Oh No, ${ authStore.user?.name || 'Committee' }!`,
      text: 'All data must be filled in!',
      confirmButtonColor: '#3B5D50'
    })
    return
  }

  if (isEditing.value) {
    store.updateEntry(editingId.value, { ...form.value })
    Swal.fire({
      icon: 'success',
      title: 'Done!',
      text: 'The data has been updated.',
      timer: 1500,
      showConfirmButton: false
    })
    form.value = { round: '', target: '', date: '' }
  }
  else {
    store.addEntry({ ...form.value })
    Swal.fire({
      icon: 'success',
      title: 'Succeed',
      text: 'Data saved!',
      timer: 1500,
      showConfirmButton: false
    })
  }
  form.value = { round: '', target: '', date: '' }
  isEditing.value = false
  editingId.value = null
}

const handleDelete = (id) => {
  Swal.fire({
    title: 'Delete this data?!',
    text: `Data cannot be restored anymore, ${ authStore.user?.name || 'Committee' }!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3B5D50',
    confirmButtonText: 'Yeah, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      store.deleteEntry(id)
      if (editingId.value === id) {
        isEditing.value = false
        editingId.value = null
        form.value = { round: '', target: '', date: '' }
      }
      Swal.fire('Deleted!', 'The data has been deleted.', 'success')
    }
  })
}

const handleAction = (item) => {
  Swal.fire({
    title: 'Choose Action',
    text: `What do you want to do ${ authStore.user?.name || 'Committee' }?`,
    icon: 'question',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Panah ku',
    denyButtonText: `Edit Data`,
    confirmButtonColor: '#3B5D50',
    denyButtonColor: '#d33',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      jemparinganStore.setMatchInfo(item.round, item.target);
      authStore.role = 'score_input';
    } else if (result.isDenied) {
      startEditing(item)
    }
    
  })
}

const startEditing = (item) => {
  isEditing.value = true
  editingId.value = item.id
  form.value = {
    round: item.round,
    target: item.target,
    date: item.date
  }
  window.scrollTo({top: 0, behavior: 'smooth'})
}

const handleDisplay = (item) =>{
  Swal.fire({
    title: 'Display Data',
    icon: 'success',
    html: `Displaying data for <strong> Round: ${item.round} - Target: ${item.target}</strong>.`,
    timer: 2000,
    showConfirmButton: false,
    willClose: () => {
      jemparinganStore.setMatchInfo(item.round, item.target);
      authStore.role = 'recap';
    }
  });
}

/*
const simulateScan = (item) => {
  Swal.fire({
    title: 'Start Scan...',
    html: `Sedang memindai data untuk <strong> Round: ${item.round} - Target: ${item.target}</strong>.`,
    timer: 2000,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      Swal.fire({
        icon: 'success',
        title: 'Scan Selesai!',
      })
    }
  })
}
*/

/*
const cancelEdit = () => {
isEditing.value = false
editingId.value = null
  form.value = { round: '', target: '', date: '' }
} 

store.addEntry({ ...form.value }) 
  Swal.fire({
    icon: 'success',
    title: 'Succeed',
    text: 'Data saved!',
    timer: 1500,
    showConfirmButton: false
  })

  form.value = { round: '', target: '', date: '' }
*/
</script>

<template>
  <div class="container">
    <header class="top-bar">
      <div class="user-info" @click="authStore.logout()" style="cursor: pointer">
        <User class="icon" />
        <span>{{ authStore.user?.name || 'Committee' }} (Logout)</span> 
      </div>
    </header>

    <main class="content">
      <h2 class="section-title">Input Round & Target</h2>
      <div class="card" :class="{ 'editing-mode': isEditing }">
        <div class="card-header">{{ isEditing ? 'Edit Existing Entry' : 'New Entries'}}</div>
        <div class="card-body">
          
          <div class="form-group">
            <label>Round Input</label>
            <input v-model="form.round" type="text" placeholder="ex: 1" />
          </div>

          <div class="form-group">
            <label>Target Input</label>
            <input v-model="form.target" type="text" placeholder="ex: A" />
          </div>

          <div class="form-group">
            <label>Date</label>
            <div class="input-icon-wrapper">
              <Calendar class="input-icon" size="18" />
              <input v-model="form.date" type="date" placeholder="DD/MM/YYYY" />
            </div>
          </div>

          <div class="action-right">
            <button @click="handleSave" class="btn-save" :class="{ 'btn-update': isEditing}">
              <component :is="isEditing ? RefreshCw: Save" size="16" style="margin-right: 5px;"/> 
              {{ isEditing ? 'Update Data' : 'Save' }}
            </button>
          </div>
        </div>
      </div>

      <h2 class="section-title mt-large">Round and Target List</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Target</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in store.entries" :key="item.id">
              <td>{{ item.round }}</td>
              <td>{{ item.target }}</td>
              <td>{{ item.date }}</td>
              <td class="actions">
                <button @click="handleAction(item)" class="btn-icon edit"><Edit size="16" /></button> 
                <button @click="handleDelete(item.id)" class="btn-icon delete"><Trash2 size="16" /></button>
                <button @click="handleDisplay(item)" class="btn-icon display"><FileText size="16" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

.container {
  background-color: #F5F5F5;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd;
}

.top-bar {
  background-color: #355f56; 
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  font-weight: 500; 
}

.content { 
  padding: 20px; 
}

.section-title { 
  font-size: 18px; 
  font-weight: 600; 
  margin-bottom: 10px; 
  color: #000; 
}

.mt-large { 
  margin-top: 30px; 
}

.card { 
  background: white; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
}

.editing-mode {
  border: 2px solid #f39c12;
}

.card-header {
  background-color: #355f56;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
}

.card-body { 
  padding: 15px; 
}

.form-group { 
  margin-bottom: 12px; 
  display: flex; 
  align-items: center; 
}

.form-group label { 
  width: 100px; 
  font-size: 13px; 
  font-weight: 600; 
  color: #000; 
}

.form-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #F9F9F9;
  font-size: 12px;
}

.input-icon-wrapper { 
  position: relative; 
  flex: 1; 
  display: flex; 
  align-items: center; 
}

.input-icon { 
  position: absolute; 
  left: 10px; 
  color: #333; 
}

.input-icon-wrapper input { 
  padding-left: 35px; 
  width: 100%; }

.action-right { 
  display: flex; 
  justify-content: flex-end; 
  margin-top: 10px; 
  gap: 10px;
}

.btn-save {
  background-color: #3B5D50;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-update {
  background-color: #f39c12;
}

.btn-cancel {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.table-container { 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
}

table { 
  width: 100%; 
  border-collapse: collapse; 
  background: white; 
}

th {
  background-color: #3B5D50;
  color: white;
  padding: 12px;
  font-size: 13px;
  font-weight: 500;
}

td {
  padding: 10px;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid #eee;
  color: #333;
}

tr:first-child td { 
  border-bottom: 2px solid #4A90E2; 
  background-color: #F0F8FF; 
} 

.actions { 
  display: flex; 
  justify-content: center; 
  gap: 10px; 
}

.btn-icon { 
  background: none; 
  border: none; 
  cursor: pointer; 
  padding: 4px; 
}

.edit { 
  color: #4A90E2; 
  border: 1px solid #4A90E2; 
  border-radius: 4px; 
}

.delete { 
  color: #E74C3C; 
  border: 1px solid #E74C3C; 
  border-radius: 4px; 
}

.display { 
  color: #27AE60; 
  border: 1px solid #27AE60; 
  border-radius: 4px; 
}

</style>