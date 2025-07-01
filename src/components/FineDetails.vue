<script setup>
import { ref } from 'vue'

// Define emit function to communicate with parent
const emit = defineEmits(['close'])

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
  emit('close'); // Emit close event to parent
};
</script>


<template>
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
                <span class="text-sm text-black">ມາດຕາທີ່ X ບິນໃລລາດ {{ modalData.licenseId }} ກີບ</span>
              </div>
              <div class="bg-white rounded p-2">
                <span class="text-sm text-black">ມາດຕາທີ່ X ບິນໃລລາດ {{ modalData.licenseId }} ກີບ</span>
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
          </div>
        </div>
      </div>
</template>