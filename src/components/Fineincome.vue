<script setup>
import { ref } from 'vue'
import inforicon from './icons/inforicon.vue';
import ArrowRight from './icons/ArrowRight.vue';
import FineDetails from '@/components/FineDetails.vue';


const showDetailsPopup = ref(false);

const closeModal = () => {
  showDetailsPopup.value = false;
};

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
    receiptNumber: 'XXXXX',
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
  },
  {
    id: 2,
    receiptNumber: 'XXXXX',
    officer: 'YYYYYYYY',
    offenses: 'YY',
    vehicleType: 'YYYYY',
    time: '12:30',
    date: 'YY/YY/YYYY',
    totalAmount: 'YYYYYYYYY',
  },
  {
    id: 2,
    receiptNumber: 'XXXXX',
    officer: 'YYYYYYYY',
    offenses: 'YY',
    vehicleType: 'YYYYY',
    time: '12:30',
    date: 'YY/YY/YYYY',
    totalAmount: 'YYYYYYYYY',
  },
  {
    id: 2,
    receiptNumber: 'XXXXX',
    officer: 'YYYYYYYY',
    offenses: 'YY',
    vehicleType: 'YYYYY',
    time: '12:30',
    date: 'YY/YY/YYYY',
    totalAmount: 'YYYYYYYYY',
  }
])
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8" style="background-color: #fbfbfb;">
    <div class="max-w-full mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">ໃບສັ່ງທີ່ໄດ້ຮັບ</h1>

      <!-- Fines Table -->
      <div v-if="fines.length > 0" class="mt-4">
        <div class="mt-4 rounded shadow h-95 w-full touch-auto overflow-auto">
          <table class="w-full border-separate" style="border-spacing: 0 0.5rem;">
            <thead class="sticky top-0 bg-stone-300 shadow-sm z-30">
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
                    <button class="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded flex items-center text-sm shadow-lg h-10 w-20">
                      <span>ຊຳລະ</span>
                      <ArrowRight />
                    </button>
                    <button @click="showDetailsPopup = true" class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm flex items-center justify-center group relative z-10" title="ລາຍລະອຽດ">
                      <inforicon />
                      <span class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">ລາຍລະອຽດ</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- No Data Message -->
      <div v-else class="bg-gray-100 rounded-lg p-8 text-center mt-4 shadow">
        <p class="text-gray-500 text-lg">No data yet</p>
      </div>
    </div>

          <!-- Details Popup -->
      <div v-if="showDetailsPopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closeModal">
        <FineDetails @close="closeModal" @click.stop />
      </div>
  </div>
</template>