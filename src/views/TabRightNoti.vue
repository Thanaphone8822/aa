<script setup>
import { ref } from 'vue';

const notifications = ref([
  { id: 1, type: 'fine', message: 'You have a new fine for speeding.', read: false, time: '5m ago' },
  { id: 2, type: 'payment', message: 'Payment for fine #12345 was successful.', read: true, time: '1h ago' },
  { id: 3, type: 'reminder', message: 'Your license is expiring soon.', read: false, time: '2d ago' },
]);

const activeTab = ref('all'); // 'all', 'unread'
const showModal = ref(false);
const modalData = ref({
  licenseId: 'XXXXX',
  zone: 'XX',
  locationCode: 'XXXXXXX',
  violationType: 'XXXX',
  location: 'XXXXXXXXXXXX',
  time: '00:00',
  date: 'XX/XX/XXXX'
});

const openModal = (notification) => {
  // You can customize modal data based on the notification clicked
  showModal.value = true;
  // Mark notification as read when opened
  notification.read = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
    <div class="p-4 border-b flex justify-between items-center">
      <h2 class="text-xl font-bold text-gray-800">ການແຈ້ງເຕືອນ</h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-black">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex border-b">
      <button
        @click="activeTab = 'all'"
        :class="['flex-1 p-3 text-center font-semibold transition-colors', activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100']"
      >
        ທັງຫມົດ
      </button>
      <button
        @click="activeTab = 'unread'"
        :class="['flex-1 p-3 text-center font-semibold transition-colors', activeTab === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100']"
      >
        ຍັງບໍ່ໄດ້ອ່ານ
      </button>
    </div>

    <!-- Notifications List -->
    <div class="p-2 overflow-y-auto h-[calc(100%-120px)]">
      <div v-if="activeTab === 'all'">
        <div 
          v-for="noti in notifications" 
          :key="noti.id" 
          @click="openModal(noti)"
          class="p-6 mb-2 rounded-lg cursor-pointer transition-colors hover:scale-105 transform" 
          :class="noti.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'"
        >
          <p class="font-medium text-sm text-gray-800">{{ noti.message }}</p>
          <span class="text-xs text-gray-500">{{ noti.time }}</span>
        </div>
      </div>
      <div v-if="activeTab === 'unread'">
         <div 
           v-for="noti in notifications.filter(n => !n.read)" 
           :key="noti.id" 
           @click="openModal(noti)"
           class="p-6 mb-2 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors hover:scale-105 transform"
         >
          <p class="font-medium text-sm text-gray-800">{{ noti.message }}</p>
          <span class="text-xs text-gray-500">{{ noti.time }}</span>
        </div>
        <p v-if="notifications.filter(n => !n.read).length === 0" class="text-gray-500 text-center mt-8">No unread notifications.</p>
      </div>
    </div>
  </div>

  <!-- Modal Popup -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
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
</template>

<style scoped>
/* Additional custom styles if needed */
.z-60 {
  z-index: 60;
}
</style>
