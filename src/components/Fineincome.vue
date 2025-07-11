<script setup>
import { ref } from 'vue'
import inforicon from './icons/inforicon.vue';
import ArrowRight from './icons/ArrowRight.vue';


const showDetailsPopup = ref(false);
const fines = ref([
    {
        id: 1,
        receiptNumber: 'XXXXX',
        officer: 'XXXXXXXX',
        offenses: 'XX',
        vehicleType: 'XXXXX',
        time: '00:00',
        date: 'XX/XX/XXXX',
        totalAmount: 'XXXXXXXXX',
    },
    {
        id: 2,
        receiptNumber: 'YYYYY',
        officer: 'YYYYYYYY',
        offenses: 'YY',
        vehicleType: 'YYYYY',
        time: '12:30',
        date: 'YY/YY/YYYY',
        totalAmount: 'YYYYYYYYY',
    },
    {
        id: 3,
        receiptNumber: 'ZZZZZ',
        officer: 'ZZZZZZZZ',
        offenses: 'ZZ',
        vehicleType: 'ZZZZZ',
        time: '15:45',
        date: 'ZZ/ZZ/ZZZZ',
        totalAmount: 'ZZZZZZZZZ',
    }
])
</script>

<template>
    <div class="p-4 sm:p-6 lg:p-8" style="background-color: #fbfbfb;">
        <div class="max-w-full mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">ໃບສັ່ງທີ່ໄດ້ຮັບ</h1>

            <!-- Fines Table -->
            <div v-if="fines.length > 0" class="mt-4">
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
                        <tr v-for="fine in fines" :key="fine.id" class="text-red-600 font-lao">
                            <td class="p-3 bg-yellow-200 rounded-l-lg font-medium">{{ fine.receiptNumber }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.officer }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.offenses }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.vehicleType }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.time }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.date }}</td>
                            <td class="p-3 bg-yellow-200 font-medium">{{ fine.totalAmount }} ກີບ</td>
                            <td class="p-3 bg-yellow-200 rounded-r-lg">
                                <div class="flex items-center space-x-2">
                                    <button
                                        class="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded flex items-center text-sm shadow-lg h-10 w-20">
                                        <span>ຊຳລະ</span>
                                        <ArrowRight />
                                    </button>
                                    <button @click="showDetailsPopup = true"
                                        class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm flex items-center justify-center group relative"
                                        title="ລາຍລະອຽດ">
                                        <inforicon />
                                        <span
                                            class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">ລາຍລະອຽດ</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- No Data Message -->
            <div v-else class="bg-gray-100 rounded-lg p-8 text-center mt-4 shadow">
                <p class="text-gray-500 text-lg">No data yet</p>
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
    </div>
</template>