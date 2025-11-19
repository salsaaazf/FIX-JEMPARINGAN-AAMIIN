import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null) // Data user (nama, id)
  const role = ref(null) // 'committee' atau 'participant'

  // Fungsi Login
  function login(userData, selectedRole) {
    user.value = userData
    role.value = selectedRole
  }

  // Fungsi Logout
  function logout() {
    user.value = null
    role.value = null
  }

  return { user, role, login, logout }
})