<script setup>
import { ref } from 'vue'
import inforicon from './icons/inforicon.vue';
import ArrowRight from './icons/ArrowRight.vue';


const showDetailsPopup = ref(false);
const modalData = ref({
  licenseId: 'XXXXX',
  zone: 'XX',
  locationCode: 'XXXXXXX',
  violationType: 'XXXX',
  location: 'XXXXXXXXXXXX',
  time: '00:00',
  date: 'XX/XX/XXXX'
});

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
                  <button class="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded flex items-center text-sm shadow-lg h-10 w-20">
                    <span>ຊຳລະ</span>
                    <ArrowRight />
                  </button>
                  <button @click="showDetailsPopup = true" class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm flex items-center justify-center group relative" title="ລາຍລະອຽດ">
                    <inforicon />
                    <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">ລາຍລະອຽດ</span>
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
    <div v-if="showDetailsPopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">ໃບສັ່ງ</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-black">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Left Column - Outstanding Violations -->
          <div class="bg-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-800 mb-4">ຈຳນວນໝວດ</h3>
            <div class="space-y-2">
              <div class="bg-white rounded p-2">
                <span class="text-sm text-black">ໝວດທີ່ X</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="text-sm text-black">ໝວດທີ່ X</span>
              </div>
            </div>
          </div>

          <!-- Middle Column - Violations Count -->
          <div class="bg-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-800 mb-4">ຈຳນວນມາດຕາ</h3>
            <div class="space-y-2">
              <div class="bg-white rounded p-2">
                <span class="text-sm text-black">ມາດຕາທີ່ X ບິນໃລລາດ {{ modalData.licenseId }} ຄັນ</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="text-sm text-black">ມາດຕາທີ່ X ບິນໃລລາດ {{ modalData.licenseId }} ຄັນ</span>
              </div>
            </div>
          </div>

          <!-- Right Column - Details -->
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-black font-medium">ເລກທີ່ໃບສັ່ງ:</span>
                <span class="text-sm text-red-500">{{ modalData.licenseId }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-black font-medium">ຈຳນວນຂໍ້ຫາ:</span>
                <span class="text-sm text-red-500">{{ modalData.zone }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-black font-medium">ປັບໄໝໂດຍເຈົ້າໜ້າທີ່:</span>
                <span class="text-sm text-red-500">{{ modalData.locationCode }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-black font-medium">ປະເພດພາຫະນະ:</span>
                <span class="text-sm text-red-500">{{ modalData.violationType }}</span>
              </div>
              <div class="mt-4">
                <span class="text-sm text-black font-medium">ລວມເປັນເງິນແມ່ນ:</span>
                <div class="bg-gray-300 rounded p-2 mt-2">
                  <span class="text-red-500 font-bold">{{ modalData.location }}</span>
                  <span class="ml-2 text-black">ກີບ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Left - Description -->
          <div class="bg-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-800 mb-4">ລາຍລະອຽດການກະທໍາຜິດ</h3>
            <div class="bg-white rounded p-4 min-h-[100px]">
              <span class="text-gray-400">........</span>
            </div>
          </div>

          <!-- Right - Time and Actions -->
          <div class="space-y-4">
            <div class="bg-white border rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-black font-medium">ເວລາ:</span>
                <span class="text-red-500 font-bold">{{ modalData.time }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-black font-medium">ວັນເດືອນປີ:</span>
                <span class="text-red-500 font-bold">{{ modalData.date }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3">
              <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                ປະຕິເສດ ✕
              </button>
              <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                ອະນຸມັດ ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>