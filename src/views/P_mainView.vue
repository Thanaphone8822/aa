<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabRoutes = [
    { path: '/pmain/main', label: 'ໜ້າຫຼັກ' },
    { path: '/pmain/fines', label: 'ການປັບໄໝ' },
    { path: '/pmain/rules', label: 'ກົດລະບຽບຈະລາຈອນ' },
    { path: '/pmain/report', label: 'ປະຫວັດການປັບໄໝ' }
]

const username = ref('')

onMounted(async () => {
    if (route.path === '/pmain' || route.path === '/') {
        router.replace('/pmain/main')
    }

    // Fetch police profile
    try {
        const res = await fetch('http://localhost:3000/api/police/profile', { credentials: 'include' })
        const data = await res.json()
        if (data.code === 10 && data.data) {
            username.value = data.data.username || 'Profile'
        } else {
            username.value = 'Profile'
        }
    } catch (e) {
        username.value = 'Profile'
    }
})

const showLogoutModal = ref(false)

const handleLogout = async () => {
    try {
        await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        })
    } catch (e) { }
    router.push('/login')
}
</script>

<template>
    <!-- Fixed Main Header -->
    <div class="fixed top-0 left-0 right-0 bg-gradient-to-t from-zinc-200 to-green-700 text-white p-4 shadow-lg z-50">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <!-- Police Logo -->
                <div class="flex items-center gap-2">
                    <img class="w-17 h-20 object-cover" src="@/assets/PKS logo.png" alt="logo">
                </div>
                <div>
                    <h1 class="text-black text-2xl font-bold font-lao">ກົມຕຳຫຼວດຈະລາຈອນ</h1>
                    <p class="text-black text-sm font-inter">Traffic Police Department</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-black text-sm font-lao">{{ username }}</span>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="@/assets/personicon.jpg" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
                        <li>
                            <a class="justify-between">
                                {{ username }} 
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a @click="showLogoutModal = true">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Layout with top padding for fixed header -->
    <div class="flex pt-24">
        <!-- Fixed Sidebar with Tabs -->
        <div
            class="fixed left-0 top-24 w-64 bg-sky-800 shadow-lg mt-4 drop-shadow-xl text-white h-screen z-40 overflow-y-auto">
            <div class="p-4 space-y-2">
                <button v-for="tab in tabRoutes" :key="tab.path" @click="router.push(tab.path)"
                    :class="['block w-full text-left py-3 px-4 rounded transition-colors font-lao', route.path.startsWith(tab.path) ? 'bg-sky-900 text-white' : 'hover:bg-blue-700']">
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 ml-64 p-6 bg-gray-100 min-h-screen overflow-y-auto">
            <router-view />
        </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
            <h2 class="text-xl font-bold mb-4 text-red-600">ຢືນຢັນການອອກຈາກລະບົບ</h2>
            <p class="mb-6 text-black">ທ່ານຕ້ອງການຈະອອກຈາກລະບົບບໍ?</p>
            <div class="flex justify-center gap-4">
                <button @click="handleLogout" class="btn btn-primary w-[70px]">ຕົກລົງ</button>
                <button @click="showLogoutModal = false" class="btn btn-warnin w-[70px]">ຍົກເລີກ</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Pure Tailwind CSS - No custom styles */
</style>