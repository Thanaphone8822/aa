<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import New from '@/components/New.vue';
import AboutView from './AboutView.vue';
import Table from '@/components/Table.vue';
import Licence_card from '@/components/Licence_card.vue';
import jj from '@/components/Rules.vue';

// Get the current route and router instance
const route = useRoute();
const router = useRouter();

// Function to navigate to a tab
const navigateToTab = (tab) => {
    router.push({ name: tab }); // Navigate to the route by name
};
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
    <div role="tablist" class="tabs tabs-border mt-4">
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'new' }" @click="navigateToTab('new')">
            ຂ່າວສານ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'rule' }"
            @click="navigateToTab('rule')">
            ກົດລະບຽບຈະລາຈອນ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'table' }"
            @click="navigateToTab('table')">
            ປະຫວັດການຖຶກປັບ
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'license' }"
            @click="navigateToTab('license')">
            ຂໍ້ມູນໃບຂັບຂີ່
        </a>
        <a role="tab" class="tab text-xl" :class="{ 'tab-active': route.name === 'jj' }" @click="navigateToTab('jj')">
            ໃບສັ່ງທີ່ໄດ້ຮັບ
        </a>
    </div>

    <!-- Dynamic Content Section -->
    <router-view />
</template>

<style lang="scss" scoped></style>