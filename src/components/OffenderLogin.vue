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

const API_BASE = 'http://localhost:3000/api';

const handleLogin = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
        // Use the correct endpoint for offender login
        const response = await fetch(`${API_BASE}/user/login`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NV: NV.value.trim(),
                KS: KS.value.trim(),
                password: password.value.trim(),
            }),
        })

        let data
        // Only try to parse JSON if content-type is JSON
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Invalid server response');
        }

        if (!response.ok || (typeof data.code !== 'undefined' ? data.code !== 10 : data.success === false)) {
            throw new Error(data.message || 'Invalid credentials')
        }

        // Now fetch the user's profile, but do not throw if it fails
        try {
            const profileRes = await fetch(`${API_BASE}/user/profile`, { credentials: 'include' })
            if (profileRes.ok) {
                const profileData = await profileRes.json()
                if (profileData.code === 10 && profileData.data) {
                    userName.value = profileData.data.name || profileData.data.username
                }
            }
        } catch (e) {
            // Ignore profile fetch errors
        }

        errorMessage.value = '' // Clear any error before redirect
        router.push({ name: 'main' })
    } catch (error: any) {
        errorMessage.value = error.message
    } finally {
        loading.value = false
    }
}

// Check cookie/session on mount
onMounted(async () => {
    try {
        const res = await fetch(`${API_BASE}/user`, { credentials: 'include' });
        let data: any = {};
        if (res.ok) {
            data = await res.json();
            if (data?.code === 10) {
                router.push({ name: 'main' });
            }
        }
        // If not ok (e.g., 401), do nothing: user is not logged in, this is expected
    } catch (e) {
        // Ignore network or parse errors
    }
});
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">ເຂົ້າສູ່ລະບົບ</h1>
            <form @submit.prevent="handleLogin" class="space-y-4" autocomplete="off">
                <div>
                    <label for="NV" class="block text-sm font-medium text-gray-700">ລະຫັດ NV:</label>
                    <input id="NV" v-model="NV" type="text" placeholder="Enter your NV" required autocomplete="off"
                        class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-[#f54900] focus:border-[#f54900] focus:outline-none
                   hover:ring-2 hover:ring-[#f54900]" />
                </div>
                <div>
                    <label for="KS" class="block text-sm font-medium text-gray-700">ລະຫັດ KS:</label>
                    <input id="KS" v-model="KS" type="text" placeholder="Enter your KS" required autocomplete="off"
                        class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-[#f54900] focus:border-[#f54900] focus:outline-none
                   hover:ring-2 hover:ring-[#f54900]" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">ລະຫັດຜ່ານ:</label>
                    <input id="password" v-model="password" type="password" placeholder="Enter your password" required
                        autocomplete="off" class="mt-1 text-slate-600 block w-full h-10 rounded-md shadow-sm
                   focus:ring-2 focus:ring-[#f54900] focus:border-[#f54900] focus:outline-none
                   hover:ring-2 hover:ring-[#f54900]" />
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full py-2 px-4 bg-[#f54900] text-white font-medium rounded-md hover:bg-[#d43d00] focus:outline-none focus:ring-2 focus:ring-[#f54900] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading">ກຳລັງເຂົ້າ...</span>
                    <span v-else>ເຂົ້າສູ່ລະບົບ</span>
                </button>
                <div class="flex justify-center items-center mt-4 space-x-2">
                    <span class="text-sm text-gray-600">ຍັງບໍ່ມີບັນຊີ?</span>
                    <router-link to="/register" class="text-sm text-[#f54900] hover:underline">ລົງທະບຽນ</router-link>
                </div>
            </form>
            <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<style scoped>
/* No custom styles needed since Tailwind CSS is used */
</style>
