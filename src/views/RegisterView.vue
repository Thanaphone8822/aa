<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6 font-noto">ລົງທະບຽນ</h1>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 font-noto">ຊື່ຜູ້ໃຊ້:</label>
          <input id="username" type="text" placeholder="Enter your username" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 font-noto">ອີເມວ:</label>
          <input id="email" type="email" placeholder="Enter your email" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 font-noto">ລະຫັດຜ່ານ:</label>
          <input id="password" type="password" placeholder="Enter your password" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="confirm-password"
            class="block text-sm font-medium text-gray-700 font-noto">ຢືນຢັນລະຫັດຜ່ານ:</label>
          <input id="confirm-password" type="password" placeholder="Confirm your password" required
            class="mt-1 block w-full px-3 py-2 rounded-md border-b-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit"
          class="font-noto block w-full py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          ລົງທະບຽນ
        </button>
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 font-noto">ມີບັນຊີແລ້ວ?</p>
          <a href="/login" class="text-sm text-blue-600 font-noto hover:underline">ເຂົ້າສູ່ລະບົບ</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap');

.font-noto {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>

<style scoped></style>