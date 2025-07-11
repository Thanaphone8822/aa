<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref([]);
const errorMessage = ref('');
const selectedProduct = ref(null);

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

function openModal(product) {
    selectedProduct.value = product;
}
function closeModal() {
    selectedProduct.value = null;
}
</script>

<template>
    <div
        class="overflow-x-auto rounded mt-[2px] min-h-[200px] flex flex-col items-center justify-center bg-white relative">
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <p v-else-if="products.length === 0"
            class="text-gray-500 flex flex-col items-center justify-center gap-2 h-full w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"
                class="animate-spin mb-2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
            Loading products...
        </p>
        <table v-else class="table table-xs table-pin-rows table-pin-cols text-base bg-white text-black">
            <thead>
                <tr>
                    <th class="text-lg bg-gray-200 text-black font-bold">ລຳດັບ</th>
                    <th class="text-lg bg-gray-200 text-black font-bold">ຂໍ້ກົດໝາຍ</th>
                    <th class="text-lg bg-gray-200 text-black font-bold">ຈຳນວນເງີນ</th>
                    <th class="text-lg bg-gray-200 text-black font-bold">ມາດຕາ</th>
                    <th class="text-lg bg-gray-200 text-black font-bold">ໝວດ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id" @click="openModal(product)"
                    class="cursor-pointer text-black hover:bg-gray-100">
                    <th class="text-sm bg-gray-200 text-black">{{ index + 1 }}</th>
                    <td class="text-base text-black">{{ product.rule_type }}</td>
                    <td class="text-base text-black">{{ product.price }} ກີບ</td>
                    <td class="text-base text-black">ມາດຕາທີ {{ product.mardtar_id }}</td>
                    <td class="text-base text-black">ໝວດທີ {{ product.muad_id }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
        <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-opacity-30 backdrop-blur-sm" @click="closeModal"></div>
            <div class="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto text-black z-10">
                <h2 class="text-xl font-bold mb-4">ລາຍລະອຽດກົດໝາຍ</h2>
                <p><span class="font-bold">ຂໍ້ກົດໝາຍ:</span> {{ selectedProduct.rule_type }}</p>
                <p><span class="font-bold">ຈຳນວນເງີນ:</span> {{ selectedProduct.price }} ກີບ</p>
                <p><span class="font-bold">ມາດຕາ:</span> {{ selectedProduct.mardtar_id }}</p>
                <p><span class="font-bold">ໝວດ:</span> {{ selectedProduct.muad_id }}</p>
                <button @click="closeModal"
                    class="mt-6 px-4 py-2 bg-[#f54900] text-white rounded hover:bg-[#d43d00]">ປິດ</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-white {
    background-color: #fff !important;
}

.text-black {
    color: #000 !important;
}

.backdrop-blur-sm {
    backdrop-filter: blur(6px);
}
</style>