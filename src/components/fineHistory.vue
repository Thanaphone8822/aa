<script setup lang="ts">
import { ref } from "vue";
import FineDetails from "@/components/FineDetails.vue";

const showDetailsPopup = ref(false);
const closeModal = () => {
  showDetailsPopup.value = false;
};
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
        },
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
            id: 1,
            receiptNumber: 'XXXXXX',
            officer: 'XXXXXX',
            offenses: 'XX',
            vehicleType: 'XXXXXXXXXXXXXX',
            time: '00:00',
            date: '00/00/0000',
            totalAmount: '00000000000'
        },
    ])
</script>

<template>
    <div class="p-4 rounded-lg">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-3xl font-bold mb-4 font-lao text-gray-800 border-b pb-2">ປະຫວັດການຖືກປັບ</h1>
            <div class="mt-4 rounded shadow h-95 w-full touch-auto overflow-auto">
                <table class="w-full border-separate" style="border-spacing: 0 0.5rem;">
                    <thead class="sticky top-0 bg-stone-300 shadow-sm">
                        <tr class="font-bold text-gray-700 font-lao">
                            <th class="p-3 text-left bg-yellow-500 rounded-l-lg">ເລກທີໃບສັ່ງ</th>
                            <th class="p-3 text-left bg-yellow-500">ປັບໃໝໂດຍເຈົ້າໜ້າທີ່</th>
                            <th class="p-3 text-left bg-yellow-500">ຈຳນວນຂໍ້ຫາ</th>
                            <th class="p-3 text-left bg-yellow-500">ປະເພດພາຫະນະ</th>
                            <th class="p-3 text-left bg-yellow-500">ເວລາ</th>
                            <th class="p-3 text-left bg-yellow-500">ວັນເດືອນປີ</th>
                            <th class="p-3 text-left bg-yellow-500">ເງິນລວມ</th>
                            <th class="p-3 text-left bg-yellow-500 rounded-r-lg"></th>
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
      <div v-if="showDetailsPopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closeModal">
        <FineDetails @close="closeModal" @click.stop />
      </div>
    </div>
</template>

<style scoped>
/* Custom styles can go here if needed */
</style>