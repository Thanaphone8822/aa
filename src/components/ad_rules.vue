<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref([]);
const errorMessage = ref('');
const selectedProduct = ref(null);
const detailError = ref('');
const showModal = ref(false);

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

async function showProductDetail(id) {
    selectedProduct.value = null;
    detailError.value = '';
    showModal.value = true;
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch data from backend');
        const data = await response.json();
        selectedProduct.value = data.data;
    } catch (error) {
        detailError.value = error.message;
    }
}

function closeModal() {
    showModal.value = false;
}
</script>

<template>
    <div class="overflow-x-auto rounded mt-[2px] min-h-[200px] flex flex-col items-center justify-center">
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
        <table v-else class="min-w-full table-auto border-collapse rounded-lg shadow-lg overflow-hidden bg-white">
            <thead>
                <tr class="bg-white text-black border-b border-gray-200">
                    <th class="py-3 px-4 text-lg font-semibold">ລຳດັບ</th>
                    <th class="py-3 px-4 text-lg font-semibold">ຂໍ້ກົດໝາຍ</th>
                    <th class="py-3 px-4 text-lg font-semibold">ຈຳນວນເງີນ</th>
                    <th class="py-3 px-4 text-lg font-semibold">ມາດຕາ</th>
                    <th class="py-3 px-4 text-lg font-semibold">ໝວດ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id" @click="showProductDetail(product.id)"
                    class="cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-all text-black">
                    <td class="py-2 px-4 text-base text-center">{{ index + 1 }}</td>
                    <td class="py-2 px-4 text-base">{{ product.rule_type }}</td>
                    <td class="py-2 px-4 text-base">{{ product.price }} ກີບ</td>
                    <td class="py-2 px-4 text-base">ມາດຕາທີ {{ product.mardtar_id }}</td>
                    <td class="py-2 px-4 text-base">ໝວດທີ {{ product.muad_id }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Modal for product detail -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-md"
            @click.self="closeModal">
            <div
                class="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-2xl z-10 max-w-lg w-full transform transition-all duration-200 scale-100">
                <div class="flex justify-between items-center p-4 border-b">
                    <h2 class="text-xl font-bold text-blue-900">ລາຍລະອຽດກົດໝາຍ</h2>
                    <button @click="closeModal"
                        class="text-gray-500 hover:text-red-500 text-2xl font-bold cursor-pointer">&times;</button>
                </div>
                <div class="p-4">
                    <div v-if="detailError" class="text-red-500 text-center">{{ detailError }}</div>
                    <div v-else-if="selectedProduct" class="text-black space-y-2">
                        <p><span class="font-semibold">ຂໍ້ກົດໝາຍ:</span> {{ selectedProduct.rule_type }}</p>
                        <p><span class="font-semibold">ຈຳນວນເງີນ:</span> {{ selectedProduct.price }} ກີບ</p>
                        <p><span class="font-semibold">ມາດຕາ:</span> {{ selectedProduct.mardtar_id }}</p>
                        <p><span class="font-semibold">ໝວດ:</span> {{ selectedProduct.muad_id }}</p>
                        <!-- Add more fields as needed -->
                    </div>
                    <div v-else class="text-gray-500 text-center">Loading...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>