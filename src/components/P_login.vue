<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const policeId = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
    // Example: Replace with your real API call
    if (policeId.value === 'police' && password.value === '1234') {
        router.push({ name: 'pmain' }) // Change to your police main route
    } else {
        errorMessage.value = 'Invalid Police ID or password'
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Police Login</h1>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label for="policeId" class="block text-sm font-medium text-gray-700">Police ID:</label>
                    <input id="policeId" v-model="policeId" type="text" placeholder="Enter your Police ID" required
                        class="mt-1 block h-[40px] w-full text-black border  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                    <input id="password" v-model="password" type="password" placeholder="Enter your password" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Login
                </button>
            </form>
            <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<style scoped></style>