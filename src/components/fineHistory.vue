<script setup lang="ts">
import { ref } from "vue";

    const showDetailsPopup = ref(false);
    const Hfines = ref([
        {
            id: 1,
            receiptNumber: 'XXXXXX',
            officer: 'XXXXXX',
            offenses: 'XX',
            vehicleType: 'XXXXXXXXXXXXXX',
            time: '00:00',
            date: '00/00/0000',
            totalAmount: '00000000000'
        },
        {
            id: 2,
            receiptNumber: 'XXXXXX',
            officer: 'XXXXXX',
            offenses: 'XX',
            vehicleType: 'XXXXXXXXXXXXXX',
            time: '00:00',
            date: '00/00/0000',
            totalAmount: '00000000000'
        }
    ])
</script>

<template>
    <div class="p-4 rounded-lg">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-3xl font-bold mb-4 font-lao text-gray-800 border-b pb-2">ປະຫວັດການຖືກປັບ</h1>
            <div class="mt-4">
                <table class="w-full border-separate" style="border-spacing: 0 0.5rem;">
                    <thead>
                        <tr class="font-bold text-gray-700 font-lao">
                            <th class="p-3 text-left bg-yellow-200 rounded-l-lg">ເລກທີໃບສັ່ງ</th>
                            <th class="p-3 text-left bg-yellow-200">ປັບໃໝໂດຍເຈົ້າໜ້າທີ່</th>
                            <th class="p-3 text-left bg-yellow-200">ຈຳນວນຂໍ້ຫາ</th>
                            <th class="p-3 text-left bg-yellow-200">ປະເພດພາຫະນະ</th>
                            <th class="p-3 text-left bg-yellow-200">ເວລາ</th>
                            <th class="p-3 text-left bg-yellow-200">ວັນເດືອນປີ</th>
                            <th class="p-3 text-left bg-yellow-200">ເງິນລວມ</th>
                            <th class="p-3 text-left bg-yellow-200 rounded-r-lg"></th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-scroll">
                        <tr v-for="fine in Hfines" :key="fine.id"  class="text-red-600 font-lao">
                            <td class="p-3 bg-yellow-200 rounded-l-lg">{{ fine.receiptNumber }}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.officer}}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.offenses }}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.vehicleType }}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.time }}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.date }}</td>
                            <td class="p-3 bg-yellow-200">{{ fine.totalAmount }} ກີບ</td>
                            <td class="p-3 bg-yellow-200 rounded-r-lg">
                                <button @click="showDetailsPopup = true"
                                    class="bg-gray-800 text-cyan-400 font-bold py-1 px-3 rounded-md flex items-center space-x-2 shadow-lg hover:bg-gray-700 transition-colors">
                                    <span>ລາຍລະອຽດ</span>
                                    <span
                                        class="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-mono">i</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
    </div>
</template>

<style scoped>
/* Custom styles can go here if needed */
</style>