<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const NV = ref('')
const KS = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NV: NV.value,
        KS: KS.value,
        password: password.value
      }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    await response.json()
    router.push({ name: 'main' }) // Change 'main' to your desired route
  } catch (error: any) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">ເຂົ້າສູ່ລະບົບ</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="NV" class="block text-sm font-medium text-gray-700">ລະຫັດ NV:</label>
          <input id="NV" v-model="NV" type="text" placeholder="Enter your NV" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="KS" class="block text-sm font-medium text-gray-700">ລະຫັດ KS:</label>
          <input id="KS" v-model="KS" type="text" placeholder="Enter your KS" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">ລະຫັດຜ່ານ:</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          ເຂົ້າສູ່ລະບົບ
        </button>
        <div class="flex justify-center items-center mt-4 space-x-2">
          <span class="text-sm text-gray-600">ຍັງບໍ່ມີບັນຊີ?</span>
          <router-link to="/register" class="text-sm text-blue-600 hover:underline">ລົງທະບຽນ</router-link>
        </div>
      </form>
      <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
/* No custom styles needed since Tailwind CSS is used */
</style>
