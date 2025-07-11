<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const policeId = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
    errorMessage.value = ''
    try {
        console.log('Login attempt:', policeId.value.trim(), password.value.trim());
        const response = await fetch('/api/police/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ PID: policeId.value.trim(), password: password.value.trim() }),
            credentials: 'include'
        })
        let data
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Invalid server response');
        }
        if (!response.ok || data.code !== 10) {
            throw new Error(data.message || 'Invalid Police ID or password')
        }
        errorMessage.value = '' // Clear any error before redirect
        // Redirect to police main dashboard (adjust route name as needed)
        router.push({ name: 'pmain' })
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
                    <label for="policeId" class="block text-sm font-medium text-gray-700">ລະຫັດບັດຕຳຫຼວດ:</label>
                    <input id="policeId" v-model="policeId" type="text" placeholder="Enter your Police ID" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-[#f54900] focus:border-[#f54900]" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">ລະຫັດຜ່ານ:</label>
                    <input id="password" v-model="password" type="password" placeholder="Enter your password" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-[#f54900] focus:border-[#f54900]" />
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-[#f54900] text-white font-medium rounded-md hover:bg-[#d43d00] focus:outline-none focus:ring-2 focus:ring-[#f54900] focus:ring-offset-2">
                    ເຂົ້າສູ່ລະບົບ
                </button>
            </form>
            <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
            <div class="mt-4 text-center">
                <a href="/police-register" class="text-[#f54900] hover:underline">ຍັງບໍ່ມີບັນຊີ? ລົງທະບຽນ</a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>