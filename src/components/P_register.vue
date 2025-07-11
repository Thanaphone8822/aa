<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const policeId = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
    if (!policeId.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'All fields are required.'
        return
    }
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.'
        return
    }
    errorMessage.value = ''
    try {
        const response = await fetch('http://localhost:3000/api/police/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                card_code: policeId.value.trim(), // send as card_code for new backend
                policeid: policeId.value.trim(),
                password: password.value.trim()
            }),
            credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
            successMessage.value = 'Registration successful! You can now log in.'
            setTimeout(() => {
                router.push({ name: 'plogin' })
            }, 1000)
        } else {
            throw new Error(data.message || 'Registration failed')
        }
    } catch (error: any) {
        errorMessage.value = error.message
        successMessage.value = ''
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Police Register</h1>
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label for="policeId" class="block text-sm font-medium text-gray-700">Police ID:</label>
                    <input id="policeId" v-model="policeId" type="text" placeholder="Enter your Police ID" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-[#f54900] focus:border-[#f54900]" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                    <input id="password" v-model="password" type="password" placeholder="Enter your password" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-[#f54900] focus:border-[#f54900]" />
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm
                        Password:</label>
                    <input id="confirmPassword" v-model="confirmPassword" type="password"
                        placeholder="Confirm your password" required
                        class="mt-1 block h-[40px] w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-[#f54900] focus:border-[#f54900]" />
                </div>
                <button type="submit"
                    class="w-full py-2 px-4 bg-[#f54900] text-white font-medium rounded-full hover:bg-[#d43d00] focus:outline-none focus:ring-2 focus:ring-[#f54900] focus:ring-offset-2">
                    Register
                </button>
            </form>
            <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
            <p v-if="successMessage" class="mt-4 text-center text-green-600">{{ successMessage }}</p>
            <div class="mt-4 text-center">
                <a href="/plogin" class="text-[#f54900] hover:underline">Already have a police account? Login here</a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
