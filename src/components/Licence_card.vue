<script setup lang="ts">

</script>


<template>
    <div class="flex flex-col  items-center h-screen">
        <div
            class="w-[390px] h-[270px] rounded-lg shadow-lg bg-gradient-to-b from-yellow-200 to-white p-4 text-sm relative">
            <!-- Header Section -->
            <div class="text-center font-bold text-[12px] leading-tight font-black text-gray-700 mb-2">
                ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ<br />
                R D PLAO/LAO PDR
            </div>

            <!-- Title Section -->
            <div class="text-left mt-2 mb-4">
                <p class="font-bold text-blue-700">ໃບຂັບຂີ່ຍານພາຫະນະ</p>
                <p class="text-[11px] text-blue-700">PERMIS DE CONDUIRE</p>
                <p class="text-[11px] text-green-700">DRIVING LICENCE</p>
                <div class="absolute top-12 right-4 text-[10px] text-red-600">
                    ນວ XXXXXXX<br />ຂສ XXXXXXX
                </div>
            </div>

            <!-- Content Section -->
            <div class="flex items-center gap-2">
                <div class="w-16 h-20 bg-gray-300 rounded overflow-hidden"></div>
                <div class="text-[11px] text-black space-y-1">
                    <p>ຊື່ ແລະ ນາມສະກຸນ<br />Eng name</p>
                    <p>ເກີດວັນທີ<br />ສັນຊາດ<br />ທີ່ຢູ່</p>
                </div>
            </div>

            <!-- Footer Section -->
            <div class="absolute bottom-2 left-4 text-[10px] text-black space-y-1">
                <p>ອອກວັນທີ / Delivre / Issued: XX/XX/XX</p>
                <p>ວັນໝົດອາຍ / Expiration / Expiry: XX/XX/XX</p>
                <p>ປະເພດ / Categorie / Category: XX</p>
            </div>
        </div>

        <div class="flex w-[344px] h-[30px] m-[30px] gap-3">
            <span class="text-xl text-amber-50 flex ">ສະຖານະ: </span>
            <span class="text-xl text-red-400 flex items-center">warnning</span>
            <div class="inline-grid *:[grid-area:1/1] felx items-center">
                <div class="status status-error animate-ping"></div>
                <div class="status status-error"></div>
            </div>
        </div>

    </div>

</template>



<style scoped></style>