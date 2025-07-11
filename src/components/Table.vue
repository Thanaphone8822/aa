<script setup>
import { ref, onMounted } from 'vue';
import Payment from './Payment.vue';

// Reactive variable to track the active component
const activeComponent = ref('rule'); // Default to 'table'

// Function to handle row click
const handleRowClick = (component) => {
    activeComponent.value = component; // Set the active component
};

const products = ref([]); // Store the list of products from the backend
const errorMessage = ref(''); // Store any error messages

onMounted(async () => {
    try {
        // Call the backend API
        const response = await fetch('http://localhost:3000/api/products'); // Replace with your backend URL
        if (!response.ok) {
            throw new Error('Failed to fetch data from backend');
        }
        const data = await response.json();
        products.value = data.data; // Assuming the API response has a `data` field containing the products
    } catch (error) {
        errorMessage.value = error.message; // Handle errors
    }
});
</script>

<template>
    <div class="overflow-x-auto rounded mt-[2px]">
        <!-- Conditionally Render Components -->
        <div v-if="activeComponent === 'rule'">
            <table class="min-w-full table-auto border-collapse rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr class="bg-sky-800 text-white">
                        <th class="py-3 px-4 text-lg font-semibold">ລຳດັບ</th>
                        <th class="py-3 px-4 text-lg font-semibold">ຊື່</th>
                        <th class="py-3 px-4 text-lg font-semibold">ນາມສະກຸນ</th>
                        <th class="py-3 px-4 text-lg font-semibold">ປ້າຍລົດ</th>
                        <th class="py-3 px-4 text-lg font-semibold">ເວລາ</th>
                        <th class="py-3 px-4 text-lg font-semibold">ສະຖານທີ່</th>
                        <!-- <th class="py-3 px-4 text-lg font-semibold">ເລກຖັງ</th> -->
                        <!-- <th class="py-3 px-4 text-lg font-semibold">ປະເພດລົດ</th> -->
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through products and render rows dynamically -->
                    <tr v-for="(product, index) in products" :key="product.id" @click="handleRowClick('payment')"
                        class="cursor-pointer hover:bg-sky-100 border-b border-gray-200 transition-all">
                        <td class="py-2 px-4 text-base text-center">{{ index + 1 }}</td>
                        <td class="py-2 px-4 text-base">{{ product.id }}</td>
                        <td class="py-2 px-4 text-base">{{ product.rule_type}}</td>
                        <td class="py-2 px-4 text-base">{{ product.address }}</td>
                        <td class="py-2 px-4 text-base">{{ product.brith }}</td>
                        <td class="py-2 px-4 text-base">{{ product.create_at }}</td>
                        <!-- <td class="py-2 px-4 text-base">{{ product.machine__number}}</td> -->
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="bg-gray-100">
                        <th class="py-2 px-4 text-lg">ລຳດັບ</th>
                        <th class="py-2 px-4 text-lg">ຊື່</th>
                        <th class="py-2 px-4 text-lg">ນາມສະກຸນ</th>
                        <th class="py-2 px-4 text-lg">ປ້າຍລົດ</th>
                        <th class="py-2 px-4 text-lg">ເວລາ</th>
                        <th class="py-2 px-4 text-lg">ສະຖານທີ່</th>
                        <!-- <th class="py-2 px-4 text-lg">ເລກຖັງ</th> -->
                        <!-- <th class="py-2 px-4 text-lg">ປະເພດລົດ</th> -->
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Render Payment Component -->
        <div v-else-if="activeComponent === 'payment'">
            <Payment />
        </div>
    </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>