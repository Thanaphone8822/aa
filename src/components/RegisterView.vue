<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const NV = ref('')
const KS = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'ລະຫັດຜ່ານບໍ່ກົງກັນ'
    return
  }
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NV: NV.value.trim(),
        KS: KS.value.trim(),
        password: password.value.trim(),
      }),
    })
    const data = await response.json()
    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Registration failed')
    }
    router.push('/login')
  } catch (error: any) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 font-noto">ລົງທະບຽນ</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="NV" class="block text-sm font-medium text-gray-700 font-noto">ລະຫັດ NV:</label>
          <input id="NV" v-model="NV" type="text" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            style="color: black;" />
        </div>
        <div class="mb-4">
          <label for="KS" class="block text-sm font-medium text-gray-700 font-noto">ລະຫັດ KS:</label>
          <input id="KS" v-model="KS" type="text" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            style="color: black;" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 font-noto">ລະຫັດຜ່ານ:</label>
          <input id="password" v-model="password" type="password" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            style="color: black;" />
        </div>
        <div class="mb-4">
          <label for="confirm-password"
            class="block text-sm font-medium text-gray-700 font-noto">ຢືນຢັນລະຫັດຜ່ານ:</label>
          <input id="confirm-password" v-model="confirmPassword" type="password" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            style="color: black;" />
        </div>
        <button type="submit"
          class="font-noto block w-full py-2 px-4 bg-[#f54900] text-white rounded-md hover:bg-[#d13e00] focus:outline-none focus:ring-2 focus:ring-[#f54900] focus:ring-offset-2">
          ລົງທະບຽນ
        </button>
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 font-noto">ມີບັນຊີແລ້ວ?</p>
          <a href="/login"
            class="text-sm font-noto text-[#f54900] hover:underline hover:text-[#d13e00]">ເຂົ້າສູ່ລະບົບ</a>
        </div>
        <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap');

.font-noto {
  font-family: 'Noto Sans Lao', sans-serif;
}

input:focus {
  border-color: #f54900 !important;
  box-shadow: 0 0 0 1.5px #f5490033;
}
</style>

<style scoped></style>