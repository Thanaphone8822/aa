<script setup lang="ts">
import { ref } from 'vue';
import imageicon from './icons/imageicon.vue';
import inforicon from './icons/inforicon.vue';
import nosymboi from './icons/nosymboi.vue';

const showImagePopup = ref(false);
const showDetailsPopup = ref(false);
const selectedItem = ref(null);
</script>
<template>
    <div class="pb-8">
        <h6 class="text-4xl text-black font-bold tracking-tight">ຈັດການການຊໍາລະ</h6>
    </div>

    <div class="p-6 bg-neutral-300 rounded-xl shadow-lg border border-neutral-100">
        <!-- Table -->
        <div class="bg-white rounded-lg shadow-sm h-95 w-full touch-auto overflow-auto">
            <table class="min-w-full text-left">
                <thead class="sticky top-0 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-sm">
                    <tr class="border-b border-neutral-200 bg-amber-100">
                        <th class="py-3 px-4 pr-8 text-neutral-700 text-sm font-semibold">ເລກໃບສັ່ງ</th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ຊື່ ແລະ ນາມສະກຸນຜູ້ລະເມີດ
                        </th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ຈໍານວນຂໍ້ຫາ</th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ປະເພດພາຫະນະ</th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ເວລາ</th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ວັນເດືອນປີ</th>
                        <th class="py-3 px-4 pr-16 text-neutral-700 text-sm font-semibold">ເງິນລວມ</th>
                        <th class="py-3 px-4 text-neutral-700 text-sm font-semibold text-center">ຈັດການ</th>
                    </tr>
                </thead>
                <tbody class="overflow-y-scroll">
                    <tr class="border-b border-neutral-100 hover:bg-blue-50/50 transition-colors duration-200 h-20">
                        <td class="py-3 px-4 items-center text-neutral-700 text-sm font-medium">00001</td>
                        <td class="py-3 px-4 text-start text-neutral-700 text-sm">XXXXXXXX</td>
                        <td class="py-3 px-4 text-start text-neutral-700 text-sm">XX</td>
                        <td class="py-3 px-4 text-start text-neutral-700 text-sm">XXXXX</td>
                        <td class="py-3 px-4 text-neutral-700 text-sm">00:00</td>
                        <td class="py-3 px-4 text-neutral-700 text-sm">XX/XX/XXXX</td>
                        <td class="py-3 px-4 text-neutral-700 text-sm">XXXXXXXX ກີບ</td>
                        <td class="py-3 px-4 flex items-center gap-3">
                            <button @click="showImagePopup = true"
                                class="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white p-2.5 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center group relative"
                                title="ຮູບ">
                                <span class="text-neutral-100">
                                    <imageicon />
                                </span>
                                <span
                                    class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">ຮູບ</span>
                            </button>
                            <button @click="showDetailsPopup = true"
                                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm flex items-center justify-center group relative"
                                title="ລາຍລະອຽດ">
                                <inforicon />
                                <span
                                    class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">ລາຍລະອຽດ</span>
                            </button>
                            <button
                                class="bg-gradient-to-r from-red-500 to-red-600 text-white p-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm flex items-center justify-center group relative"
                                title="ປະຕິເສດ">
                                <nosymboi />
                                <span
                                    class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">ປະຕິເສດ</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Image Popup -->
    <div v-if="showImagePopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-neutral-800">ຮູບພາບການຊໍາລະ</h3>
                <button @click="showImagePopup = false"
                    class="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <span class="text-black">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>
            </div>
            <div class="bg-neutral-50 p-6 rounded-xl">
                <div
                    class="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-200">
                    <span class="text-neutral-400">ຮູບພາບ</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Details Popup -->
    <div v-if="showDetailsPopup"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-neutral-800">ລາຍລະອຽດການກະທໍາຜິດ</h3>
                <button @click="showDetailsPopup = false"
                    class="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <span class="text-black">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>
            </div>
            <div class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                    <div class="bg-neutral-50 p-4 rounded-xl">
                        <p class="text-sm font-semibold text-neutral-600 mb-1">ເລກໃບສັ່ງ:</p>
                        <p class="text-base text-neutral-800 font-medium">00001</p>
                    </div>
                    <div class="bg-neutral-50 p-4 rounded-xl">
                        <p class="text-sm font-semibold text-neutral-600 mb-1">ຊື່ ແລະ ນາມສະກຸນ:</p>
                        <p class="text-base text-neutral-800 font-medium">XXXXXXXX</p>
                    </div>
                    <div class="bg-neutral-50 p-4 rounded-xl">
                        <p class="text-sm font-semibold text-neutral-600 mb-1">ຈໍານວນຂໍ້ຫາ:</p>
                        <p class="text-base text-neutral-800 font-medium">XX</p>
                    </div>
                    <div class="bg-neutral-50 p-4 rounded-xl">
                        <p class="text-sm font-semibold text-neutral-600 mb-1">ເງິນລວມ:</p>
                        <p class="text-base text-neutral-800 font-medium">XXXXXXXX ກີບ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>