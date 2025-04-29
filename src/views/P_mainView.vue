<script setup lang="ts">
import Licence_card from '@/components/Licence_card.vue'
import Table from '@/components/Table.vue'
import { ref } from 'vue'
const activeComponent = ref('') // Default to an empty string

// Function to handle row click
const handleRowClick = (component: string) => {
    activeComponent.value = component // Set the active component
}
</script>

<template>
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-sm">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a class="text-lg">ໜ້າຫຼັກ</a></li>
                <li><a class="text-lg">ການປັບໄໝ</a></li>
                <li><a class="text-lg">ກົດລະບຽບຈະລາຈອນ</a></li>
            </ul>
        </div>
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">####</a>
        </div>

        <div class="flex gap-4">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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

    <!-- Main Content -->
    <div class="flex mt-4 gap-5 justify-start items-center">
        <!-- First Box -->
        <div class="bg-amber-50 h-[200px] w-[600px] rounded-2xl text-2xl text-gray-700">
            <div class="flex h-[40px] w-full ml-2 mt-1"><span class="font-bold text-2xl">ປ້ອນລະຫັດໃບຂັບຂີ່:</span></div>
            <div class="flex flex-col gap-3 w-full mt-2 ml-2">
                <div class="flex gap-4">
                    <span class="text-xl">ປ້ອນລະຫັດ ນວ:</span>
                    <input type="text" placeholder="ປ້ອນຂໍ້ມູນ" class="input bg-amber-50 border-black bottom-1" />
                </div>
                <div class="flex gap-4">
                    <span class="text-xl">ປ້ອນລະຫັດ ຂສ:</span>
                    <input type="text" placeholder="ປ້ອນຂໍ້ມູນ" class="input bg-amber-50 border-black bottom-1" />
                </div>
            </div>
            <div class="flex justify-center items-center mt-3">
                <button @click="handleRowClick('license')" class="btn btn-primary">Search</button>
            </div>
        </div>


        <!-- Second Box -->
        <div
            class="bg-amber-50 h-[200px] w-[600px] rounded-2xl flex items-center justify-center text-9xl text-gray-700 gap-5">
            <button class="btn btn-error font-normal">ຍົກເລີກບັດ</button>
            <button class="btn btn-primary font-normal">ຍົກເລີກບັດ</button>

        </div>
    </div>

    <!-- Licence Card Section -->
    <div class="bg-amber-50 h-[500px] w-[1220px] rounded-2xl flex items-center justify-center text-gray-700 mt-5">
        <div class="w-[300px] h-[300px]" v-if="activeComponent === 'license'">
            <Licence_card />
        </div>
    </div>
</template>

<style scoped></style>