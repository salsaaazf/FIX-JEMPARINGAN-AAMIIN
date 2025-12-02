<script setup>
import { ref, computed } from 'vue'
import { useJemparinganStore } from '../stores/jemparinganStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { ArrowLeft } from 'lucide-vue-next';

const jemparinganStore = useJemparinganStore();
const authStore = useAuthStore();

const goBack = () => {
  authStore.role = 'committee';
};

const currentPage = ref(1);
const rowsPerPage = ref(10);     

const totalPages = computed(() => {
  return Math.ceil(jemparinganStore.finalRecap.length / rowsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return jemparinganStore.finalRecap.slice(start, end);
});

const handleChangePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleRowPageChanges = (newValue) => {
  if(currentPage.value!=1){
    handleChangePage(1);
  }
}
</script>

<template>
<div class="container">
    <div class="header-nav">
      <div class="header-title-group">
        <h2 class="page-title">Display Data</h2>
        <p class="text"> {{ authStore.user?.name || 'Committee' }} in duties</p>
      </div>
      
      <button @click="goBack" class="btn-back">
        <ArrowLeft size="18" /> Back to Input Page
      </button>
    </div>

    <h1>Score Total</h1>
    <div>
      <p>Displaying data for <strong> Round: {{ jemparinganStore.matchInfo.round }} - Target: {{ jemparinganStore.matchInfo.target }}</strong></p>

      <table class="table-rekap">
        <thead>
           <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Red</th>
            <th>White</th>
            <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in paginatedData" :key="player.nomorPemanah">
            <td>{{ (currentPage-1)*rowsPerPage + index +1 }}</td>
            <td>{{ player.nama }}</td>
            <td>{{ player.red }}</td>
            <td>{{ player.white }}</td>
            <td>{{ player.total }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      
      <div class="pagination-container">
        <div class="pagination-button">
          <button class="pg-btn pg-arrow" 
            @click="handleChangePage(currentPage - 1)"
            :disabled="currentPage === 1">
            ‹
          </button>

          <button class="pg-btn"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="handleChangePage(page)">
            {{ page }}
          </button>

          <button class="pg-btn pg-arrow"
            @click="handleChangePage(currentPage + 1)"
            :disabled="currentPage === totalPages">
            ›
          </button>
        </div>
        
        <div class="showSubmit">
          <div class="showRow">
          <p class="show"> <strong>Show:</strong></p>
        <select v-model="rowsPerPage" class="row-select" @change="handleRowPageChanges">
          <option :value="10">10 rows</option>
          <option :value="20">20 rows</option>
          <option :value="50">50 rows</option>
        </select>
        </div>
        <button class="submitBtn">
          Submit Data
        </button>
        </div>
        
        
      </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');  
* { font-family: 'Popins', sans-serif;}

.container {
  padding: 20px;
  max-width: 480px; 
  margin: 0 auto;
  background-color: #F5F5F5;
  min-height: 100vh;
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  margin-bottom: 20px;
}

.header-title-group{
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  line-height: 1.2;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #3B5D50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-back:hover {
  background-color: #2E4B43;
}

h1 {
  color: #000000;
  text-align: left;
  font-size: 20pt;
  margin-top: 20px;
  font-family: poppins;
}

p {
  font-size: 12pt;
  font-family: poppins;
  text-align: bottom;
}

table.table-rekap {
  width: 100%;
  border-radius: 15px;
  border-collapse: separate;
  border-spacing: 0;
  font-family: poppins;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
}


thead th {
  background-color: #355F56;
  padding: 10px;
  text-align: left;
  color: #f5f5f5;
  text-align: center;
}

table td, table th {
  padding: 10px;
  border: 1px solid #ddd;
}

thead th {
  border: 1px solid #D9D9D9;
}

tbody tr:last-child td {
  border-bottom: 1px solid #D9D9D9;
}

thead th:first-child {
  border-top-left-radius: 15px;
}

thead th:last-child {
  border-top-right-radius: 15px;
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 15px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 15px;
}

.pagination-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.pagination-button {
    display: flex; 
    align-items: center; 
    gap: 8px; 
}

.pg-btn {
  padding: 6px 10px;
  border: none;
  background: #F5F5F5;
  border-radius: 50%;
  cursor: pointer;
}

.pg-btn.pg-arrow {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  font-size: 20px;
  font-weight: bold;
}

.pg-btn.active {
  background: #355F56;
  color: white;
  font-weight: bold;
}

.pg-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.showSubmit{
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 5px;
  margin-left: auto;
}

.show{
  margin: 0px;
}

.showRow {
  background: #F5F5F5;
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  padding: 6px 10px;
}

.row-select{
  height: 40px;
  border: none;
  background: #F5F5F5;
}

.submitBtn{
  background-color: #3B5D50;
  color: white;
  width: 130px;
  border-radius: 5px;
  border: none;
  padding-inline: 7px;
  padding-block: 5px;
  text-align: center;
  cursor: pointer;
  
}
</style>