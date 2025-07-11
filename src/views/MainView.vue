<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Notificationicon from '@/components/icons/Notificationicon.vue'
import New from '@/components/New.vue'
import FineHistory from '@/components/History.vue'
import Licence_card from '@/components/Licence_card.vue'
import Fineincome from '@/components/Fineincome.vue'
import rules from '@/components/Rules.vue'

const route = useRoute();
const router = useRouter();

const showLogoutModal = ref(false)
const userName = ref('Profile') // Default
const userFullName = ref('')
const showNoti = ref(false)
const activeTab = ref('new')

const tabRoutes = [
    { key: 'new', name: 'new', label: 'ໜ້າຫຼັກ' },
    { key: 'rule', name: 'rule', label: 'ກົດລະບຽບຈະລາຈອນ' },
    { key: 'fineHistory', name: 'history', label: 'ປະຫວັດການຖືກປັບ' },
    { key: 'license', name: 'license', label: 'ຂໍ້ມູນໃບຂັບຂີ່' },
    { key: 'Fineincome', name: 'Fineincome', label: 'ໃບສັ່ງທີ່ໄດ້ຮັບ' },
];

const setActiveTab = (tabKey, routeName) => {
    activeTab.value = tabKey;
    router.push({ name: routeName });
};

const logout = async () => {
    await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
    });
    router.push({ name: 'login' });
};

// Fetch user info on mount
onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/user/profile', { credentials: 'include' });
    const data = await res.json();
    if (data.code === 10 && data.data) {
        userName.value = data.data.name || data.data.username || 'ບໍ່ມີຂໍ້ມູນ';
        userFullName.value = (data.data.name && data.data.surname) ? `${data.data.name} ${data.data.surname}` : (data.data.name || data.data.username || 'ບໍ່ມີຂໍ້ມູນ');
    }

    const found = tabRoutes.find(t => t.name === route.name);
    if (found) activeTab.value = found.key;
});

watch(() => route.name, (newName) => {
    const found = tabRoutes.find(t => t.name === newName);
    if (found) activeTab.value = found.key;
});

const TabRightNoti = defineAsyncComponent(() => import('@/components/TabRightNoti.vue'))
</script>

<template>
    <header class="sticky top-0 z-50">
        <div class="navbar bg-gradient-to-t from-zinc-200 to-green-700">
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
                <span class="text-black text-sm font-lao">{{ userFullName }}</span>
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
                                {{ userFullName }}
                                <!-- <span class="badge">New</span> -->
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a @click="showLogoutModal = true">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Tabs Section -->
        <div class="bg-sky-800 text-white shadow-md">
            <div class="container mx-auto flex justify-between items-center p-5">
                <div role="tablist" class="tabs">
                    <template v-for="tab in tabRoutes" :key="tab.key">
                        <a role="tab" class="tab text-xl border-b-2"
                            :class="activeTab === tab.key ? 'border-white text-white bg-sky-900' : 'border-transparent'"
                            @click="setActiveTab(tab.key, tab.name)">
                            <span class="text-white">{{ tab.label }}</span>
                        </a>
                        
                    </template>
                </div>
                <button @click="showNoti = !showNoti"
                    class="btn btn-sm bg-blue-700 hover:bg-blue-600 text-white mr-4 flex items-center gap-2 border-none">
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
        <div v-if="activeTab === 'rule'">
          <rules />
        </div>
        <div v-if="activeTab === 'fineHistory'">
          <FineHistory />
        </div>
        <div v-if="activeTab === 'license'">
          <Licence_card />
        </div>
        <div v-if="activeTab === 'Fineincome'">
          <Fineincome />
        </div>
    </div>

    <!-- Logout Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
            <h2 class="text-xl font-bold mb-4 text-red-600 ">ຢືນຢັນການອອກຈາກລະບົບ</h2>
            <p class="mb-6 text-black">ທ່ານຕ້ອງການຈະອອກຈາກລະບົບຂອງ {{ userFullName }}?</p>
            <div class="flex justify-center gap-4">
                <button @click="logout" class="btn btn-primary w-[70px]">ຕົກລົງ</button>
                <button @click="showLogoutModal = false" class="btn btn-warnin w-[70px]">ຍົກເລີກ</button>
            </div>
        </div>
    </div>

    <TabRightNoti v-if="showNoti" @close="showNoti = false" />
</template>

<style lang="scss" scoped></style>