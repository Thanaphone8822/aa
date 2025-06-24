<script setup lang="ts">
import { ref } from 'vue'

// Officer Information
const officerInfo = ref({
    badgeNumber: 'PKS-2024-001',
    name: 'ທ້າວ ສົມພອນ ຈັນທະວົງ',
    station: 'ສະຖານີຕຳຫຼວດຈະລາຈອນ ວຽງຈັນ'
})

// Citation Form Data
const citation = ref({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5),
    location: '',
    driverName: '',
    licenseNumber: '',
    phoneNumber: '',
    vehicleType: '',
    licensePlate: '',
    violationType: '',
    fineAmount: 0,
    notes: ''
})

// Violation Types
const violationTypes = ref([
    { code: 'V001', name: 'ຂັບໂດຍບໍ່ມີໃບຂັບຂີ່', fine: 500000 },
    { code: 'V002', name: 'ຂັບເກີນຄວາມໄວ', fine: 200000 },
    { code: 'V003', name: 'ບໍ່ໃສ່ເຂັມຂັດນິລະໄພ', fine: 100000 },
    { code: 'V004', name: 'ຂັບລົດໃນເວລາເມົາເຫຼົ້າ', fine: 1000000 },
    { code: 'V005', name: 'ຜ່ານສັນຍານແດງ', fine: 300000 },
    { code: 'V006', name: 'ໃຊ້ໂທລະສັບຂະນະຂັບ', fine: 150000 }
])

// Update fine amount when violation changes
const updateViolation = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const violation = violationTypes.value.find(v => v.code === target.value)
    if (violation) {
        citation.value.violationType = violation.name
        citation.value.fineAmount = violation.fine
    }
}

// Format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lo-LA').format(amount) + ' ກີບ'
}

// Issue Citation
const issueCitation = () => {
    if (!citation.value.driverName || !citation.value.violationType) {
        alert('ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈຳເປັນ')
        return
    }
    alert('ອອກໃບປັບສຳເລັດແລ້ວ!')
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-6 bg-white">
        <!-- Header -->
        <div class="bg-red-600 text-white p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold font-lao">ລະບົບອອກໃບປັບ</h1>
                    <p class="text-sm">Traffic Citation System</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold">{{ officerInfo.name }}</p>
                    <p class="text-sm">{{ officerInfo.badgeNumber }}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-4">
                <!-- Citation Details -->
                <div class="bg-gray-100 p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-3 text-gray-800 font-lao">ຂໍ້ມູນໃບປັບ</h2>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ວັນທີ</label>
                            <input v-model="citation.date" type="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ເວລາ</label>
                            <input v-model="citation.time" type="time" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="block text-sm font-medium text-gray-700 font-lao">ສະຖານທີ່</label>
                        <input v-model="citation.location" type="text" placeholder="ເຊັ່ນ: ຖ.ລັງຊ້າງ, ໜ້າໂຮງຮຽນ..." class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <!-- Driver Information -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-3 text-gray-800 font-lao">ຂໍ້ມູນຜູ້ຂັບ</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ຊື່ ແລະ ນາມສະກຸນ *</label>
                            <input v-model="citation.driverName" type="text" placeholder="ຊື່ ແລະ ນາມສະກຸນ" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ເລກໃບຂັບຂີ່</label>
                            <input v-model="citation.licenseNumber" type="text" placeholder="ລຊ/ມວ xxxxxxx" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ເບີໂທ</label>
                            <input v-model="citation.phoneNumber" type="tel" placeholder="020 xxxx xxxx" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>

                <!-- Vehicle Information -->
                <div class="bg-green-50 p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-3 text-gray-800 font-lao">ຂໍ້ມູນລົດ</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ປະເພດລົດ</label>
                            <select v-model="citation.vehicleType" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">ເລືອກປະເພດລົດ</option>
                                <option value="ລົດຈັກ">ລົດຈັກ</option>
                                <option value="ລົດຍົນ">ລົດຍົນ</option>
                                <option value="ລົດບັນທຸກ">ລົດບັນທຸກ</option>
                                <option value="ລົດຕູ້">ລົດຕູ້</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ທະບຽນລົດ</label>
                            <input v-model="citation.licensePlate" type="text" placeholder="ກ 1234" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
                <!-- Violation Details -->
                <div class="bg-red-50 p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-3 text-gray-800 font-lao">ລາຍລະອຽດການລະເມີດ</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ປະເພດການລະເມີດ *</label>
                            <select @change="updateViolation" class="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">ເລືອກປະເພດການລະເມີດ</option>
                                <option v-for="violation in violationTypes" :key="violation.code" :value="violation.code">
                                    {{ violation.name }} ({{ formatCurrency(violation.fine) }})
                                </option>
                            </select>
                        </div>
                        <div v-if="citation.violationType">
                            <div class="bg-white p-3 rounded border-2 border-red-200">
                                <p class="font-semibold text-gray-800">{{ citation.violationType }}</p>
                                <p class="text-lg font-bold text-red-600">ຄ່າປັບ: {{ formatCurrency(citation.fineAmount) }}</p>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 font-lao">ໝາຍເຫດ</label>
                            <textarea v-model="citation.notes" placeholder="ໝາຍເຫດເພີ່ມເຕີມ..." rows="4" class="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Citation Summary -->
                <div class="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
                    <h2 class="text-lg font-bold mb-3 text-gray-800 font-lao">ສະຫຼຸບໃບປັບ</h2>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="font-lao">ຜູ້ຂັບ:</span>
                            <span>{{ citation.driverName || 'ບໍ່ລະບຸ' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-lao">ທະບຽນລົດ:</span>
                            <span>{{ citation.licensePlate || 'ບໍ່ລະບຸ' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-lao">ການລະເມີດ:</span>
                            <span>{{ citation.violationType || 'ບໍ່ລະບຸ' }}</span>
                        </div>
                        <hr class="my-2">
                        <div class="flex justify-between font-bold text-lg">
                            <span class="font-lao">ຄ່າປັບທັງໝົດ:</span>
                            <span class="text-red-600">{{ formatCurrency(citation.fineAmount) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                    <button @click="issueCitation" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors font-lao">
                        🚔 ອອກໃບປັບ
                    </button>
                    <button @click="citation = { date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5), location: '', driverName: '', licenseNumber: '', phoneNumber: '', vehicleType: '', licensePlate: '', violationType: '', fineAmount: 0, notes: '' }" 
                            class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors font-lao">
                        🗑️ ລ້າງຂໍ້ມູນ
                    </button>
                </div>
            </div>
        </div>

        <!-- Fine Amount Display -->
        <div v-if="citation.fineAmount > 0" class="mt-6 bg-red-100 border-2 border-red-300 p-6 rounded-lg text-center">
            <h3 class="text-2xl font-bold text-red-700 font-lao">ຄ່າປັບທັງໝົດ</h3>
            <p class="text-4xl font-bold text-red-800 mt-2">{{ formatCurrency(citation.fineAmount) }}</p>
            <p class="text-sm text-gray-600 mt-2 font-lao">ກະລຸນາຊຳລະພາຍໃນ 30 ວັນ</p>
        </div>
    </div>
</template>

<style scoped>
/* Pure Tailwind CSS styling */
</style>