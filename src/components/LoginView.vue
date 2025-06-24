<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/Table.vue' // Import the component to switch to

const router = useRouter()
const activeComponent = ref('login') // Default to 'login'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

// Handle login functionality
const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    console.log('Login successful:', data)
    activeComponent.value = 'dashboard' // Change to another component after login
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

// Handle "Back" button click
const handleBack = () => {
  activeComponent.value = 'table' // Change to the 'Table' component
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <!-- Conditionally Render Components -->
    <div v-if="activeComponent === 'login'" class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">ເຂົ້າສູ່ລະບົບ</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">ລະຫັດ ຂສ:</label>
          <input id="username" v-model="username" type="text" placeholder="Enter your username" required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="nua" class="block text-sm font-medium text-gray-700">ລະຫັດ ນວ:</label>
          <input id="nua" v-model="username" type="text" placeholder="Enter your NUA" required
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
          <a class="text-sm text-gray-600 hover:text-blue-500 cursor-pointer">ຍັງບໍ່ມີບັນຊີ?</a>
          <a href="#" class="text-sm text-blue-600 hover:underline">ລົງທະບຽນ</a>
        </div>
      </form>
      <button @click="handleBack"
        class="mt-4 w-full py-2 px-4 bg-gray-600 text-white font-medium rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        Back
      </button>
      <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
    </div>

    <!-- Render Table Component -->
    <div v-else-if="activeComponent === 'table'" class="w-full max-w-4xl">
      <Table />
    </div>
  </div>
</template>

<style scoped>
/* No custom styles needed since Tailwind CSS is used */
</style>
