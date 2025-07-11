<script setup lang="ts">
import { defineProps, computed } from 'vue'

// Accept a single card object as a prop
const props = defineProps({ card: Object })

// For template compatibility, wrap card in an array if it exists
const products = computed(() => props.card ? [props.card] : [])
</script>
<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <div
            class="w-[390px] h-[270px] rounded-lg shadow-lg bg-gradient-to-b from-yellow-200 to-white p-4 text-sm relative">
            <!-- Header Section -->
            <div class="text-center font-bold text-[12px] leading-tight font-black text-gray-700 mb-2">
                ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ<br />
                R D PLAO/LAO PDR
            </div>

            <!-- Title Section -->
            <div v-for="(product, index) in products" class="text-left mt-2 mb-4" :key="index">
                <p class="font-bold text-blue-700">ໃບຂັບຂີ່ຍານພາຫະນະ</p>
                <p class="text-[11px] text-blue-700">PERMIS DE CONDUIRE</p>
                <p class="text-[11px] text-green-700">DRIVING LICENCE</p>
                <div class="absolute top-12 right-4 text-[10px] text-red-600">
                    ນວ {{ product.KS || product.ks }}<br />ຂສ {{ product.NV || product.nv }}
                </div>
            </div>

            <!-- Content Section -->
            <div v-for="(product, index) in products" class="flex items-center gap-2" :key="'content-' + index">
                <div class="w-16 h-20 bg-gray-300 rounded overflow-hidden">
                    <img src="@/assets/11.jpg" alt="">
                </div>
                <div class="text-[11px] text-black space-y-1">
                    <p>{{ product.name }} {{ product.surname }}<br />{{ product.eng_name }} {{ product.eng_surname }}
                    </p>
                    <p>ເກີດວັນທີ: {{ product.birth }}<br />ສັນຊາດ: {{ product.national }}<br />ທີ່ຢູ່: {{
                        product.address }}</p>
                </div>
            </div>

            <!-- Footer Section -->
            <div v-for="(product, index) in products" class="absolute bottom-2 left-4 text-[10px] text-black space-y-1"
                :key="'footer-' + index">
                <p>ອອກວັນທີ / Delivre / Issued: {{ product.DI }}</p>
                <p>ວັນໝົດອາຍ / Expiration / Expiry: {{ product.DE }}</p>
                <p>ປະເພດ / Categorie / Category: {{ product.c_category }}</p>
            </div>
        </div>

        <div class="flex w-[344px] h-[30px] m-[30px] gap-3">
            <span class="text-xl text-black flex ">ສະຖານະ: </span>
            <span class="text-xl text-red-400 flex items-center">warnning</span>
            <div class="inline-grid *:[grid-area:1/1] felx items-center">
                <div class="status status-error animate-ping"></div>
                <div class="status status-error"></div>
            </div>
        </div>

    </div>
</template>


<style scoped></style>