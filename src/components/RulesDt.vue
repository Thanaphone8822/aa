<script setup ">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';
const route = useRoute();
const router = useRouter();

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


// Function to navigate to a tab
const navigateToTab = (tab) => {
    router.push({ name: tab }); // Navigate to the route by name
};
</script>

<template>
    <div>
        <span v-for="product in products">{{ product.rule_type }}</span>
    </div>
</template>

<style scoped>

</style>