<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import trashicon from './icons/trashicon.vue'

// Form data
const vehicleType = ref<string>('')
const violationTypes = ref<string[]>([])
const articles = ref<string[]>([])
const selectedViolationType = ref<string>('')

// New data structure for specific violations
const selectedViolations = ref<{
  [articleKey: string]: string[]
}>({})

// Summary form data
const complaintDetails = ref('')
const showSummarySection = ref(false)
const summaryFinalized = ref(false)

// Finalized summary data
const finalizedItems = ref<{
  vehicleType: string
  violations: { [articleKey: string]: string[] }
  timestamp: string
}[]>([])
const currentFinalizedViolations = ref<{
  [articleKey: string]: string[]
}>({})
const currentFinalizedVehicleType = ref<string>('')

// Title/Category mapping with individual prices for each violation
const articleTitles: { [key: string]: { title: string; price: number }[] } = {
  'ມາດຕາ 6: ຜູ້ຂັບຂີ່ທີ່ບໍ່ເຖິງກະສຽນອາຍຸ': [
    { title: 'ຂັບຂີ່ໂດຍບໍ່ມີໃບຂັບຂີ່', price: 80000 },
    { title: 'ໃບຂັບຂີ່ປອມ ຫຼື ແກ້ໄຂ', price: 150000 },
    { title: 'ອາຍຸຕ່ຳກວ່າ 18 ປີ', price: 60000 },
    { title: 'ບໍ່ຜ່ານການທົດສອບ', price: 40000 },
    { title: 'ໃຊ້ໃບຂັບຂີ່ຂອງຄົນອື່ນ', price: 100000 },
    { title: 'ໃບຂັບຂີ່ຖືກຍຶດ', price: 120000 },
    { title: 'ໃບຂັບຂີ່ຖືກເພີກຖອນ', price: 200000 },
    { title: 'ບໍ່ມີສິດຂັບຂີ່ຕາມກົດໝາຍ', price: 90000 }
  ],
  'ມາດຕາ 7: ຜູ້ຂັບຂີ່ລົດທຸກປະເພດໃນເວລາທີ່ມີທາດເຫຼົ້າໃນຮ່າງກາຍ': [
    { title: 'ດື່ມເຫຼົ້າຂະນະຂັບຂີ່', price: 250000 },
    { title: 'ມີທາດແອລກໍຮໍເກີນກຳນົດ', price: 300000 },
    { title: 'ແນມເຫືຼິງເຫຼົ້າຢ່າງຊັດເຈນ', price: 180000 },
    { title: 'ປະຕິເສດການກວດສອບ', price: 350000 },
    { title: 'ດື່ມຢາເສບຕິດ', price: 500000 },
    { title: 'ຂັບຂີ່ໃນສະພາບເມົາ', price: 400000 },
    { title: 'ມີພະຍານຢຸດການດື່ມ', price: 150000 },
    { title: 'ມີບັນຫາສຸຂະພາບຈາກການດື່ມ', price: 200000 }
  ],
  'ມາດຕາ 8: ການຂັບຂີ່ລົດໂດຍບໍ່ມີເອກະສານຄົບຖ້ວນ': [
    { title: 'ບໍ່ມີໃບຂັບຂີ່', price: 50000 },
    { title: 'ບໍ່ມີໃບທະບຽນລົດ', price: 40000 },
    { title: 'ບໍ່ມີໃບປະກັນໄພ', price: 60000 },
    { title: 'ບໍ່ມີໃບກວດສອບເຕັກນິກ', price: 35000 },
    { title: 'ເອກະສານໝົດອາຍຸ', price: 30000 },
    { title: 'ເອກະສານບໍ່ຄົບຖ້ວນ', price: 25000 },
    { title: 'ເອກະສານສູນຫາຍ', price: 45000 },
    { title: 'ເອກະສານເຊົາ ຫຼື ເປື້ອນ', price: 20000 }
  ],
  'ມາດຕາ 9:  ເອກະສານລົດ, ໃບຂັບຂີ່ຍານພາຫະນະທີ່ໝົດກໍານົດ ຫຼື ບໍ່ຖືກຕ້ອງຕາມປະເພດລົດ': [
    { title: 'ໃບຂັບຂີ່ໝົດອາຍຸ', price: 60000 },
    { title: 'ໃບທະບຽນໝົດອາຍຸ', price: 50000 },
    { title: 'ປະເພດລົດບໍ່ຕົງກັບໃບຂັບຂີ່', price: 80000 },
    { title: 'ໃບຂັບຂີ່ປະເພດຜິດ', price: 70000 },
    { title: 'ບໍ່ຕໍ່ອາຍຸໃບຂັບຂີ່', price: 40000 },
    { title: 'ບໍ່ຕໍ່ອາຍຸໃບທະບຽນ', price: 35000 },
    { title: 'ເອກະສານຖືກຍົກເລີກ', price: 100000 },
    { title: 'ຖືກເພີກຖອນສິດການຂັບຂີ່', price: 150000 }
  ],
  'ມາດຕາ 10:  ລົດບໍ່ຕິດປ້າຍທະບຽນ, ຕິດປ້າຍທະບຽນບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸການນໍາໃຊ້': [
    { title: 'ບໍ່ຕິດປ້າຍທະບຽນ', price: 100000 },
    { title: 'ປ້າຍທະບຽນປອມ', price: 200000 },
    { title: 'ປ້າຍທະບຽນບິດເບືອນ', price: 80000 },
    { title: 'ປ້າຍທະບຽນມົວ ຫຼື ເປື້ອນ', price: 30000 },
    { title: 'ປ້າຍທະບຽນໝົດອາຍຸ', price: 50000 },
    { title: 'ຕິດປ້າຍທະບຽນຜິດຕຳແໜ່ງ', price: 40000 },
    { title: 'ໃຊ້ປ້າຍທະບຽນຂອງລົດອື່ນ', price: 150000 },
    { title: 'ປິດປ້າຍທະບຽນ', price: 60000 }
  ],
  'ມາດຕາ 11: ການນໍາໃຊ້ລົດບໍ່ໄດ້ກວດກາເຕັກນິກ ແລະ ການດັດແປງເຕັກນິກລົດ': [
    { title: 'ບໍ່ກວດສອບເຕັກນິກປະຈຳປີ', price: 60000 },
    { title: 'ໃບກວດສອບໝົດອາຍຸ', price: 50000 },
    { title: 'ດັດແປງເຄື່ອງຈັກໂດຍບໍ່ມີອະນຸຍາດ', price: 120000 },
    { title: 'ດັດແປງລະບົບເບຼກ', price: 150000 },
    { title: 'ດັດແປງລະບົບແສງສະຫວ່າງ', price: 80000 },
    { title: 'ດັດແປງຕົວລົດ', price: 100000 },
    { title: 'ປ່ຽນສີລົດບໍ່ແຈ້ງ', price: 70000 },
    { title: 'ຕິດຕັ້ງອຸປະກອນບໍ່ມາດຕະຖານ', price: 90000 }
  ],
  'ມາດຕາ 14: ການໃຊ້ຄວາມໄວເກີນກຳນົດ': [
    { title: 'ຂັບໄວເກີນ 10-20 ກິໂລແມັດ/ຊົ່ວໂມງ', price: 80000 },
    { title: 'ຂັບໄວເກີນ 20-30 ກິໂລແມັດ/ຊົ່ວໂມງ', price: 120000 },
    { title: 'ຂັບໄວເກີນ 30-50 ກິໂລແມັດ/ຊົ່ວໂມງ', price: 180000 },
    { title: 'ຂັບໄວເກີນ 50+ ກິໂລແມັດ/ຊົ່ວໂມງ', price: 300000 },
    { title: 'ຂັບໄວໃນເຂດໂຮງຮຽນ', price: 200000 },
    { title: 'ຂັບໄວໃນເຂດບ້ານ', price: 150000 },
    { title: 'ຂັບໄວໃນເຂດໂຮງພະຍາບານ', price: 250000 },
    { title: 'ຂັບໄວໃນສະພາບອາກາດບໍ່ດີ', price: 100000 }
  ],
  'ມາດຕາ 19: ການຂັບຂີ່ລົດແຂ່ງກັນ': [
    { title: 'ແຂ່ງລົດທາງຫຼວງ', price: 400000 },
    { title: 'ແຂ່ງລົດໃນເມືອງ', price: 350000 },
    { title: 'ແຂ່ງລົດມີການລົງເງິນພະນັນ', price: 500000 },
    { title: 'ຈັດການແຂ່ງລົດບໍ່ໄດ້ອະນຸຍາດ', price: 600000 },
    { title: 'ມີຜູ້ເບິ່ງແຂ່ງລົດກີດຂວາງການຈະລາຈອນ', price: 250000 },
    { title: 'ແຂ່ງລົດເວລາກາງຄືນ', price: 300000 },
    { title: 'ແຂ່ງລົດໃນເຂດຫ້າມ', price: 450000 },
    { title: 'ກໍ່ຄວາມວຸ່ນວາຍຈາກການແຂ່ງລົດ', price: 200000 }
  ],
  'ມາດຕາ 31:  ການຂັບຂີ່ລົດຈັກບໍ່ໃສ່ໝວກກັນກະທົບ': [
    { title: 'ຜູ້ຂັບບໍ່ໃສ່ໝວກກັນກະທົບ', price: 40000 },
    { title: 'ຜູ້ໂດຍສານບໍ່ໃສ່ໝວກກັນກະທົບ', price: 35000 },
    { title: 'ໃສ່ໝວກບໍ່ມາດຕະຖານ', price: 30000 },
    { title: 'ໝວກກັນກະທົບຫຼຸດ ຫຼື ເສຍຫາຍ', price: 25000 },
    { title: 'ບໍ່ມັດສາຍໝວກກັນກະທົບ', price: 20000 },
    { title: 'ໃສ່ໝວກຜິດວິທີ', price: 15000 },
    { title: 'ໃຊ້ໝວກກັນກະທົບປອມ', price: 50000 },
    { title: 'ໝວກກັນກະທົບໝົດອາຍຸການນໍາໃຊ້', price: 30000 }
  ]
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

// Get available violation options (excluding already selected ones)
const availableViolationOptions = computed(() => {
  return violationOptions.filter(option => !violationTypes.value.includes(option))
})

// Auto-show summary section when finalized violations exist
const shouldShowSummary = computed(() => {
  return Object.keys(currentFinalizedViolations.value).length > 0
})

// Get individual violation price
const getViolationPrice = (article: string, violationTitle: string): number => {
  const violations = articleTitles[article] || []
  const violation = violations.find(v => v.title === violationTitle)
  return violation?.price || 0
}

// Calculate total price of currently selected violations (for fineing section)
const selectedTotalPrice = computed(() => {
  let total = 0
  Object.entries(selectedViolations.value).forEach(([article, violations]) => {
    violations.forEach(violationTitle => {
      total += getViolationPrice(article, violationTitle)
    })
  })
  return total
})

// Calculate total price of finalized violations (for summary section)
const totalPrice = computed(() => {
  let total = 0
  Object.entries(currentFinalizedViolations.value).forEach(([article, violations]) => {
    violations.forEach(violationTitle => {
      total += getViolationPrice(article, violationTitle)
    })
  })
  return total
})

// Format price to Lao Kip
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('lo-LA').format(price) + ' ກີບ'
}

// Watch for vehicle type changes and clear violation types (but not finalized data)
watch(vehicleType, () => {
  violationTypes.value = []
  selectedViolationType.value = ''
  articles.value = []
})

const handleAddMore = () => {
  // Only add if there are selected violations
  const hasSelectedViolations = Object.values(selectedViolations.value).some(violations => violations.length > 0)
  
  if (hasSelectedViolations && vehicleType.value) {
    // Add to finalized items
    finalizedItems.value.push({
      vehicleType: vehicleType.value,
      violations: JSON.parse(JSON.stringify(selectedViolations.value)),
      timestamp: new Date().toISOString()
    })
    
    // Update current finalized data for summary display
    Object.entries(selectedViolations.value).forEach(([article, violations]) => {
      if (violations.length > 0) {
        if (!currentFinalizedViolations.value[article]) {
          currentFinalizedViolations.value[article] = []
        }
        currentFinalizedViolations.value[article].push(...violations)
      }
    })
    currentFinalizedVehicleType.value = vehicleType.value
    
    // Clear form after adding
    vehicleType.value = ''
    violationTypes.value = []
    selectedViolationType.value = ''
    articles.value = []
    selectedViolations.value = {}
    
    console.log('Items added to summary:', {
      finalizedItems: finalizedItems.value,
      currentFinalizedViolations: currentFinalizedViolations.value
    })
  } else {
    console.log('Please select vehicle type and specific violations first')
  }
}

const handleClear = () => {
  // Only clear the fineing section (form fields)
  vehicleType.value = ''
  violationTypes.value = []
  selectedViolationType.value = ''
  articles.value = []
  selectedViolations.value = {}
  
  // Keep summary section intact - don't clear finalized data
  console.log('Fineing section cleared')
}

const handleClearAll = () => {
  // Clear both fineing section and summary section
  vehicleType.value = ''
  violationTypes.value = []
  selectedViolationType.value = ''
  articles.value = []
  selectedViolations.value = {}
  showSummarySection.value = false
  summaryFinalized.value = false
  
  // Clear finalized data
  finalizedItems.value = []
  currentFinalizedViolations.value = {}
  currentFinalizedVehicleType.value = ''
  
  console.log('Both fineing and summary sections cleared')
}

const addViolationType = () => {
  if (selectedViolationType.value && !violationTypes.value.includes(selectedViolationType.value)) {
    violationTypes.value.push(selectedViolationType.value)
    selectedViolationType.value = ''
  }
}

const removeViolationType = (violationType: string) => {
  const index = violationTypes.value.indexOf(violationType)
  if (index > -1) {
    violationTypes.value.splice(index, 1)
  }
}

const handleApprove = () => {
  console.log('Approving fines...', {
    vehicleType: vehicleType.value,
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

// Generate fines code starting with 0001
const generateFinesCode = () => {
  const timestamp = Date.now().toString().slice(-4)
  return `${timestamp}`
}

const getViolationTypeForArticle = (article: string) => {
  for (const [violationType, articlesList] of Object.entries(articlesByViolationType)) {
    if (articlesList.includes(article)) {
      return violationType
    }
  }
  return 'N/A'
}

const getArticleTitles = (article: string) => {
  const violations = articleTitles[article] || []
  return violations.map(v => v.title)
}

const getArticleTitleCount = (article: string) => {
  return articleTitles[article]?.length || 0
}

// New functions for violation management
const toggleViolation = (article: string, violation: string) => {
  if (!selectedViolations.value[article]) {
    selectedViolations.value[article] = []
  }
  
  const index = selectedViolations.value[article].indexOf(violation)
  if (index > -1) {
    selectedViolations.value[article].splice(index, 1)
    if (selectedViolations.value[article].length === 0) {
      delete selectedViolations.value[article]
    }
  } else {
    selectedViolations.value[article].push(violation)
  }
}

const isViolationSelected = (article: string, violation: string) => {
  return selectedViolations.value[article]?.includes(violation) || false
}

const editViolation = (article: string, violation: string) => {
  console.log('Editing violation:', { article, violation })
  // Add edit functionality here if needed
}

const removeViolation = (article: string, violation: string) => {
  if (currentFinalizedViolations.value[article]) {
    const index = currentFinalizedViolations.value[article].indexOf(violation)
    if (index > -1) {
      currentFinalizedViolations.value[article].splice(index, 1)
      
      // Remove article key if no violations left
      if (currentFinalizedViolations.value[article].length === 0) {
        delete currentFinalizedViolations.value[article]
      }
      
      // Also remove from finalized items
      finalizedItems.value = finalizedItems.value.map(item => ({
        ...item,
        violations: Object.fromEntries(
          Object.entries(item.violations).map(([key, violations]) => [
            key,
            violations.filter(v => !(key === article && v === violation))
          ]).filter(([, violations]) => violations.length > 0)
        )
      })).filter(item => Object.keys(item.violations).length > 0)
      
      if (Object.keys(currentFinalizedViolations.value).length === 0) {
        showSummarySection.value = false
        summaryFinalized.value = false
        currentFinalizedVehicleType.value = ''
      }
    }
  }
}

const generateReceipt = () => {
  console.log('Generating receipt...', {
    violations: currentFinalizedViolations.value,
    totalPrice: totalPrice.value,
    finesCode: generateFinesCode(),
    vehicleType: currentFinalizedVehicleType.value,
    complaintDetails: complaintDetails.value,
    finalizedItems: finalizedItems.value
  })
}
</script>

<template>
  <!-- Fineing Section -->
  <div class="max-w-4xl mx-auto p-6 bg-gray-100">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-center mb-8 text-black">ເລືອກຂໍ້ຫາອອກໃບສັ່ງ</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Vehicle Types Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ປະເພດລົດ</h2>
        <div class="bg-white p-4 rounded-lg">
          <select 
            v-model="vehicleType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          >
            <option value="" disabled>ເລືອກປະເພດລົດ</option>
            <option v-for="option in vehicleOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Violation Types Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">ປະເພດໝວດ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <!-- Dropdown for selecting violation types -->
          <select 
            v-model="selectedViolationType"
            @change="addViolationType"
            :disabled="!vehicleType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <option value="">
              {{ vehicleType ? 'ເລືອກໝວດ' : 'ເລືອກປະເພດລົດກ່ອນ' }}
            </option>
            <option v-for="option in availableViolationOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          
          <!-- Selected violation types as removable tags -->
          <div v-if="violationTypes.length > 0" class="flex flex-wrap gap-2 mt-3">
            <div v-for="violationType in violationTypes" :key="violationType" 
                 class="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>{{ violationType }}</span>
              <button @click="removeViolationType(violationType)" 
                      class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Articles Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ເລືອກການລະເມີດສະເພາະ</h2>
        <div class="bg-white p-4 rounded-lg space-y-4">
          <!-- Show message when no violation types are selected -->
          <div v-if="!hasSelectedViolations" class="text-center text-gray-500 py-8">
            <p>ກະລຸນາເລືອກໝວດທີກ່ອນເພື່ອເບິ່ງມາດຕາ</p>
            <p class="text-sm mt-2">(Please select violation types first to see articles)</p>
          </div>
          
          <!-- Show articles when violation types are selected -->
          <div v-else class="space-y-4">
            <div v-for="article in availableArticles" :key="article" class="border rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-800 text-sm">{{ article }}</h3>
                <span class="text-blue-600 font-bold text-xs">Individual Prices</span>
              </div>
              
              <!-- Individual violation checkboxes -->
              <div v-if="getArticleTitles(article).length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-for="(violation, index) in getArticleTitles(article)" :key="index" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :id="`violation-${article}-${index}`"
                    :checked="isViolationSelected(article, violation)"
                    @change="toggleViolation(article, violation)"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  >
                  <label :for="`violation-${article}-${index}`" class="ml-2 text-xs text-gray-700 cursor-pointer">
                    {{ violation }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-black">ລາຄາຄ່າປັບ (Fine Prices)</h2>
        <div class="bg-white p-4 rounded-lg">
          <!-- Show message when no violations are selected -->
          <div v-if="Object.keys(selectedViolations).length === 0" class="text-center text-gray-500 py-8">
            <p>ບໍ່ມີການລະເມີດທີ່ເລືອກ</p>
            <p class="text-sm mt-2">(No violations selected)</p>
          </div>
          
          <!-- Show selected violations with prices -->
          <div v-else class="space-y-4">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="font-semibold text-gray-700 mb-3">ລາຍການການລະເມີດທີ່ເລືອກ:</h3>
              <div class="space-y-4">
                <div v-for="(violations, article) in selectedViolations" :key="article" 
                     class="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <!-- Article Header -->
                  <div class="flex justify-between items-start mb-3">
                    <span class="text-sm font-medium text-gray-800 flex-1">{{ article }}</span>
                    <span class="font-bold text-blue-600 ml-4 text-lg">
                      {{ formatPrice(violations.reduce((sum, violation) => sum + getViolationPrice(String(article), violation), 0)) }}
                    </span>
                  </div>
                  
                  <!-- Selected Violations -->
                  <div v-if="violations.length > 0" class="mt-3">
                    <h4 class="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      ການລະເມີດທີ່ເລືອກ ({{ violations.length }} ລາຍການ):
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div v-for="(violation, index) in violations" :key="index"
                           class="flex items-center text-xs text-gray-600 bg-white px-2 py-1 rounded border">
                        <span class="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mr-2">
                          ✓
                        </span>
                        {{ violation }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Total Price -->
            <div class="pt-4">
              <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <span class="text-lg font-semibold text-gray-800">ລວມທັງໝົດ (Total):</span>
                <span class="text-xl font-bold text-blue-600">{{ formatPrice(selectedTotalPrice) }}</span>
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
          Clear Form
        </button>

        <button 
          @click="handleAddMore"
          :disabled="!vehicleType || Object.keys(selectedViolations).length === 0"
          class="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Add ({{ Object.values(selectedViolations).flat().length }})
        </button>
      </div>
    </div>
  </div>

  <!-- Summary Section -->
  <div class="max-w-6xl mx-auto p-6 bg-gray-100 mt-8">
    <h1 class="text-2xl font-bold text-center mb-8 text-black">ຈັດການອອກໃບສັ່ງ</h1>
    
    <!-- Summary Table -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລຳດັບ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ປະເພດໝວດ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ປະເພດມາດຕາ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຫົວຂໍ້</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ວັນເດືອນປີ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລາຄາ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຈັດການ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="!shouldShowSummary">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                ເລືອກຂໍ້ຫາແລ້ວກົດປຸ່ມ "Add" ເພື່ອເພີ່ມໃສ່ສະຫງົບ<br>
                (Select violations and click "Add" button to add to summary)
              </td>
            </tr>
            <template v-else>
              <template v-for="(violations, article) in currentFinalizedViolations" :key="article">
                <tr v-for="(violation, violationIndex) in violations" :key="`${article}-${violation}`" class="hover:bg-gray-50">
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ violationIndex + 1 }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getViolationTypeForArticle(String(article)) }}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-900">
                    <div class="max-w-xs">
                      <div class="font-semibold truncate" :title="String(article)">{{ article }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ violation }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getCurrentDate() }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {{ formatPrice(getViolationPrice(String(article), violation)) }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                     <button @click="editViolation(String(article), violation)" class="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mr-2">
                       ແກ້ໄຂ
                     </button>
                     <button @click="removeViolation(String(article), violation)" class="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                       ລຶບ
                      </button>
                  </td>
                </tr>
              </template>
            </template>
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
            <span class="text-black">ຈຳນວນຂໍ້ຫາ:</span>
            <span class="text-black font-semibold">{{ Object.values(currentFinalizedViolations).flat().length }} ລາຍການ</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-black">ລວມເປັນເງິນ:</span>
            <span class="font-bold text-lg text-blue-600">{{ formatPrice(totalPrice) }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-black">ລະຫັດໃບປັບ:</span>
            <span class="text-blue-600 font-semibold">{{ generateFinesCode() }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-black">ປະເພດລົດ:</span>
            <span class="text-black font-semibold">
              {{ currentFinalizedVehicleType || 'ບໍ່ໄດ້ເລືອກ' }}
            </span>
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

    <!-- Action Buttons -->
    <div class="mt-6 flex justify-between items-center">
      <!-- Clear All Button -->
      <button 
        @click="handleClearAll"
        class="flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        Clear All
      </button>
      
      <!-- Generate Receipt Button -->
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