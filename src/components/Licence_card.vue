<script setup lang="ts">

</script>


<template>
    <div class="flex flex-col items-center">
        <div class="w-96 h-72 rounded-lg shadow-lg bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-100 p-4 text-sm relative border-2 border-yellow-400">
            <!-- Header Section -->
            <div class="text-center font-bold text-xs leading-tight text-gray-800 mb-1">
                ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ<br />
                <span class="text-[11px]">R D PLAO/LAO PDR</span>
            </div>

            <!-- License Numbers - Top Right -->
            <div class="absolute top-3 right-4 text-[10px] text-red-600 font-bold">
                ລຊ XXXXXXX<br />ມວ XXXXXXX
            </div>

            <!-- Title Section -->
            <div class="text-left mt-3 mb-4">
                <p class="font-bold text-blue-800 text-sm">ໃບຂັບຂີ່ຍານພາຫະນະ</p>
                <p class="text-[10px] text-blue-700">PERMIS DE CONDUIRE</p>
                <p class="text-[10px] text-green-700">DRIVING LICENCE</p>
            </div>

            <!-- Photo and Personal Info Section -->
            <div class="flex items-start gap-3 mt-2">
                <!-- Photo placeholder -->
                <div class="w-16 h-20 bg-gray-400 rounded border-2 border-gray-600 flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                
                <!-- Personal Information -->
                <div class="text-[11px] text-black space-y-1 flex-1">
                    <div class="space-y-0.5">
                        <p class="font-semibold">ຊື່ ແລະ ນາມສະກຸນ</p>
                        <p class="text-gray-700">Eng name</p>
                    </div>
                    <div class="space-y-0.5">
                        <p>ເກີດວັນທີ</p>
                        <p>ສັນຊາດ</p>
                        <p>ທີ່ຢູ່</p>
                    </div>
                </div>
            </div>

            <!-- Footer Section with Issue/Expiry Info -->
            <div class="absolute bottom-3 left-4 text-[10px] text-black space-y-1">
                <p class="flex justify-between w-80">
                    <span>ອອກວັນທີ / Delivre / Issued</span>
                    <span>XX/XX/XXXX</span>
                </p>
                <p class="flex justify-between w-80">
                    <span>ວັນໝົດອາຍ / Expiration / Expiry</span>
                    <span>XX/XX/XXXX</span>
                </p>
                <p class="flex justify-between w-80">
                    <span>ປະເພດ / Categorie / Category</span>
                    <span>XX</span>
                </p>
            </div>
        </div>

        <!-- Status Section -->
        <div class="flex items-center gap-3 mt-4 p-3 bg-gray-200 rounded-lg w-96">
            <span class="text-lg font-medium text-gray-700">ສະຖານະ:</span>
            <span class="text-lg text-red-500 font-semibold">Warning</span>
            <div class="relative ml-2">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* Pure Tailwind CSS - no custom styles needed */
</style>