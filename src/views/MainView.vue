<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import RegisterView from './RegisterView.vue'
import LoginView from '@/components/LoginView.vue'
import AboutView from './AboutView.vue'
import New from '@/components/New.vue'
import Licence_card from '@/components/Licence_card.vue'
import Historty from '@/components/Historty.vue'
import Table from '@/components/Table.vue'

// Reactive variable to track the active tab
const activeTab = ref('')

// Function to set the active tab
const setActiveTab = (tab) => {
    activeTab.value = tab
}
</script>

<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <div class="flex items-center gap-2">
                <img class="w-17 h-20 object-cover" src="@/assets/PKS logo.png" alt="logo">
                <a class="btn btn-ghost text-3xl">ກົມຕຳຫຼວດຈາລາຈອນ</a> <!-- Larger font -->
            </div>
        </div>
        <div class="flex gap-2">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto text-lg" />
            <!-- Larger font -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
                    <!-- Larger font -->
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
    <div role="tablist" class="tabs tabs-border mt-4"> <!-- Larger font -->
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': activeTab === 'new' }" @click="setActiveTab('new')">
            ຂ່າວສານ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': activeTab === 'about' }" @click="setActiveTab('about')">
            ກົດລະບຽບຈະລາຈອນ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': activeTab === 'history' }" @click="setActiveTab('history')">
            ປະຫວັດການຖຶກປັບ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': activeTab === 'license' }" @click="setActiveTab('license')">
            ຂໍ້ມຸນໃບຂັບຂີ່
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': activeTab === '#' }" @click="setActiveTab('#')">
            ໃບສັ່ງທີ່ໄດ້ຮັບ
        </a>
    </div>

    <!-- Dynamic Content Section -->
    <div class="mt-4"> <!-- Larger font -->
        <div v-if="activeTab === 'new'">
            <New />
        </div>
        <div v-if="activeTab === 'about'">
            <about-view />
        </div>
        <div v-if="activeTab === 'history'">
            <Table />
        </div>
        <div v-if="activeTab === 'license'">
            <Licence_card />
        </div>
        <div v-if="activeTab === '#'">
            <RegisterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>