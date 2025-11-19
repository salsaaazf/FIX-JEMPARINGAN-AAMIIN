import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', () => {
  const entries = ref([
    { id: 1, round: '1', target: 'A', date: '2025-10-18' },
    { id: 2, round: '2', target: 'B', date: '2025-10-18' },
  ])

  function addEntry(data) {
    entries.value.push({
      id: Date.now(),
      ...data
    })
  }

  function deleteEntry(id) {
    entries.value = entries.value.filter(item => item.id !== id)
  }

  function updateEntry(id, newData) {
    const index = entries.value.findIndex(item => item.id === id)
    if (index !== -1) {
      entries.value[index] = { id, ...newData }
    }
}
  return { entries, addEntry, deleteEntry, updateEntry }
})