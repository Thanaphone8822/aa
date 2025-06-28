<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Fineincome from '@/components/Fineincome.vue'
import AboutView from './AboutView.vue'
import New from '@/components/New.vue'
import Licence_card from '@/components/Licence_card.vue'
import Historty from '@/components/Historty.vue'
import fineHistory from '@/components/fineHistory.vue'
import TabRightNoti from '@/views/TabRightNoti.vue'
import Notificationicon from '@/components/icons/Notificationicon.vue';

// Reactive variable to track the active tab
const activeTab = ref('new')
const showNoti = ref(false)

// Function to set the active tab
const setActiveTab = (tab) => {
    activeTab.value = tab
}
</script>

<template>
    <header class="sticky top-0 z-50">
        <div class="navbar bg-linear-to-t from-zinc-200 to-green-700">
            <div class="flex-1">
                <div class="flex items-center gap-4 ml-4">
                    <img class="w-20 h-20 object-cover" src="@/assets/Policelogo.png" alt="logo">
                    <div>
                        <h1 class="text-3xl text-black font-bold">ກົມຕຳຫຼວດຈາລາຈອນ</h1>
                        <p class="text-black">Traffic Police Department</p>
                    </div>
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
        <div class="bg-sky-800 text-white shadow-md">
            <div class="container mx-auto flex justify-between items-center p-5">
                <div role="tablist" class="tabs">
                    <a role="tab" class="tab text-xl border-b-2"
                        :class="activeTab === 'new' ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                        @click="setActiveTab('new')">
                        <span class="text-white">ໜ້າຫຼັກ</span>
                    </a>
                    <a role="tab" class="tab text-xl border-b-2"
                        :class="activeTab === 'about' ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                        @click="setActiveTab('about')">
                        <span class="text-white">ກົດລະບຽບຈະລາຈອນ</span>
                    </a>
                    <a role="tab" class="tab text-xl border-b-2"
                        :class="activeTab === 'fineHistory' ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                        @click="setActiveTab('fineHistory')">
                        <span class="text-white">ປະຫວັດການຖືກປັບ</span>
                    </a>
                    <a role="tab" class="tab text-xl border-b-2"
                        :class="activeTab === 'license' ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                        @click="setActiveTab('license')">
                        <span class="text-white">ຂໍ້ມູນໃບຂັບຂີ່</span>
                    </a>
                    <a role="tab" class="tab text-xl border-b-2"
                        :class="activeTab === 'Fineincome' ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                        @click="setActiveTab('Fineincome')">
                        <span class="text-white">ໃບສັ່ງທີ່ໄດ້ຮັບ</span>
                    </a>
                </div>
                <button @click="showNoti = !showNoti" class="btn btn-sm bg-blue-700 hover:bg-blue-600 text-white mr-4 flex items-center gap-2">
                    ການແຈ້ງເຕືອນ
                    <Notificationicon />
                </button>
            </div>
        </div>
    </header>

    <!-- Dynamic Content Section -->
    <div class="bg-gray-200 min-h-screen p-4">
        <div v-if="activeTab === 'new'">
            <New />
        </div>
        <div v-if="activeTab === 'about'">
            <about-view />
        </div>
        <div v-if="activeTab === 'fineHistory'">
            <fineHistory />
        </div>
        <div v-if="activeTab === 'license'">
            <Licence_card />
        </div>
        <div v-if="activeTab === 'Fineincome'">
            <Fineincome />
        </div>
    </div>

    <!-- Notification Panel -->
    <TabRightNoti v-if="showNoti" @close="showNoti = false" />
</template>

<style lang="scss" scoped>
</style>