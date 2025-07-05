<script setup>
import { ref } from 'vue'
import inforicon from './icons/inforicon.vue';
import ArrowRight from './icons/ArrowRight.vue';
import FineDetails from '@/components/FineDetails.vue';


const showDetailsPopup = ref(false);
const showPaymentSection = ref(false);

const closeModal = () => {
  showDetailsPopup.value = false;
};

const openPaymentSection = () => {
  showPaymentSection.value = true;
};

const closePaymentSection = () => {
  showPaymentSection.value = false;
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
                    <button @click="openPaymentSection" class="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded flex items-center text-sm shadow-lg h-10 w-20">
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

    <!-- Payment QR Code Section -->
    <div v-if="showPaymentSection" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closePaymentSection">
      <div @click.stop class="bg-gray-300 rounded-lg p-6 max-w-md w-full mx-4 relative">
        <!-- Close Button -->
        <button @click="closePaymentSection" class="absolute top-4 right-4 text-gray-600 hover:text-black z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- QR Code Section -->
        <div class="bg-white rounded-lg p-6 mb-4">
          <div class="flex flex-col items-center">
            <!-- QR Code Placeholder -->
            <div class="w-40 h-40 border-2 border-black rounded-lg flex flex-col items-center justify-center mb-4">
              <div class="text-4xl font-bold mb-2">QR</div>
              <div class="text-2xl font-bold">CODE</div>
            </div>
            
            <!-- Amount Display -->
            <div class="bg-gray-200 rounded-lg px-4 py-2 text-center">
              <span class="text-black font-medium">ບັນລວງ </span>
              <span class="text-red-500 font-bold">XXXXXXXXXXX</span>
              <span class="text-black font-medium"> ກີບ</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <!-- Upload Evidence Button -->
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center flex-1 space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <span class="text-sm">ອັບໂຫລດຮູບການຊໍາລະ</span>
          </button>
          
          <!-- Payment Complete Button -->
          <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center flex-1 space-x-2">
            <span class="text-sm">ສົ່ງຮູບການຊໍາລະ</span>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>