<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const product = ref(null); // Only one product
const errorMessage = ref('');

onMounted(async () => {
    try {
        const id = route.params.id;
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from backend');
        }
        const data = await response.json();
        product.value = data.data;
    } catch (error) {
        errorMessage.value = error.message;
    }
});

const navigateToTab = (tab) => {
    router.push({ name: tab });
};
</script>

<template>
    <div v-if="product">
        <h2 class="text-xl font-bold mb-2">ລາຍລະອຽດກົດໝາຍ</h2>
        <p><strong>ຂໍ້ກົດໝາຍ:</strong> {{ product.rule_type }}</p>
        <p><strong>ຈຳນວນເງີນ:</strong> {{ product.price }} ກີບ</p>
        <p><strong>ມາດຕາ:</strong> {{ product.mardtar_id }}</p>
        <p><strong>ໝວດ:</strong> {{ product.muad_id }}</p>
        <!-- Add more fields as needed -->
    </div>
    <div v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-else class="text-gray-500">Loading...</div>
</template>

<style scoped></style>