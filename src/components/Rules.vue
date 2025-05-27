<script setup>
import { ref, onMounted } from 'vue';
import Payment from './Payment.vue';
import RulesDt from './RulesDt.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// Function to navigate to a tab
const navigateToTab = (tab) => {
    router.push({ name: tab }); // Navigate to the route by name
};

// Reactive variable to track the active component
const activeComponent = ref('table'); // Default to 'table'

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


// const products = ref([]); // Store the list of products from the backend
// const errorMessage = ref(''); // Store any error messages

// onMounted(async () => {
//     try {
//         // Call the backend API
//         const response = await fetch('http://localhost:3000/api/product'); // Replace with your backend URL
//         if (!response.ok) {
//             throw new Error('Failed to fetch data from backend');
//         }
//         const data = await response.json();
//         products.value = data.data; // Assuming the API response has a `data` field containing the products
//     } catch (error) {
//         errorMessage.value = error.message; // Handle errors
//     }
// });
</script>

<template>
    <div class="overflow-x-auto rounded mt-[2px]">
        <!-- Conditionally Render Components -->
        <div v-if="activeComponent === 'table'">
            <table class="table table-xs table-pin-rows table-pin-cols text-base">
                <thead>
                    <tr>
                        <th>ລຳດັບ</th>
                        <td class="text-lg">ຂໍ້ກົດໝາຍ</td>
                        <td class="text-lg">ຈຳນວນເງີນ</td>
                        <td class="text-lg">ມາດຕາ</td>
                        <td class="text-lg">ໝວດ</td>
                        <!-- <td class="text-lg">ສະຖານທີ່</td> -->
                        <!-- <td class="text-lg">ເລກຖັງ</td> -->
                        <!-- <td class="text-lg">ປະເພດລົດ</td> -->
                        
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through products and render rows dynamically -->
                    <tr v-for="(product, index) in products" :key="product.id" @click="handleRowClick('RulesDt')"
                        class="hover:bg-base-200 transition-colors duration-200 hover:rounded-lg cursor-pointer">
                        <th class="text-sm">{{ index + 1 }}</th>
                        <td class="text-base">{{ product.rule_type}}</td>
                        <td class="text-base">{{ product.price}} ກີບ</td>
                        <td class="text-base">ມາດຕາທີ {{ product.mardtar_id}}</td>
                        <td class="text-base">ໝວດທີ {{ product.muad_id}}</td>
                        <!-- <td class="text-base">{{ product.location}}</td> -->
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
                        <!-- <td class="text-lg">ສະຖານທີ່</td> -->
                        <!-- <td class="text-lg">ເລກຖັງ</td> -->
                        <!-- <td class="text-lg">ປະເພດລົດ</td> -->
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Render Payment Component -->
        <div v-else-if="activeComponent === 'RulesDt'">
            <RulesDt />
        </div>
    </div>
    <!-- <div>
        <span class="text-3xl">Products from Backend:</span>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <ul v-if="products.length > 0" class="mt-4">
            <li v-for="product in products" class="mb-2">
                <strong>{{ product.id }} - {{ product.name }}</strong>
            </li>
        </ul>
        <p v-else-if="!errorMessage" class="text-gray-500">Loading products...</p>
    </div> -->

    
</template>

<style scoped></style>