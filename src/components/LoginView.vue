<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MD5 } from 'crypto-js'

const router = useRouter()
const NV = ref('')
const KS = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const userName = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NV: NV.value.trim(),
        KS: KS.value.trim(),
        password: MD5(password.value.trim()).toString(),
      }),
    })

    const data = await response.json()

    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Invalid credentials')
    }

    // Now fetch the user's profile
    const profileRes = await fetch('http://localhost:3000/api/user/profile', { credentials: 'include' })
    const profileData = await profileRes.json()
    if (profileData.code === 10 && profileData.data) {
      userName.value = profileData.data.name || profileData.data.username
    }

    router.push({ name: 'main' })
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

// Check cookie/session on mount
onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/user', { credentials: 'include' });
  const data = await res.json();
  if (data.code === 10) {
    router.push({ name: 'main' });
  }
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">ເຂົ້າສູ່ລະບົບ</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="NV" class="block text-sm font-medium text-gray-700">ລະຫັດ NV:</label>
          <input id="NV" v-model="NV" type="text" placeholder="Enter your NV" required class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                   hover:ring-2 hover:ring-blue-400" />
        </div>
        <div>
          <label for="KS" class="block text-sm font-medium text-gray-700">ລະຫັດ KS:</label>
          <input id="KS" v-model="KS" type="text" placeholder="Enter your KS" required class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                   hover:ring-2 hover:ring-blue-400" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">ລະຫັດຜ່ານ:</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" required class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                   hover:ring-2 hover:ring-blue-400" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading">ກຳລັງເຂົ້າ...</span>
          <span v-else>ເຂົ້າສູ່ລະບົບ</span>
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
