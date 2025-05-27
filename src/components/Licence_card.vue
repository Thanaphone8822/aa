<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Payment from './Payment.vue';

// Reactive variable to track the active component
const activeComponent = ref('rule'); // Default to 'table'

// Function to handle row click
const handleRowClick = (component:any) => {
    activeComponent.value = component; // Set the active component
};

const products:any = ref([]); // Store the list of products from the backend
const errorMessage = ref(''); // Store any error messages

onMounted(async () => {
    try {
        // Call the backend API
        const response = await fetch('http://localhost:3000/api/card'); // Replace with your backend URL
        if (!response.ok) {
            throw new Error('Failed to fetch data from backend');
        }
        const data = await response.json();
        products.value = data.data; // Assuming the API response has a `data` field containing the products
    } catch (error:any) {
        errorMessage.value = error.message; // Handle errors
    }
});

</script>


<template>
    <div class="flex flex-col  items-center h-screen mt-20">
        <div
            class="w-[390px] h-[270px] rounded-lg shadow-lg bg-gradient-to-b from-yellow-200 to-white p-4 text-sm relative">
            <!-- Header Section -->
            <div class="text-center font-bold text-[12px] leading-tight font-black text-gray-700 mb-2">
                ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ<br />
                R D PLAO/LAO PDR
            </div>

            <!-- Title Section -->
            <div v-for="(product, index) in products" class="text-left mt-2 mb-4">
                <p class="font-bold text-blue-700">ໃບຂັບຂີ່ຍານພາຫະນະ</p>
                <p class="text-[11px] text-blue-700">PERMIS DE CONDUIRE</p>
                <p class="text-[11px] text-green-700">DRIVING LICENCE</p>
                <div class="absolute top-12 right-4 text-[10px] text-red-600">
                    ນວ {{ product.KS }}<br />ຂສ {{ product.NV }}
                </div>
            </div>

            <!-- Content Section -->
            <div v-for="(product, index) in products" class="flex items-center gap-2">
                <div class="w-16 h-20 bg-gray-300 rounded overflow-hidden"></div>
                <div class="text-[11px] text-black space-y-1">
                    <p>{{ product.lao_name }} <br />{{ product.dv_name }}</p>
                    <p>ເກີດວັນທີ: {{ product.dv_birth }}<br />ສັນຊາດ: {{ product.nationality }}<br />ທີ່ຢູ່: {{ product.address }}</p>
                </div>
            </div>

            <!-- Footer Section -->
            <div v-for="(product, index) in products" class="absolute bottom-2 left-4 text-[10px] text-black space-y-1">
                <p>ອອກວັນທີ / Delivre / Issued:  {{ product.issued }}</p>
                <p>ວັນໝົດອາຍ / Expiration / Expiry:  {{ product.expiry }}</p>
                <p>ປະເພດ / Categorie / Category:  {{ product.category }}</p>
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