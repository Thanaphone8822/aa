<script setup>
import { ref } from 'vue'

// Modal visibility
const showOffenderLogin = ref(false)
const showPoliceLogin = ref(false)

// Form data
const offenderForm = ref({
  citizenId: '',
  password: ''
})

const policeForm = ref({
  officerId: '',
  password: ''
})

// Modal control functions
const closeOffenderLogin = () => {
  showOffenderLogin.value = false
  offenderForm.value = { citizenId: '', password: '' }
}

const closePoliceLogin = () => {
  showPoliceLogin.value = false
  policeForm.value = { officerId: '', password: '' }
}

// Login handlers
const handleOffenderLogin = () => {
  console.log('Offender login:', offenderForm.value)
  // Here you would typically send the login data to your backend
  alert(`ເຂົ້າສູ່ລະບົບສໍາເລັດ: ${offenderForm.value.citizenId}`)
  closeOffenderLogin()
  // Navigate to offender dashboard
}

const handlePoliceLogin = () => {
  console.log('Police login:', policeForm.value)
  // Here you would typically send the login data to your backend
  alert(`ເຂົ້າສູ່ລະບົບສໍາເລັດ: ${policeForm.value.officerId}`)
  closePoliceLogin()
  // Navigate to police dashboard
}

// Register function
const showRegisterForm = () => {
  alert('ຟີເຈີລົງທະບຽນຈະມາໃນໄວໆນີ້ (Registration feature coming soon)')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
    <!-- Header Section -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <!-- Logo -->
      <div class="mb-8">
        <img class="w-32 h-32 object-contain" src="@/assets/Policelogo.png" alt="Police Logo">
      </div>
      
      <!-- Title Section -->
      <div class="text-center mb-12">
        <h1 class="text-black font-bold text-4xl mb-4 font-lao">ກົມຕໍາຫຼວດຈາລະຈອນ</h1>
        <h2 class="text-gray-700 font-semibold text-xl mb-2 font-lao">ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ</h2>
        <p class="text-gray-600 text-lg font-lao">ກະລຸນາເລືອກປະເພດຜູ້ໃຊ້ງານ</p>
      </div>

      <!-- Login Buttons Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <!-- Offender Login Button -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2 font-lao">ຜູ້ລະເມີດກົດຈະລາຈອນ</h3>
            <p class="text-gray-600 mb-6 font-lao">ເຂົ້າສູ່ລະບົບເພື່ອເບິ່ງໃບສັ່ງແລະຊຳລະຄ່າປັບ</p>
            <button 
              @click="showOffenderLogin = true"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 font-lao"
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
          </div>
        </div>

        <!-- Police Login Button -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2 font-lao">ເຈົ້າໜ້າທີ່ຕຳຫຼວດ</h3>
            <p class="text-gray-600 mb-6 font-lao">ເຂົ້າສູ່ລະບົບເພື່ອຈັດການໃບສັ່ງແລະອອກໃບປັບ</p>
            <button 
              @click="showPoliceLogin = true"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 font-lao"
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-white shadow-lg py-4">
      <div class="text-center text-gray-600 text-sm font-lao">
        © 2024 ກົມຕໍາຫຼວດຈາລະຈອນ - ລະບົບຈັດການໃບສັ່ງ
      </div>
    </div>

    <!-- Offender Login Modal -->
    <div v-if="showOffenderLogin" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closeOffenderLogin">
      <div @click.stop class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
        <!-- Close Button -->
        <button @click="closeOffenderLogin" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Modal Header -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 font-lao">ເຂົ້າສູ່ລະບົບຜູ້ລະເມີດ</h2>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleOffenderLogin">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-lao">ເລກບັດປະຊາຊົນ</label>
              <input 
                v-model="offenderForm.citizenId"
                type="text" 
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="ປ້ອນເລກບັດປະຊາຊົນ"
                required
              >
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-lao">ລະຫັດຜ່ານ</label>
              <input 
                v-model="offenderForm.password"
                type="password" 
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="ປ້ອນລະຫັດຜ່ານ"
                required
              >
            </div>
          </div>
          
          <button 
            type="submit"
            class="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 font-lao"
          >
            ເຂົ້າສູ່ລະບົບ
          </button>
        </form>

        <!-- Register Link -->
        <div class="text-center mt-4">
          <p class="text-gray-600 text-sm font-lao">
            ຍັງບໍ່ມີບັນຊີ? 
            <button @click="showRegisterForm" class="text-orange-500 hover:text-orange-600 font-semibold">ລົງທະບຽນ</button>
          </p>
        </div>
      </div>
    </div>

    <!-- Police Login Modal -->
    <div v-if="showPoliceLogin" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closePoliceLogin">
      <div @click.stop class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
        <!-- Close Button -->
        <button @click="closePoliceLogin" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Modal Header -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 font-lao">ເຂົ້າສູ່ລະບົບເຈົ້າໜ້າທີ່</h2>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handlePoliceLogin">
          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-lao">ລະຫັດເຈົ້າໜ້າທີ່</label>
              <input 
                v-model="policeForm.officerId"
                type="text" 
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ປ້ອນລະຫັດເຈົ້າໜ້າທີ່"
                required
              >
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2 font-lao">ລະຫັດຜ່ານ</label>
              <input 
                v-model="policeForm.password"
                type="password" 
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ປ້ອນລະຫັດຜ່ານ"
                required
              >
            </div>
          </div>
          
          <button 
            type="submit"
            class="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 font-lao"
          >
            ເຂົ້າສູ່ລະບົບ
          </button>
        </form>
      </div>
    </div>
  </div>
</template>