<script setup lang="ts">
import Licence_card from '@/components/Licence_card.vue'
import Fineing from './Fineing.vue'
import Searchicon from './icons/Searchicon.vue'
import PCLicenceCard from '@/components/p_c_licencec.vue'
import { ref } from 'vue'

const activeComponent = ref('')
const searchedCard = ref(null)
const isOffender = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const licenseCodeNw = ref('')
const licenseCodeKs = ref('')

// Function to handle confirm button - only works when license card is showing
const handleConfirmClick = async () => {
    if (activeComponent.value !== 'license' || !isOffender.value) return;
    errorMessage.value = '';
    try {
        const fineRes = await fetch('http://localhost:3000/api/fine-create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ nv: licenseCodeNw.value, ks: licenseCodeKs.value })
        });
        const contentType = fineRes.headers.get('content-type');
        let fineData = null;
        if (contentType && contentType.includes('application/json')) {
            fineData = await fineRes.json();
        } else {
            const text = await fineRes.text();
            throw new Error('Non-JSON response: ' + text);
        }
        if (fineRes.ok && fineData.success) {
            activeComponent.value = 'Fineing'; // Show Fineing component
            errorMessage.value = '';
            successMessage.value = 'ສ້າງໃບປັບສຳເລັດ!';
        } else {
            errorMessage.value = fineData.message || 'Failed to create fine';
            successMessage.value = '';
        }
    } catch (err: any) {
        errorMessage.value = err?.message || 'Server error';
        successMessage.value = '';
    }
}

// Function to remove/hide the license card
const removeLicenseCard = () => {
    activeComponent.value = '' // Clear the active component to hide the card
    // Also clear the form inputs
    licenseCodeNw.value = ''
    licenseCodeKs.value = ''
    successMessage.value = ''
}

// Function to check if the offender exists
const checkOffender = async () => {
    isOffender.value = false
    errorMessage.value = ''
    searchedCard.value = null
    if (!licenseCodeNw.value || !licenseCodeKs.value) {
        errorMessage.value = 'ກະລຸນາປ້ອນ NV ແລະ KS'
        return
    }
    try {
        const response = await fetch(`http://localhost:3000/api/user/check?nv=${encodeURIComponent(licenseCodeNw.value)}&ks=${encodeURIComponent(licenseCodeKs.value)}`)
        const data = await response.json()
        if (response.ok && data.code === 10) {
            isOffender.value = true
            errorMessage.value = ''
            searchedCard.value = data.data.card // <-- store card data
        } else {
            isOffender.value = false
            searchedCard.value = null
        }
    } catch (err) {
        isOffender.value = false
        errorMessage.value = 'Server error'
        searchedCard.value = null
    }
}

// Function to handle row click
const handleRowClick = async (component: string) => {
    // Save cookies
    document.cookie = `licenseCodeNw=${licenseCodeNw.value}; path=/`;
    document.cookie = `licenseCodeKs=${licenseCodeKs.value}; path=/`;

    await checkOffender()
    if (isOffender.value) {
        activeComponent.value = component; // Set the active component
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex gap-6 mb-6">
            <!-- License Verification Box -->
            <div class="bg-gray-300 p-6 rounded-lg flex-1">
                <h2 class="text-xl font-bold mb-4 text-black font-lao">ປ້ອນລະຫັດໃບຂັບຂີ່</h2>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <label class="text-lg w-24 text-black font-lao">ລະຫັດ ນວ</label>
                        <input v-model="licenseCodeNw" type="text"
                            class="bg-white text-black px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="text-lg w-24 text-black font-lao">ລະຫັດ ຂສ</label>
                        <input v-model="licenseCodeKs" type="text"
                            class="bg-white text-black px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="" />
                    </div>
                    <div class="flex justify-center">
                        <button @click="handleRowClick('license')"
                            class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium cursor-pointer transition-colors text-sm font-lao flex"
                            :class="{ 'opacity-50 cursor-not-allowed': !licenseCodeNw || !licenseCodeKs }"
                            :disabled="!licenseCodeNw || !licenseCodeKs">
                            ຄົ້ນຫາ
                            <Searchicon />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Action Buttons Box -->
            <div class="bg-gray-300 p-6 rounded-lg w-80 flex flex-col justify-center items-center space-y-4">
                <button @click="removeLicenseCard"
                    class="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded font-medium cursor-pointer transition-colors w-full text-lg font-lao">
                    ເອົາບັດອອກ
                </button>
                <button @click="handleConfirmClick"
                    class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium cursor-pointer transition-colors w-full text-lg font-lao"
                    :class="{ 'opacity-50 cursor-not-allowed': !isOffender || activeComponent !== 'license' }"
                    :disabled="!isOffender || activeComponent !== 'license'">
                    ຢືນຢັນ ➔
                </button>
            </div>
        </div>

        <!-- Error Message Display -->
        <div v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-green-600 text-center mt-2 font-bold">{{ successMessage }}</div>

        <!-- License Card Display -->
        <div class="bg-gray-300 p-6 rounded-lg mb-6">
            <div v-if="(activeComponent === 'license' || activeComponent === 'Fineing') && searchedCard"
                class="flex justify-center">
                <PCLicenceCard :card="searchedCard" />
            </div>
            <div v-else class="flex justify-center items-center h-64 text-gray-500">
                <p class="text-xl font-lao">ກະລຸນາປ້ອນລະຫັດໃບຂັບຂີ່ແລ້ວຄົ້ນຫາ</p>
            </div>
        </div>

        <!-- Fineing Component Display -->
        <div v-if="activeComponent === 'Fineing'" class="bg-gray-300 p-6 rounded-lg mb-6">
            <Fineing />
        </div>
    </div>
</template>

<style scoped>
/* Pure Tailwind CSS - No custom styles */
</style>