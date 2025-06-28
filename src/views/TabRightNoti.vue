<script setup>
import { ref } from 'vue';

const notifications = ref([
  { id: 1, type: 'fine', message: 'You have a new fine for speeding.', read: false, time: '5m ago' },
  { id: 2, type: 'payment', message: 'Payment for fine #12345 was successful.', read: true, time: '1h ago' },
  { id: 3, type: 'reminder', message: 'Your license is expiring soon.', read: false, time: '2d ago' },
]);

const activeTab = ref('all'); // 'all', 'unread'
</script>

<template>
  <div class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
    <div class="p-4 border-b flex justify-between items-center">
      <h2 class="text-xl font-bold text-gray-800">ການແຈ້ງເຕືອນ</h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">
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
        <div v-for="noti in notifications" :key="noti.id" class="p-6 mb-2 rounded-lg cursor-pointer transition-colors" :class="noti.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'">
          <p class="font-medium text-sm text-gray-800">{{ noti.message }}</p>
          <span class="text-xs text-gray-500">{{ noti.time }}</span>
        </div>
      </div>
      <div v-if="activeTab === 'unread'">
         <div v-for="noti in notifications.filter(n => !n.read)" :key="noti.id" class="p-6 mb-2 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
          <p class="font-medium text-sm text-gray-800">{{ noti.message }}</p>
          <span class="text-xs text-gray-500">{{ noti.time }}</span>
        </div>
        <p v-if="notifications.filter(n => !n.read).length === 0" class="text-gray-500 text-center mt-8">No unread notifications.</p>
      </div>
    </div>
  </div>
</template>
