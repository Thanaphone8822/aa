<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'     
import New from '@/components/New.vue'
import ManageOffender from '@/components/ManageOffender.vue'
import ManagePolice from '@/components/ManagePolice.vue'
import Report from '@/components/Report.vue'
import table2 from '@/components/Table.vue'
import personIcon from "@/assets/personicon.jpg";
import logo from "@/assets/PKS logo.png";
import Rules from '@/components/Rules.vue';
import ad_rules from '@/components/ad_rules.vue';

const products = ref([]);
const errorMessage = ref('');

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch data from backend');
        }
        const data = await response.json();
        products.value = data.data;
    } catch (error) {
        errorMessage.value = error.message;
    }
});

// Reactive variable to track the active tab
const activeTab = ref('new')

// Function to set the active tab
const setActiveTab = (tab) => {
    activeTab.value = tab
}
</script>

<template>
    <div>
        <div class="navbar shadow-sm h-25 bg-linear-to-t from-zinc-200 to-green-700 fixed top-0 left-0 right-0 z-50">
            <div class="flex-1">
                <div class="flex items-center gap-2">
                    <img class="w-17 h-20 object-cover" src="@/assets/PKS logo.png" alt="logo">
                    <a class="text-3xl text-zinc-900 dark:text-zinc-900">ກົມຕຳຫຼວດຈາລາຈອນ</a>
                </div>
            </div>

            <div class="flex gap-2">
                <div class="p-3"><a class="text-black font-semibold">ເລກລະຫັດແອັດມິນ</a></div>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="@/assets/11.jpg" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
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

        <!-- Tabs Section -->
        <div class="flex pt-24">
            <div role="tablist"
                class="drop-shadow-xl/50 fixed top-24 left-0 h-[calc(100vh-6rem)] w-64 bg-sky-800 flex-col shadow-lg">

                <div class="hidden xl:flex justify-start px-6 py-6 items-center space-x-3 group">
                    <a role="tab"
                        class="tab text-xl text-white transition-all duration-300 ease-in-out hover:text-blue-200 hover:translate-x-2 relative"
                        :class="{ 'text-blue-200 before:absolute before:left-[-1rem] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-blue-200 before:rounded': activeTab === 'new' }"
                        @click="setActiveTab('rules')">
                        <span class="text-white">
                            ດຳລັດ
                        </span>
                    </a>
                </div>

                <div class="hidden xl:flex justify-start px-6 py-6 items-center space-x-3 group">
                    <a role="tab"
                        class="tab text-xl text-white transition-all duration-300 ease-in-out hover:text-blue-200 hover:translate-x-2 relative"
                        :class="{ 'text-blue-200 before:absolute before:left-[-1rem] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-blue-200 before:rounded': activeTab === 'table' }"
                        @click="setActiveTab('table')">
                        <span class="text-white">
                            ຜູ້ລະເມີດ
                        </span>
                    </a>
                </div>

                <div class="hidden xl:flex justify-start px-6 py-6 items-center space-x-3 group">
                    <a role="tab"
                        class="tab text-xl text-white transition-all duration-300 ease-in-out hover:text-blue-200 hover:translate-x-2 relative"
                        :class="{ 'text-blue-200 before:absolute before:left-[-1rem] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-blue-200 before:rounded': activeTab === 'report' }"
                        @click="setActiveTab('report')">
                        <span class="text-white">
                            ລາຍງານ
                        </span>
                    </a>
                </div>

                <div class="hidden xl:flex justify-start px-6 py-6 items-center space-x-3 group">
                    <a role="tab"
                        class="tab text-xl text-white transition-all duration-300 ease-in-out hover:text-blue-200 hover:translate-x-2 relative"
                        :class="{ 'text-blue-200 before:absolute before:left-[-1rem] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-blue-200 before:rounded': activeTab === 'managepolice' }"
                        @click="setActiveTab('managepolice')">
                        <span class="text-white">
                            ຈັດການຂໍ້ມູນເຈົ້າໜ້າທີ່
                        </span>
                    </a>
                </div>

                <div class="hidden xl:flex justify-start px-6 py-6 items-center space-x-3 group">
                    <a role="tab"
                        class="tab text-xl text-white transition-all duration-300 ease-in-out hover:text-blue-200 hover:translate-x-2 relative"
                        :class="{ 'text-blue-200 before:absolute before:left-[-1rem] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-blue-200 before:rounded': activeTab === 'manageoffender' }"
                        @click="setActiveTab('manageoffender')">
                        <span class="text-white">
                            ຈັດການຂໍ້ມູນການຊໍາລະ
                        </span>
                    </a>
                </div>
            </div>

            <!-- Dynamic Content Section -->
            <div class="flex-1 ml-64 min-h-screen bg-gray-100">
                <div class="p-8">
                    <div v-if="activeTab === 'rules'">
                        <ad_rules />
                    </div>
                    <div v-if="activeTab === 'table'">
                        <table />
                    </div>
                    <div v-if="activeTab === 'report'">
                        <Report />
                    </div>
                    <div v-if="activeTab === 'managepolice'">
                        <ManagePolice />
                    </div>
                    <div v-if="activeTab === 'manageoffender'">
                        <ManageOffender />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>