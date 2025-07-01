<script setup lang="ts">
import FinesPage from '@/components/FinesPage.vue'
import Police_home from '@/components/Police_home.vue'
import Rules from '@/components/Rules.vue'
import ReportFines from '@/components/ReportFines.vue'
import { ref } from 'vue'

// Tabs state
const activeTab = ref('main') // Default active tab

// Function to handle tab click
const setActiveTab = (tab: string) => {
    activeTab.value = tab
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
                <span class="text-black text-sm font-lao">ຊື່ ແລະ ນາມສະກຸນ</span>
                <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="@/assets/personicon.jpg" />
                            </div>
                        </div>
                        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
                            <li>
                                <a class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>

    <!-- Main Layout with top padding for fixed header -->
    <div class="flex pt-24">
        <!-- Fixed Sidebar with Tabs -->
        <div class="fixed left-0 top-24 w-64 bg-sky-800 shadow-lg drop-shadow-xl text-white h-screen z-40 overflow-y-auto">
            <div class="p-4 space-y-2">
                <!-- Tab 1: Main -->
                <button 
                    @click="setActiveTab('main')"
                    :class="['block w-full text-left py-3 px-4 rounded transition-colors font-lao',
                    activeTab === 'main' ? 'bg-sky-900 text-white' : 'hover:bg-blue-700']">ໜ້າຫຼັກ
                </button>

                <!-- Tab 2: Fines -->
                <button 
                    @click="setActiveTab('fines')"
                    :class="['block w-full text-left py-3 px-4 rounded transition-colors font-lao',
                    activeTab === 'fines' ? 'bg-sky-900 text-white' : 'hover:bg-blue-700']">ການປັບໄໝ
                </button>

                <!-- Tab 3: ReportFines -->
                <button 
                    @click="setActiveTab('ReportFines')"
                    :class="['block w-full text-left py-3 px-4 rounded transition-colors font-lao',
                    activeTab === 'ReportFines' ? 'bg-sky-900 text-white' : 'hover:bg-blue-700']">ລາຍງານການປັບໄໝ
                </button>

                <!-- Tab 4: Traffic Rules -->
                <button 
                    @click="setActiveTab('rules')"
                    :class="['block w-full text-left py-3 px-4 rounded transition-colors font-lao',
                    activeTab === 'rules' ? 'bg-sky-900 text-white' : 'hover:bg-blue-700']">ກົດລະບຽບຈະລາຈອນ
                </button>
            </div>
        </div>

        <!-- Scrollable Main Content with left margin for fixed sidebar -->
        <div class="flex-1 ml-64 p-6 bg-gray-100 min-h-screen overflow-y-auto">
            
            <!-- Tab Content: Main Page -->
            <div v-if="activeTab === 'fines'" class="space-y-6">
                <FinesPage />
            </div>
            <!-- Tab Content: Main Page -->
            <div v-if="activeTab === 'ReportFines'" class="space-y-6">
                <ReportFines />
            </div>
            <!-- Tab Content: Fines -->
            <div v-if="activeTab === 'main'" class="space-y-6">
                <Police_home />
            </div>

            <!-- Tab Content: Traffic Rules -->
            <div v-if="activeTab === 'rules'" class="space-y-6">
                <Rules />
            </div>


        </div>
    </div>
</template>

<style scoped>
/* Pure Tailwind CSS - No custom styles */
</style>