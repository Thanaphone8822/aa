<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
// import axios from 'axios'

// Component state
const fineReports = ref<any[]>([]) // Will hold fine reports from the backend
const selectedFine = ref<any | null>(null) // Will hold the selected fine report
const loading = ref(true)
const error = ref<string | null>(null)
const activeFilter = ref<'all' | 'today' | 'older'>('all') // Add filter state

// Assumed backend endpoint
const API_URL = '/api/fines'

// Toggle summary visibility for a fine report
const toggleSummary = (fineReport: any) => {
    if (selectedFine.value && selectedFine.value.id === fineReport.id) {
        closeSummaryModal() // Hide if the same one is clicked
    } else {
        openSummaryModal(fineReport) // Show new one
    }
}

// Modal functions
const openSummaryModal = (fineReport: any) => {
    selectedFine.value = fineReport
    document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeSummaryModal = () => {
    selectedFine.value = null
    document.body.style.overflow = 'unset' // Restore background scrolling
}

// Handle escape key to close modal
const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && selectedFine.value) {
        closeSummaryModal()
    }
}

// Add event listeners
onMounted(() => {
    fetchFineReports()
    document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = 'unset' // Cleanup
})

// Fetch fine reports from the backend
const fetchFineReports = async () => {
    try {
        // Hard-coded sample response for now
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)

        const response = {
            data: [
                {
                    id: 101,
                    timestamp: today.toISOString().slice(0, 19).replace('T', ' '),
                    vehicleType: 'ລົດຈັກ',
                    complaintDetails: 'ລາຍລະອຽດສຳລັບໃບປັບໄໝ #101 - ມື້ນີ້',
                    finesCode: '101A',
                    articles: [
                        { id: 1, name: 'ມາດຕາ 6: ຜູ້ຂັບຂີ່ທີ່ບໍ່ເຖິງກະສຽນອາຍຸ', price: 50000 },
                        { id: 2, name: 'ມາດຕາ 14: ການໃຊ້ຄວາມໄວເກີນກຳນົດ', price: 100000 },
                    ]
                },
                {
                    id: 102,
                    timestamp: yesterday.toISOString().slice(0, 19).replace('T', ' '),
                    vehicleType: 'ລົດໃຫຍ່',
                    complaintDetails: 'ລາຍລະອຽດສຳລັບໃບປັບໄໝ #102 - ມື້ວານນີ້',
                    finesCode: '102B',
                    articles: [
                        { id: 3, name: 'ມາດຕາ 8: ການຂັບຂີ່ລົດໂດຍບໍ່ມີເອກະສານຄົບຖ້ວນ', price: 30000 }
                    ]
                },
                {
                    id: 103,
                    timestamp: weekAgo.toISOString().slice(0, 19).replace('T', ' '),
                    vehicleType: 'ລົດຈັກ',
                    complaintDetails: 'ລາຍລະອຽດສຳລັບໃບປັບໄໝ #103 - ອາທິດແລ້ວ',
                    finesCode: '103C',
                    articles: [
                        { id: 4, name: 'ມາດຕາ 31: ການຂັບຂີ່ລົດຈັກບໍ່ໃສ່ໝວກກັນກະທົບ', price: 20000 },
                        { id: 5, name: 'ມາດຕາ 20: ການຂັບຂີ່ລົດລ່ວງໄຟສັນຍານຈະລາຈອນ, ລະເມີດ ປ້າຍຫ້າມ,ປ້າຍກຳນົດ ຫຼື ປ້າຍບັງຄັບ', price: 80000 }
                    ]
                },
                {
                    id: 104,
                    timestamp: today.toISOString().slice(0, 19).replace('T', ' '),
                    vehicleType: 'ລົດຈັກ',
                    complaintDetails: 'ລາຍລະອຽດສຳລັບໃບປັບໄໝ #104 - ມື້ນີ້ (ອີກລາຍການ)',
                    finesCode: '104D',
                    articles: [
                        { id: 6, name: 'ມາດຕາ 39: ການຂັບຂີ່ລົດບໍ່ໃສ່ສາຍຮັດນິລະໄພ', price: 40000 }
                    ]
                },
            ]
        };
        fineReports.value = response.data;
        // const response = await axios.get(API_URL)
        // fineReports.value = response.data
    } catch (err) {
        error.value = 'Failed to fetch fine reports.'
        console.error(err)
    } finally {
        loading.value = false
    }
}

// Fetch data when the component is mounted (moved to combined onMounted above)

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
        'ມາດຕາ 37: ການບັນທຸກສິນຄ້າ ્ຼື ເຄື່ອງຂອງ ນໍ້າໜັກເກີນ',
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

// Calculate total price of selected articles
const totalPrice = computed(() => {
    if (!selectedFine.value) return 0;
    return selectedFine.value.articles.reduce((total: number, article: any) => {
        return total + (article.price || 0)
    }, 0)
})

// Format price to Lao Kip
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('lo-LA').format(price) + ' ກີບ'
}

const getViolationTypeForArticle = (articleName: string) => {
    for (const [violationType, articlesList] of Object.entries(articlesByViolationType)) {
        if (articlesList.includes(articleName)) {
            return violationType
        }
    }
    return 'N/A'
}

// Add filtering methods
const isToday = (dateString: string) => {
    const today = new Date()
    const reportDate = new Date(dateString)

    return today.getFullYear() === reportDate.getFullYear() &&
        today.getMonth() === reportDate.getMonth() &&
        today.getDate() === reportDate.getDate()
}

const isOlderThanToday = (dateString: string) => {
    const today = new Date()
    const reportDate = new Date(dateString)

    today.setHours(0, 0, 0, 0)
    reportDate.setHours(0, 0, 0, 0)

    return reportDate < today
}

// Filter methods
const showTodayReports = () => {
    activeFilter.value = 'today'
    closeSummaryModal() // Close modal when changing filter
}

const showOlderReports = () => {
    activeFilter.value = 'older'
    closeSummaryModal() // Close modal when changing filter
}

const showAllReports = () => {
    activeFilter.value = 'all'
    closeSummaryModal() // Close modal when changing filter
}

// Computed property for filtered reports
const filteredFineReports = computed(() => {
    if (activeFilter.value === 'today') {
        return fineReports.value.filter(report => isToday(report.timestamp))
    } else if (activeFilter.value === 'older') {
        return fineReports.value.filter(report => isOlderThanToday(report.timestamp))
    }
    return fineReports.value // Show all reports
})

// Computed properties for counts
const todayCount = computed(() => {
    return fineReports.value.filter(report => isToday(report.timestamp)).length
})

const olderCount = computed(() => {
    return fineReports.value.filter(report => isOlderThanToday(report.timestamp)).length
})
</script>

<template>
    <div class="bg-gray-300 text-black p-6">
        <h2 class="text-xl font-bold mb-4">ລາຍການໃບປັບໄໝຫຼ້າສຸດ</h2>

        <!-- Filter Buttons -->
        <div class="mb-6 flex flex-wrap gap-3">
            <button @click="showAllReports" :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
            ]">
                ສະແດງທັງໝົດ ({{ fineReports.length }})
            </button>
            <button @click="showTodayReports" :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                activeFilter === 'today'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
            ]">
                ມື້ນີ້ ({{ todayCount }})
            </button>
            <button @click="showOlderReports" :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                activeFilter === 'older'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
            ]">
                ມື້ກ່ອນໆ ({{ olderCount }})
            </button>
        </div>

        <!-- Loading and Error States for List -->
        <div v-if="loading" class="text-center text-gray-500 py-4">
            <p>Loading fine reports...</p>
        </div>
        <div v-if="error" class="text-center text-red-500 py-4">
            <p>{{ error }}</p>
        </div>

        <ul v-if="!loading && !error" class="space-y-3">
            <li v-for="fine in filteredFineReports" :key="fine.id"
                class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <span>Fine issued at: {{ fine.timestamp }} (ID: {{ fine.id }})</span>
                <button @click="toggleSummary(fine)"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {{ selectedFine && selectedFine.id === fine.id ? 'ປິດ' : 'ເບິ່ງລາຍລະອຽດ' }}
                </button>
            </li>
        </ul>
        <div v-if="!loading && filteredFineReports.length === 0 && fineReports.length > 0"
            class="text-center text-gray-500 py-4">
            <p v-if="activeFilter === 'today'">ບໍ່ມີລາຍການປັບໄໝສຳລັບມື້ນີ້.</p>
            <p v-else-if="activeFilter === 'older'">ບໍ່ມີລາຍການປັບໄໝສຳລັບມື້ກ່ອນໆ.</p>
            <p v-else>No fine reports found.</p>
        </div>
        <div v-if="!loading && fineReports.length === 0" class="text-center text-gray-500 py-4">
            <p>No fine reports found.</p>
        </div>
    </div>

    <!-- Modal Overlay -->
    <div v-if="selectedFine"
        class="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click="closeSummaryModal">
        <div class="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
            <!-- Modal Header -->
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-black">ລາຍງານການປັບໄໝ</h1>
                <button @click="closeSummaryModal" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
                <!-- Summary Table -->
                <div class="bg-gray-50 rounded-lg shadow overflow-hidden mb-6">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        ລຳດັບ</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        ປະເພດໝວດ</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        ປະເພດມາດຕາ</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ຫົວຂໍ້</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ວັນເດືອນປີ</th>
                                    <th
                                        class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        ລາຄາ</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-if="!selectedFine.articles || selectedFine.articles.length === 0">
                                    <td colspan="4" class="px-4 py-8 text-center text-gray-500">
                                        No articles for this fine.
                                    </td>
                                </tr>
                                <tr v-else v-for="(article, index) in selectedFine.articles" :key="article.id"
                                    class="hover:bg-gray-50">
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ getViolationTypeForArticle(article.name) }}
                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-900">
                                        <div class="max-w-xs truncate" :title="article.name">{{ article.name }}</div>
                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-900">

                                    </td>
                                    <td class="px-4 py-4 text-sm text-gray-900">
                                        28/6/2025
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                        {{ formatPrice(article.price || 0) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Summary Details and Complaint Form -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Summary Details -->
                    <div class="bg-gray-50 p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold mb-4 text-black">ສະຫຼຸບລາຍການ</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-black">ຈຳນວນຂໍ້ຫາ:</span>
                                <span class="text-black font-semibold">{{ selectedFine.articles.length }} ລາຍການ</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-black">ລວມເປັນເງິນ:</span>
                                <span class="font-bold text-lg text-blue-600">{{ formatPrice(totalPrice) }}</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-black">ລະຫັດໃບປັບ:</span>
                                <span class="text-blue-600 font-semibold">{{ selectedFine.finesCode }}</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-black">ປະເພດລົດ:</span>
                                <span class="text-black font-semibold">
                                    {{ selectedFine.vehicleType || 'ບໍ່ໄດ້ເລືອກ' }}
                                </span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-black">ວັນທີ:</span>
                                <span class="text-black font-semibold">{{ selectedFine.timestamp }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Complaint Details -->
                    <div class="bg-gray-50 p-6 rounded-lg shadow">
                        <h3 class="text-lg font-semibold mb-4 text-black">ລາຍລະອຽດການຮ້ອງທຸກ</h3>
                        <textarea v-model="selectedFine.complaintDetails"
                            class="text-black w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="ລາຍລະອຽດ..." readonly></textarea>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="mt-6 flex justify-end space-x-3">
                    <button @click="closeSummaryModal"
                        class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        ປິດ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Pure Tailwind CSS styling */
</style>