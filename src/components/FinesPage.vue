<script setup lang="ts">
import Licence_card from '@/components/Licence_card.vue'
import Fineing from './Fineing.vue'
import Searchicon from './icons/Searchicon.vue'
import { ref } from 'vue'

const activeComponent = ref('') // Default to an empty string

// Function to handle row click
const handleRowClick = (component: string) => {
    activeComponent.value = component // Set the active component
}

// Function to handle confirm button - only works when license card is showing
const handleConfirmClick = () => {
    if (activeComponent.value === 'license') {
        activeComponent.value = 'Fineing' // Show Fineing component
    }
}

// Function to remove/hide the license card
const removeLicenseCard = () => {
    activeComponent.value = '' // Clear the active component to hide the card
    // Also clear the form inputs
    licenseCodeNw.value = ''
    licenseCodeKs.value = ''
}

// Form data
const licenseCodeNw = ref('')
const licenseCodeKs = ref('')
</script>

<template>
    <div class="space-y-6">
        <div class="flex gap-6 mb-6">
            <!-- License Verification Box -->
            <div class="bg-gray-300 p-6 rounded-lg flex-1">
                <h2 class="text-xl font-bold mb-4 text-black font-lao">ປ້ອນລະຫັດໃບຂັບຂີ່</h2>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <label class="text-lg w-24 text-black font-lao">ລະຫັດ ຂສ</label>
                        <input 
                            v-model="licenseCodeNw"
                            type="text" 
                            class="bg-white text-black px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1" 
                            placeholder=""
                        />
                    </div>
                    <div class="flex items-center gap-4">
                        <label class="text-lg w-24 text-black font-lao">ລະຫັດ ນວ</label>
                        <input 
                            v-model="licenseCodeKs"
                            type="text" 
                            class="bg-white text-black px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1" 
                            placeholder=""
                        />
                    </div>
                    <div class="flex justify-center">
                        <button 
                            @click="handleRowClick('license')" 
                            class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium cursor-pointer transition-colors text-sm font-lao flex">
                            ຄົ້ນຫາ <Searchicon />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Action Buttons Box -->
            <div class="bg-gray-300 p-6 rounded-lg w-80 flex flex-col justify-center items-center space-y-4">
                <button 
                    @click="removeLicenseCard"
                    class="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded font-medium cursor-pointer transition-colors w-full text-lg font-lao">
                    ເອົາບັດອອກ
                </button>
                <button 
                @click="handleConfirmClick" 
                class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium cursor-pointer transition-colors w-full text-lg font-lao"
                :class="{ 'opacity-50 cursor-not-allowed': activeComponent !== 'license' }"
                :disabled="activeComponent !== 'license'">
                ຢືນຢັນ ➔</button>
            </div>
        </div>

        <!-- License Card Display -->
        <div class="bg-gray-300 p-6 rounded-lg mb-6">
            <div v-if="activeComponent === 'license' || activeComponent === 'Fineing'" class="flex justify-center">
                <Licence_card />
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