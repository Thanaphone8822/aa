<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref([]);
const errorMessage = ref('');

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch data from backend');
        }
        const data = await response.json();
        products.value = data.data;
    } catch (error) {
        errorMessage.value = error.message;
    }
});

function goToDetail(id) {
    router.push({ name: 'rulesdt', params: { id } });
}
</script>

<template>
  <div class="overflow-x-auto rounded mt-[2px] min-h-[200px] flex flex-col items-center justify-center">
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <p v-else-if="products.length === 0" class="text-gray-500 flex flex-col items-center justify-center gap-2 h-full w-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="animate-spin mb-2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25" />
        <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
      Loading products...
    </p>
    <table v-else class="table table-xs table-pin-rows table-pin-cols text-base">
            <thead>
                <tr>
                    <th>ລຳດັບ</th>
                    <td class="text-lg">ຂໍ້ກົດໝາຍ</td>
                    <td class="text-lg">ຈຳນວນເງີນ</td>
                    <td class="text-lg">ມາດຕາ</td>
                    <td class="text-lg">ໝວດ</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id" @click="goToDetail(product.id)"
                    class="cursor-pointer">
                    <th class="text-sm">{{ index + 1 }}</th>
                    <td class="text-base">{{ product.rule_type }}</td>
                    <td class="text-base">{{ product.price }} ກີບ</td>
                    <td class="text-base">ມາດຕາທີ {{ product.mardtar_id }}</td>
                    <td class="text-base">ໝວດທີ {{ product.muad_id }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<style scoped></style>