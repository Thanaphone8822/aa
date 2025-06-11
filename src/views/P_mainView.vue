<script setup lang="ts">
import P_card from '@/components/P_card.vue'
import Rules from '@/components/Rules.vue'
import { ref } from 'vue'

const showCard = ref(false)
const showRules = ref(false)
const inputNV = ref('')
const inputKS = ref('')
const loading = ref(false)
const errorMsg = ref('')
const showModal = ref(false)

async function checkDatabase() {
    loading.value = true
    errorMsg.value = ''
    showCard.value = false
    try {
        const res = await fetch(`http://localhost:3000/api/card/check?nv=${encodeURIComponent(inputNV.value)}&ks=${encodeURIComponent(inputKS.value)}`)
        const data = await res.json()
        if (data.code === 10 && data.data) {
            showCard.value = true
            errorMsg.value = ''
        } else {
            showCard.value = false
            showModal.value = true
        }
    } catch {
        errorMsg.value = 'Error connecting to server.'
        showCard.value = false
        showModal.value = true
    } finally {
        loading.value = false
    }
}
</script>

<template>
  <div class="flex min-h-screen bg-gradient-to-br from-blue-950 to-gray-900 text-blue-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-950/90 backdrop-blur shadow-xl p-6 flex flex-col rounded-tr-3xl rounded-br-3xl border-r border-blue-900">
      <div class="mb-8 flex items-center gap-3">
        <span class="text-3xl font-extrabold text-blue-400">🚦</span>
        <span class="text-2xl font-bold text-blue-200 tracking-wide">Police Portal</span>
      </div>
      <ul class="menu menu-lg rounded-box text-blue-100 font-medium space-y-2">
        <li><a class="hover:bg-blue-900 transition rounded-lg px-4 py-2" @click="showRules = false; showCard = false">ໜ້າຫຼັກ</a></li>
        <li><a class="hover:bg-blue-900 transition rounded-lg px-4 py-2" @click="showRules = false; showCard = false">ການປັບໄໝ</a></li>
        <li><a class="hover:bg-blue-900 transition rounded-lg px-4 py-2" @click="showRules = true; showCard = false">ກົດລະບຽບຈະລາຈອນ</a></li>
      </ul>
      <div class="mt-auto pt-8 text-xs text-blue-700">© 2025 Police Portal</div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col bg-blue-950/80">
      <!-- Navbar -->
      <div class="navbar bg-blue-950 shadow-md rounded-b-2xl px-8 py-3 flex items-center justify-between text-blue-100">
        <div class="flex-1 flex justify-center">
          <span class="text-2xl font-bold text-blue-200 tracking-wide">ລະບົບຈັດການ</span>
        </div>
        <div class="flex gap-4 items-center">
          <input type="text" placeholder="Search" class="input input-bordered w-32 md:w-56 bg-blue-900 text-blue-100 border-blue-700 placeholder-blue-400 focus:ring-2 focus:ring-blue-400 transition" />
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-12 rounded-full ring ring-blue-700 ring-offset-2">
                <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-blue-950 rounded-box z-10 mt-3 w-52 p-2 shadow text-blue-100">
              <li><a class="justify-between">Profile <span class="badge bg-blue-600 text-white">New</span></a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row mt-8 gap-8 w-full px-6">
        <template v-if="!showRules">
          <!-- Card Search Box -->
          <div class="bg-blue-900/90 flex-1 min-w-[300px] rounded-3xl p-8 mb-4 lg:mb-0 shadow-lg border border-blue-800">
            <div class="mb-6">
              <span class="font-bold text-2xl text-blue-200">ປ້ອນລະຫັດໃບຂັບຂີ່:</span>
            </div>
            <div class="overflow-x-auto">
              <table class="table w-full">
                <tbody>
                  <tr>
                    <td class="font-semibold text-lg text-blue-300 w-32">ນວ:</td>
                    <td>
                      <input v-model="inputNV" type="text" placeholder="ປ້ອນລະຫັດນວ"
                        class="input input-bordered w-full bg-blue-950 text-blue-100 border-blue-700 placeholder-blue-400 focus:ring-2 focus:ring-blue-400 transition" />
                    </td>
                  </tr>
                  <tr>
                    <td class="font-semibold text-lg text-blue-300 w-32">ຂສ:</td>
                    <td>
                      <input v-model="inputKS" type="text" placeholder="ປ້ອນລະຫັດຂສ"
                        class="input input-bordered w-full bg-blue-950 text-blue-100 border-blue-700 placeholder-blue-400 focus:ring-2 focus:ring-blue-400 transition" />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="pt-6">
                      <button @click="checkDatabase" :disabled="!inputNV || !inputKS || loading"
                        class="btn btn-primary w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white text-lg shadow hover:scale-105 transition disabled:opacity-50">
                        <span v-if="loading">Checking...</span>
                        <span v-else>Search</span>
                      </button>
                      <div v-if="errorMsg" class="text-red-400 mt-2">{{ errorMsg }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Action Buttons Box -->
          <div class="bg-blue-900/90 flex-1 min-w-[300px] rounded-3xl flex flex-col md:flex-row items-center justify-center gap-4 p-8 shadow-lg border border-blue-800">
            <button @click="inputNV = ''; inputKS = ''; showCard = false"
              class="btn btn-error font-normal w-full md:w-[150px] rounded-xl bg-gradient-to-r from-red-500 to-red-800 border-none text-white text-lg shadow hover:scale-105 transition">
              ຍົກເລີກບັດ
            </button>
            <button
              class="btn btn-primary font-normal w-full md:w-[150px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white text-lg shadow hover:scale-105 transition">
              ຢືນຢັນ
            </button>
          </div>
        </template>
        <div v-else class="w-full animate-fade-in">
          <Rules />
        </div>
      </div>

      <!-- Licence Card Section -->
      <div class="bg-blue-900/90 rounded-3xl flex items-center justify-center mt-8 w-full px-6 py-8 text-blue-100 shadow-lg border border-blue-800">
        <div class="w-full max-w-xs" v-if="showCard && !showRules">
          <P_card />
        </div>
      </div>
    </div>

    <!-- Modal for Not Found -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-blue-950 rounded-2xl shadow-lg p-8 text-center border border-blue-800 max-w-xs w-full">
        <div class="text-3xl mb-4 text-red-400">⚠️</div>
        <div class="text-xl font-bold mb-2 text-blue-100">ບໍ່ພົບຂໍ້ມູນ</div>
        <div class="mb-6 text-blue-200">ບໍ່ພົບຂໍ້ມູນໃນຖານຂໍ້ມູນ</div>
        <button @click="showModal = false"
          class="btn btn-primary w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white text-lg shadow hover:scale-105 transition">
          ປິດ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in { animation: fade-in 0.5s; }
</style>