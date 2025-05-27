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
            <table class="table table-xs table-pin-rows table-pin-cols text-base">
                <thead>
                    <tr>
                        <th>ລຳດັບ</th>
                        <td class="text-lg">ຊື່</td>
                        <td class="text-lg">ນາມສະກຸນ</td>
                        <td class="text-lg">ປ້າຍລົດ</td>
                        <td class="text-lg">ເວລາ</td>
                        <td class="text-lg">ສະຖານທີ່</td>
                        <!-- <td class="text-lg">ເລກຖັງ</td> -->
                        <!-- <td class="text-lg">ປະເພດລົດ</td> -->

                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through products and render rows dynamically -->
                    <tr v-for="(product, index) in products" :key="product.id" @click="handleRowClick('payment')"
                        class="hover:bg-base-200 transition-colors duration-200 hover:rounded-lg cursor-pointer">
                        <th class="text-sm">{{ index + 1 }}</th>
                        <td class="text-base">{{ product.id }}</td>
                        <td class="text-base">{{ product.rule_type }}</td>
                        <td class="text-base">{{ product.address }}</td>
                        <td class="text-base">{{ product.brith }}</td>
                        <td class="text-base">{{ product.create_at }}</td>
                        <!-- <td class="text-base">{{ product.machine__number}}</td> -->
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>ລຳດັບ</th>
                        <td class="text-lg">ຊື່</td>
                        <td class="text-lg">ນາມສະກຸນ</td>
                        <td class="text-lg">ປ້າຍລົດ</td>
                        <td class="text-lg">ເວລາ</td>
                        <td class="text-lg">ສະຖານທີ່</td>
                        <!-- <td class="text-lg">ເລກຖັງ</td> -->
                        <!-- <td class="text-lg">ປະເພດລົດ</td> -->
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