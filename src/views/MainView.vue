<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

const showLogoutModal = ref(false);
const userName = ref('Profile') // Default

const navigateToTab = (tab) => {
    router.push({ name: tab });
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
    }
});
</script>

<template>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <div class="flex items-center gap-2">
                <img class="w-17 h-20 object-cover" src="@/assets/PKS logo.png" alt="logo">
                <a class="btn btn-ghost text-3xl">ກົມຕຳຫຼວດຈາລາຈອນ</a>
            </div>
        </div>
        <div class="flex gap-2">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto text-lg" />
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
                    <li>
                        <a class="justify-between">
                            {{ userName }}
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a @click="showLogoutModal = true">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Tabs Section -->
    <div role="tablist" class="tabs tabs-border mt-4">
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'new' }" @click="navigateToTab('new')">
            ຂ່າວສານ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'rule' }"
            @click="navigateToTab('rule')">
            ກົດລະບຽບຈະລາຈອນ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'history' }"
            @click="navigateToTab('history')">
            ປະຫວັດການຖຶກປັບ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'license' }"
            @click="navigateToTab('license')">
            ຂໍ້ມູນໃບຂັບຂີ່
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === '#' }" @click="navigateToTab('#')">
            ໃບສັ່ງທີ່ໄດ້ຮັບ
        </a>
    </div>

    <!-- Dynamic Content Section -->
    <router-view />

    <!-- Logout Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
            <h2 class="text-xl font-bold mb-4 text-black">Confirm Logout</h2>
            <p class="mb-6 text-red-600">Are you sure you want to logout?</p>
            <div class="flex justify-center gap-4">
                <button @click="logout" class="btn btn-primary w-[70px]">Yes</button>
                <button @click="showLogoutModal = false" class="btn btn-warnin w-[70px]">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>