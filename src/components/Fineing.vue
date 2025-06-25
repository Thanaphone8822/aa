<script setup lang="ts">
import { ref, computed } from 'vue'
import trashicon from './icons/trashicon.vue'

// Form data
const vehicleTypes = ref<string[]>([])
const violationTypes = ref<string[]>([])
const articles = ref<string[]>([])

// Summary form data
const receiptCode = ref('')
const paymentType = ref('')
const paymentCodeDay = ref('')
const paymentCodeMonth = ref('')
const historyFee = ref('')
const complaintDetails = ref('')

// Price mapping for each article
const articlePrices: { [key: string]: number } = {
  'ມາດຕາ 6: ຜູ້ຂັບຂີ່ທີ່ບໍ່ເຖິງກະສຽນອາຍຸ': 50000,
  'ມາດຕາ 7: ຜູ້ຂັບຂີ່ລົດທຸກປະເພດໃນເວລາທີ່ມີທາດເຫຼົ້າໃນຮ່າງກາຍ': 200000,
  'ມາດຕາ 8: ການຂັບຂີ່ລົດໂດຍບໍ່ມີເອກະສານຄົບຖ້ວນ': 30000,
  'ມາດຕາ 9:  ເອກະສານລົດ, ໃບຂັບຂີ່ຍານພາຫະນະທີ່ໝົດກໍານົດ ຫຼື ບໍ່ຖືກຕ້ອງຕາມປະເພດລົດ': 40000,
  'ມາດຕາ 10:  ລົດບໍ່ຕິດປ້າຍທະບຽນ, ຕິດປ້າຍທະບຽນບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸການນໍາໃຊ້': 60000,
  'ມາດຕາ 11: ການນໍາໃຊ້ລົດບໍ່ໄດ້ກວດກາເຕັກນິກ ແລະ ການດັດແປງເຕັກນິກລົດ': 80000,
  'ມາດຕາ 12: ການນໍາໃຊ້ລົດ ທີ່ມີສະພາບເຕັກນິກ ບໍ່ໄດ້ມາດຕະຖານ': 70000,
  'ມາດຕາ 13: ການຂັບຂີ່ລົດຕອຶກໆ, ລົດໄຖນາເດີນຕາມແກ່ລໍ້, ລົດອີແຕັນ, ລົດຊິ້ງ ທີ່ມີສະພາບເຕັກນິກບໍ່ສົມບູນ': 90000,
  'ມາດຕາ 14: ການໃຊ້ຄວາມໄວເກີນກຳນົດ': 100000,
  'ມາດຕາ 15: ການຈອດລົດບໍ່ຖືກຕ້ອງຕາມລະບຽບການ ກ່ຽວກັບການຈະລາຈອນທາງບົກ': 25000,
  'ມາດຕາ 16: ການຈອດລົດຍາມສຸກເສີນ': 35000,
  'ມາດຕາ 17: ລົດເປ່ເພກາງທາງ': 150000,
  'ມາດຕາ 18: ການຂັບຂີ່ລົດບໍ່ຖືກທິດທາງການຈະລາຈອນ': 75000,
  'ມາດຕາ 19: ການຂັບຂີ່ລົດແຂ່ງກັນ': 300000,
  'ມາດຕາ 20: ການຂັບຂີ່ລົດລ່ວງໄຟສັນຍານຈະລາຈອນ, ລະເມີດ ປ້າຍຫ້າມ,ປ້າຍກຳນົດ ຫຼື ປ້າຍບັງຄັບ': 120000,
  'ມາດຕາ 21: ການສັນຍານຂອງເຈົ້າໜ້າທີ່ຄວບຄຸມການຈະລາຈອນທາງບົກ': 80000,
  'ມາດຕາ 22: ການຂັບຂີ່ລົດໂດຍບໍ່ເຄົາລົບສິດຂອງຜູ້ອື່ນ': 45000,
  'ມາດຕາ 23: ການຂັບຂີ່ລົດດ້ວຍຄວາມປະໝາດ': 250000,
  'ມາດຕາ 24: ການຂັບຂີ່ລົດຕຳລະບົບໂຄງລ່າງພື້ນຖານທາງດ້ານເຕັກນິກ ແລະ ສັງຄົມ': 400000,
  'ມາດຕາ 25: ການຢຸດລົດຢຽບ ຫຼື ກາຍເສັ້ນໝາຍຢຸດ ຫຼື ທາງມ້າລາຍ ໂດຍບໍ່ປ່ອຍທາງໃຫ້ຄົນຍ່າງ': 65000,
  'ມາດຕາ 26: ການຂັບຂີ່ລົດບໍ່ຖືກຊ່ອງຈະລາຈອນ ແລະ ບໍ່ແນບຂວາ': 35000,
  'ມາດຕາ 27: ການນໍາໃຊ້ລະບົບໄຟແສງສະຫວ່າງ ແລະ ໄຟສັນຍານ ທີ່ບໍ່ຖືກຕ້ອງ': 40000,
  'ມາດຕາ 28: ການຕິດຕັ້ງໄຟສັນຍານ ແສງ,ສີ ແລະ ສຽງຫວໍ': 55000,
  'ມາດຕາ 29: ການຊີງຂຶ້ນໜ້າ, ການຖອຍຫຼັງ ແລະ ການລ້ຽວ ທີ່ບໍ່ຖືກຕ້ອງ': 30000,
  'ມາດຕາ 30: ການລາກແກ່ລົດ ທີ່ບໍ່ຖືກຕ້ອງ': 45000,
  'ມາດຕາ 31:  ການຂັບຂີ່ລົດຈັກບໍ່ໃສ່ໝວກກັນກະທົບ': 25000,
  'ມາດຕາ 32: ການກໍ່ສ້າງ ແລະ ສ້ອມແປງ ສິ່ງປຸກສ້າງ,ການກໍ່ສ້າງ ຕາມທາງຫຼວງ': 500000,
  'ມາດຕາ 33: ການວາງ ຫຼື ກອງ ວັດສະດຸກໍ່ສ້າງກີດຂວາງການຈະລາຈອນ': 200000,
  'ມາດຕາ 34: ການປຸກສ້າງທີ່ລ່ວງລໍ້າເຂົ້າໃນພື້ນທີ່ເຂດການຈະລາຈອນ': 800000,
  'ມາດຕາ 35: ການນໍາໃຊ້ເຂດການຈະລາຈອນທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ': 300000,
  'ມາດຕາ 36: ການບັນທຸກສິນຄ້າ ຫຼື ເຄື່ອງຂອງເກີນຂະໜາດ': 150000,
  'ມາດຕາ 37: ການບັນທຸກສິນຄ້າ ຫຼື ເຄື່ອງຂອງ ນໍ້າໜັກເກີນ': 180000,
  'ມາດຕາ 38: ການບັນທຸກຜູ້ໂດຍສານ ເກີນຈຳານວນ': 120000,
  'ມາດຕາ 39: ການຂັບຂີ່ລົດບໍ່ໃສ່ສາຍຮັດນິລະໄພ': 35000,
  'ມາດຕາ 40: ການຄຽນຖ່າຍສິນຄ້າ ຫຼື ເຄື່ອງຂອງ': 100000,
  'ມາດຕາ 41: ການເຄື່ອນຍ້າຍຍານພາຫະນະກົນຈັກໜັກ': 600000,
  'ມາດຕາ 42: ການເຮັດໃຫ້ໂຄງສ້າງ, ໂຄງປະກອບ, ສິ່ງປະກອບ ແລະ ສິ່ງປ້ອງກັນຄວາມປອດໄພ ຂອງທາງຫຼວງເປ່ເພເສຍຫາຍ': 1000000,
  'ມາດຕາ 43: ການສ້າງຄວາມເບີະເປື້ອນໃສ່ ່ທາງຫຼວງ': 75000,
  'ມາດຕາ 44: ການລ້ຽງສັດ ຫຼື ການປ່ອຍສັດລ້ຽງ': 50000
}

// Vehicle type options
const vehicleOptions = [
  'ລົດຈັກ',
  'ລົດສາມລໍ້ຕິດເຄື່ອງຈັກ',
  'ລົດໂມເປດ(Moped)',
  'ລົດຂົນສົ່ງຜູ້ໂດຍສານຂະໜາດນ້ອຍ',
  'ລົດຂົນສົ່ງຜູ້ໂດຍສານຂະໜາດກາງ',
  'ລົດຂົນສົ່ງຜູ້ໂດຍສານຂະໜາດໃຫຍ່',
  'ລົດຂົນສົ່ງສິນຄ້າຂະໜາດນ້ອຍ',
  'ລົດຂົນສົ່ງສິນຄ້າຂະໜາດກາງ',
  'ລົດຂົນສົ່ງສິນຄ້າຂະໜາດໃຫຍ່'
]

// Violation type options
const violationOptions = [
  'ໝວດທີ 1',
  'ໝວດທີ 2',
  'ໝວດທີ 3',
  'ໝວດທີ 4',
  'ໝວດທີ 5',
  'ໝວດທີ 6',
  'ໝວດທີ 7'
]

// Articles organized by violation type (50 total articles)
const articlesByViolationType = {
  'ໝວດທີ 1': [
    'ມາດຕາ 6: ຜູ້ຂັບຂີ່ທີ່ບໍ່ເຖິງກະສຽນອາຍຸ',
    'ມາດຕາ 7: ຜູ້ຂັບຂີ່ລົດທຸກປະເພດໃນເວລາທີ່ມີທາດເຫຼົ້າໃນຮ່າງກາຍ'
  ],
  'ໝວດທີ 2': [
    'ມາດຕາ 8: ການຂັບຂີ່ລົດໂດຍບໍ່ມີເອກະສານຄົບຖ້ວນ',
    'ມາດຕາ 9:  ເອກະສານລົດ, ໃບຂັບຂີ່ຍານພາຫະນະທີ່ໝົດກໍານົດ ຫຼື ບໍ່ຖືກຕ້ອງຕາມປະເພດລົດ',
    'ມາດຕາ 10:  ລົດບໍ່ຕິດປ້າຍທະບຽນ, ຕິດປ້າຍທະບຽນບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸການນໍາໃຊ້'
  ],
  'ໝວດທີ 3': [
    'ມາດຕາ 11: ການນໍາໃຊ້ລົດບໍ່ໄດ້ກວດກາເຕັກນິກ ແລະ ການດັດແປງເຕັກນິກລົດ',
    'ມາດຕາ 12: ການນໍາໃຊ້ລົດ ທີ່ມີສະພາບເຕັກນິກ ບໍ່ໄດ້ມາດຕະຖານ',
    'ມາດຕາ 13: ການຂັບຂີ່ລົດຕອຶກໆ, ລົດໄຖນາເດີນຕາມແກ່ລໍ້, ລົດອີແຕັນ, ລົດຊິ້ງ ທີ່ມີສະພາບເຕັກນິກບໍ່ສົມບູນ'
  ],
  'ໝວດທີ 4': [
    'ມາດຕາ 14: ການໃຊ້ຄວາມໄວເກີນກຳນົດ',
    'ມາດຕາ 15: ການຈອດລົດບໍ່ຖືກຕ້ອງຕາມລະບຽບການ ກ່ຽວກັບການຈະລາຈອນທາງບົກ',
    'ມາດຕາ 16: ການຈອດລົດຍາມສຸກເສີນ',
    'ມາດຕາ 17: ລົດເປ່ເພກາງທາງ',
    'ມາດຕາ 18: ການຂັບຂີ່ລົດບໍ່ຖືກທິດທາງການຈະລາຈອນ',
    'ມາດຕາ 19: ການຂັບຂີ່ລົດແຂ່ງກັນ',
    'ມາດຕາ 20: ການຂັບຂີ່ລົດລ່ວງໄຟສັນຍານຈະລາຈອນ, ລະເມີດ ປ້າຍຫ້າມ,ປ້າຍກຳນົດ ຫຼື ປ້າຍບັງຄັບ',
    'ມາດຕາ 21: ການສັນຍານຂອງເຈົ້າໜ້າທີ່ຄວບຄຸມການຈະລາຈອນທາງບົກ',
    'ມາດຕາ 22: ການຂັບຂີ່ລົດໂດຍບໍ່ເຄົາລົບສິດຂອງຜູ້ອື່ນ',
    'ມາດຕາ 23: ການຂັບຂີ່ລົດດ້ວຍຄວາມປະໝາດ',
    'ມາດຕາ 24: ການຂັບຂີ່ລົດຕຳລະບົບໂຄງລ່າງພື້ນຖານທາງດ້ານເຕັກນິກ ແລະ ສັງຄົມ',
    'ມາດຕາ 25: ການຢຸດລົດຢຽບ ຫຼື ກາຍເສັ້ນໝາຍຢຸດ ຫຼື ທາງມ້າລາຍ ໂດຍບໍ່ປ່ອຍທາງໃຫ້ຄົນຍ່າງ',
    'ມາດຕາ 26: ການຂັບຂີ່ລົດບໍ່ຖືກຊ່ອງຈະລາຈອນ ແລະ ບໍ່ແນບຂວາ',
    'ມາດຕາ 27: ການນໍາໃຊ້ລະບົບໄຟແສງສະຫວ່າງ ແລະ ໄຟສັນຍານ ທີ່ບໍ່ຖືກຕ້ອງ',
    'ມາດຕາ 28: ການຕິດຕັ້ງໄຟສັນຍານ ແສງ,ສີ ແລະ ສຽງຫວໍ',
    'ມາດຕາ 29: ການຊີງຂຶ້ນໜ້າ, ການຖອຍຫຼັງ ແລະ ການລ້ຽວ ທີ່ບໍ່ຖືກຕ້ອງ',
    'ມາດຕາ 30: ການລາກແກ່ລົດ ທີ່ບໍ່ຖືກຕ້ອງ',
    'ມາດຕາ 31:  ການຂັບຂີ່ລົດຈັກບໍ່ໃສ່ໝວກກັນກະທົບ',
  ],
  'ໝວດທີ 5': [
    'ມາດຕາ 32: ການກໍ່ສ້າງ ແລະ ສ້ອມແປງ ສິ່ງປຸກສ້າງ,ການກໍ່ສ້າງ ຕາມທາງຫຼວງ',
    'ມາດຕາ 33: ການວາງ ຫຼື ກອງ ວັດສະດຸກໍ່ສ້າງກີດຂວາງການຈະລາຈອນ',
    'ມາດຕາ 34: ການປຸກສ້າງທີ່ລ່ວງລໍ້າເຂົ້າໃນພື້ນທີ່ເຂດການຈະລາຈອນ',
    'ມາດຕາ 35: ການນໍາໃຊ້ເຂດການຈະລາຈອນທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ'
  ],
  'ໝວດທີ 6': [
    'ມາດຕາ 36: ການບັນທຸກສິນຄ້າ ຫຼື ເຄື່ອງຂອງເກີນຂະໜາດ',
    'ມາດຕາ 37: ການບັນທຸກສິນຄ້າ ຫຼື ເຄື່ອງຂອງ ນໍ້າໜັກເກີນ',
    'ມາດຕາ 38: ການບັນທຸກຜູ້ໂດຍສານ ເກີນຈຳານວນ',
    'ມາດຕາ 39: ການຂັບຂີ່ລົດບໍ່ໃສ່ສາຍຮັດນິລະໄພ',
    'ມາດຕາ 40: ການຄຽນຖ່າຍສິນຄ້າ ຫຼື ເຄື່ອງຂອງ'
  ],
  'ໝວດທີ 7': [
    'ມາດຕາ 41: ການເຄື່ອນຍ້າຍຍານພາຫະນະກົນຈັກໜັກ',
    'ມາດຕາ 42: ການເຮັດໃຫ້ໂຄງສ້າງ, ໂຄງປະກອບ, ສິ່ງປະກອບ ແລະ ສິ່ງປ້ອງກັນຄວາມປອດໄພ ຂອງທາງຫຼວງເປ່ເພເສຍຫາຍ',
    'ມາດຕາ 43: ການສ້າງຄວາມເບີະເປື້ອນໃສ່ ່ທາງຫຼວງ',
    'ມາດຕາ 44: ການລ້ຽງສັດ ຫຼື ການປ່ອຍສັດລ້ຽງ'
  ]
}

// Computed property to get articles based on selected violation types
const availableArticles = computed(() => {
  const articles: string[] = []
  violationTypes.value.forEach(violationType => {
    if (articlesByViolationType[violationType as keyof typeof articlesByViolationType]) {
      articles.push(...articlesByViolationType[violationType as keyof typeof articlesByViolationType])
    }
  })
  return articles
})

// Check if any violation type is selected
const hasSelectedViolations = computed(() => violationTypes.value.length > 0)

// Calculate total price of selected articles
const totalPrice = computed(() => {
  return articles.value.reduce((total, article) => {
    return total + (articlePrices[article] || 0)
  }, 0)
})

// Format price to Lao Kip
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('lo-LA').format(price) + ' ກີບ'
}

const handleAddMore = () => {
  console.log('Adding more items...')
}

const handleClear = () => {
  vehicleTypes.value = []
  violationTypes.value = []
  articles.value = []
  console.log('Form cleared')
}

const handleApprove = () => {
  console.log('Approving fines...', {
    vehicleTypes: vehicleTypes.value,
    violationTypes: violationTypes.value,
    articles: articles.value,
    totalPrice: totalPrice.value,
    formattedTotal: formatPrice(totalPrice.value)
  })
}

// Helper functions for summary table
const getCurrentDate = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${day}/${month}/${year}`
}

const getViolationTypeForArticle = (article: string) => {
  for (const [violationType, articlesList] of Object.entries(articlesByViolationType)) {
    if (articlesList.includes(article)) {
      return violationType
    }
  }
  return 'N/A'
}

const removeArticle = (articleToRemove: string) => {
  const index = articles.value.indexOf(articleToRemove)
  if (index > -1) {
    articles.value.splice(index, 1)
  }
}

const generateReceipt = () => {
  console.log('Generating receipt...', {
    articles: articles.value,
    totalPrice: totalPrice.value,
    receiptCode: receiptCode.value,
    paymentType: paymentType.value,
    paymentCodeDay: paymentCodeDay.value,
    paymentCodeMonth: paymentCodeMonth.value,
    historyFee: historyFee.value,
    complaintDetails: complaintDetails.value
  })
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-100">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-center mb-8 text-black">ເລືອກຂໍ້ຫາອອກໃບສັ່ງ</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Vehicle Types Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ປະເພດລົດ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <div v-for="option in vehicleOptions" :key="option" class="flex items-center">
            <input 
              type="checkbox" 
              :id="'vehicle-' + option"
              :value="option"
              v-model="vehicleTypes"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            >
            <label :for="'vehicle-' + option" class="ml-3 text-sm text-gray-700 cursor-pointer">
              {{ option }}
            </label>
          </div>
        </div>
      </div>

      <!-- Violation Types Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">ປະເພດໝວດ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <div v-for="option in violationOptions" :key="option" class="flex items-center">
            <input 
              type="checkbox" 
              :id="'violation-' + option"
              :value="option"
              v-model="violationTypes"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            >
            <label :for="'violation-' + option" class="ml-3 text-sm text-gray-700 cursor-pointer">
              {{ option }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Articles Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ມາດຕາ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <!-- Show message when no violation types are selected -->
          <div v-if="!hasSelectedViolations" class="text-center text-gray-500 py-8">
            <p>ກະລຸນາເລືອກໝວດທີກ່ອນເພື່ອເບິ່ງມາດຕາ</p>
            <p class="text-sm mt-2">(Please select violation types first to see articles)</p>
          </div>
          
          <!-- Show articles when violation types are selected -->
          <div v-else>
            <div v-for="option in availableArticles" :key="option" class="flex items-center">
              <input 
                type="checkbox" 
                :id="'article-' + option"
                :value="option"
                v-model="articles"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              >
              <label :for="'article-' + option" class="ml-3 text-sm text-gray-700 cursor-pointer">
                {{ option }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ລາຄາຄ່າປັບ (Fine Prices)</h2>
        <div class="bg-white p-4 rounded-lg">
          <!-- Show message when no articles are selected -->
          <div v-if="articles.length === 0" class="text-center text-gray-500 py-8">
            <p>ບໍ່ມີມາດຕາທີ່ເລືອກ</p>
            <p class="text-sm mt-2">(No articles selected)</p>
          </div>
          
          <!-- Show selected articles with prices -->
          <div v-else class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="font-semibold text-gray-700 mb-3">ລາຍການມາດຕາທີ່ເລືອກ:</h3>
              <div class="space-y-2">
                <div v-for="article in articles" :key="article" 
                     class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm text-gray-700 flex-1">{{ article }}</span>
                  <span class="font-semibold text-blue-600 ml-4">
                    {{ formatPrice(articlePrices[article] || 0) }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Total Price -->
            <div class="pt-4">
              <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <span class="text-lg font-semibold text-gray-800">ລວມທັງໝົດ (Total):</span>
                <span class="text-xl font-bold text-blue-600">{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Action Buttons Section -->
    <div class="bg-gray-200 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-black">ວາງລາຄາອອກໃບສັ່ງ</h2>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">

        <button 
          @click="handleClear"
          class="flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
        <trashicon />
          ລ້າງຂໍ້ມູນ
        </button>

        <button 
          @click="handleAddMore"
          class="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          ເພີ່ມຂໍ້ຫາ
        </button>
      </div>
    </div>
  </div>

  <!-- Summary Section -->
  <div class="max-w-6xl mx-auto p-6 bg-gray-100 mt-8">
    <h1 class="text-2xl font-bold text-center mb-8 text-black">ຈັດການອອກສະຫງົບ</h1>
    
    <!-- Summary Table -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລຳດັບ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ປະເພດເໝວດ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ປະເພດມາດຕາ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ວັນເດືອນປີ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລາຄາ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຈັດການ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="articles.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                ບໍ່ມີຂໍ້ມູນທີ່ເລືອກ (No data selected)
              </td>
            </tr>
            <tr v-else v-for="(article, index) in articles" :key="article" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getViolationTypeForArticle(article) }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate" :title="article">{{ article }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getCurrentDate() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                {{ formatPrice(articlePrices[article] || 0) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="removeArticle(article)" class="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mr-2">
                  ແກ້ໄຂ
                </button>
                <button @click="removeArticle(article)" class="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                  ລຶບ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary Details and Complaint Form -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Summary Details -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-black">ຕົ້ນລວມ:</span>
            <span class="text-black font-semibold">{{ articles.length }} ລາຍການ</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-black">ລວມເປັນເງິນ:</span>
            <span class="font-bold text-lg text-blue-600">{{ formatPrice(totalPrice) }}</span>
          </div>
          
          <div class="border-t pt-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-black">ລະຫັດໃບຊຳລະ:</span>
              <input type="text" v-model="receiptCode" class="border rounded px-3 py-1 w-32" placeholder="XXXX">
            </div>
            
            <div class="flex justify-between items-center mb-3">
              <span class="text-black">ປະເພດການຊຳລະ:</span>
              <select v-model="paymentType" class="border rounded px-3 py-1 w-32">
                <option value="">ເລືອກ</option>
                <option value="cash">ເງິນສົດ</option>
                <option value="card">ບັດ</option>
                <option value="transfer">ໂອນເງິນ</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-black">ລະຫັດການຊຳລະ:</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-black">ວັນ:</span>
                <input type="text" v-model="paymentCodeDay" class="border rounded px-2 py-1 w-24" placeholder="XXXXXXX">
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-black">ເດືອນ:</span>
                <input type="text" v-model="paymentCodeMonth" class="border rounded px-2 py-1 w-24" placeholder="XXXXXXX">
              </div>
            </div>
            
            <div class="flex justify-between items-center mt-3">
              <span class="text-black">ຟີປະຫວັດ:</span>
              <input type="text" v-model="historyFee" class="border rounded px-3 py-1 w-32" placeholder="XXXXXXX">
            </div>
          </div>
        </div>
      </div>

      <!-- Complaint Details -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-black">ລາຍລະອຽດການຮ້ອງທຸກ</h3>
        <textarea 
          v-model="complaintDetails"
          class="text-black w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="ລາຍລະອຽດ..."
        ></textarea>
      </div>
    </div>

    <!-- Generate Receipt Button -->
    <div class="mt-6 flex justify-end">
      <button 
        @click="generateReceipt"
        class="flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        ຢືນຢັນອອກໃບສັ່ງ
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </button>
    </div>
  </div>

</template>

<style scoped>
/* Pure Tailwind CSS styling */
</style>