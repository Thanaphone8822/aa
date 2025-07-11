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
  <div class="flex justify-center items-center min-h-[60vh]">
    <div v-if="product" class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-extrabold mb-4 text-blue-900">ລາຍລະອຽດກົດໝາຍ</h2>
      <div class="space-y-2 text-black">
        <p><span class="font-semibold">ຂໍ້ກົດໝາຍ:</span> {{ product.rule_type }}</p>
        <p><span class="font-semibold">ຈຳນວນເງີນ:</span> {{ product.price }} ກີບ</p>
        <p><span class="font-semibold">ມາດຕາ:</span> {{ product.mardtar_id }}</p>
        <p><span class="font-semibold">ໝວດ:</span> {{ product.muad_id }}</p>
        <!-- Add more fields as needed -->
      </div>
    </div>
    <div v-else-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</div>
    <div v-else class="text-gray-500 text-center">Loading...</div>
  </div>
</template>

<style scoped></style>