<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import trashicon from './icons/trashicon.vue'

const props = defineProps<{ fineId?: number }>()

// Form data
const vehicleType = ref<string>('')
const violationTypes = ref<string[]>([])
const articles = ref<string[]>([])
const selectedViolationType = ref<string>('')
const selectedRuleTypes = ref<string[]>([])

// Summary form data
const complaintDetails = ref('')
const showSummarySection = ref(false)
const summaryFinalized = ref(false)

// Finalized summary data
const finalizedItems = ref<{
  vehicleType: string
  articles: string[]
  timestamp: string
}[]>([])
const currentFinalizedArticles = ref<string[]>([])
const currentFinalizedVehicleType = ref<string>('')

// --- Dynamic data from API ---
const decrees = ref<any[]>([])
const latestFineId = ref<number | null>(null)

// Fetch all decrees from /api/fineing/decrees (Fineing.ts backend)
const fetchDecrees = async () => {
  try {
    const res = await fetch('/api/fineing/decrees')
    if (!res.ok) throw new Error('Failed to fetch decrees')
    const data = await res.json()
    if (data.code === 10 && Array.isArray(data.data)) {
      decrees.value = data.data
    } else {
      decrees.value = []
      console.error('No decrees found')
    }
  } catch (err) {
    console.error('Error fetching decrees:', err)
  }
}

// Fetch latest fine ID from /api/fineing/latest
const fetchLatestFineId = async () => {
  try {
    const res = await fetch('/api/fineing/latest')
    if (!res.ok) throw new Error('Failed to fetch latest fine ID')
    const data = await res.json()
    if (data && data.id) {
      latestFineId.value = data.id
    }
  } catch (err) {
    console.error('Error fetching latest fine ID:', err)
  }
}

// Fetch all data on mount
onMounted(() => {
  fetchDecrees()
  fetchLatestFineId()
})

// --- Frontend-only dropdowns using decrees ---
const vehicleOptions = computed(() => {
  const set = new Set<string>()
  decrees.value.forEach(d => {
    if (d.cartype_name) set.add(d.cartype_name)
  })
  return Array.from(set)
})

const muadOptions = computed(() => {
  if (!vehicleType.value) return [];
  // Unique muad for selected vehicle type
  const filtered = decrees.value.filter(d => d.cartype_name === vehicleType.value);
  const set = new Map();
  filtered.forEach(d => {
    if (d.muad_name && !set.has(d.muad_name)) {
      set.set(d.muad_name, {
        muad_name: d.muad_name,
        muad_no: d.muad_no,
        muad_id: d.muad_id || d.muad_no, // fallback if no id
        cartypes_id: d.cartypes_id
      });
    }
  });
  return Array.from(set.values());
});

const mardtarOptions = computed(() => {
  if (!vehicleType.value || violationTypes.value.length === 0) return [];
  // Filter decrees by selected vehicle type and violation types
  const filtered = decrees.value.filter(d =>
    d.cartype_name === vehicleType.value &&
    violationTypes.value.includes(d.muad_name)
  );
  const set = new Map();
  filtered.forEach(d => {
    if (d.mardtar_name && !set.has(d.mardtar_name)) {
      set.set(d.mardtar_name, {
        mardtar_name: d.mardtar_name,
        mardtar_no: d.mardtar_no,
        mardtar_id: d.mardtar_id || d.mardtar_no, // fallback if no id
        muad_name: d.muad_name
      });
    }
  });
  return Array.from(set.values());
});

const ruleTypeOptions = computed(() => {
  if (!vehicleType.value || violationTypes.value.length === 0 || articles.value.length === 0) return [];
  // Filter decrees by selected vehicle type, violation types, and articles
  const filtered = decrees.value.filter(d =>
    d.cartype_name === vehicleType.value &&
    violationTypes.value.includes(d.muad_name) &&
    articles.value.includes(d.mardtar_name)
  );
  // Unique rule types
  const set = new Set();
  filtered.forEach(d => {
    if (d.rule_type) set.add(d.rule_type);
  });
  return Array.from(set);
})

// Check if any violation type is selected
const hasSelectedViolations = computed(() => violationTypes.value.length > 0)

// Update availableViolationOptions to use muadOptions
const availableViolationOptions = computed(() => {
  return muadOptions.value.filter(option => !violationTypes.value.includes(option.muad_name))
})

// Auto-show summary section when finalized articles exist
const shouldShowSummary = computed(() => currentFinalizedArticles.value.length > 0)

// Calculate total price of currently selected articles (for fineing section)
const selectedTotalPrice = computed(() => {
  // If multiple rule_types are selected, sum all prices for each article and rule_type combination
  if (selectedRuleTypes.value.length > 1) {
    return articles.value.reduce((total, article) => {
      return total + selectedRuleTypes.value.reduce((sum, rule) => {
        const decree = decrees.value.find(d => d.mardtar_name === article && d.rule_type === rule)
        return sum + (decree ? Number(decree.price) : 0)
      }, 0)
    }, 0)
  } else {
    // Only sum articles that match selected rule types
    return articles.value.reduce((total, article) => {
      const decree = decrees.value.find(d => d.mardtar_name === article && selectedRuleTypes.value.includes(d.rule_type))
      return total + (decree ? Number(decree.price) : 0)
    }, 0)
  }
})

// Article prices for summary and fineing section
const articlePrices = computed(() => {
  // Map each finalized article to its total price (sum of all rule types for that article)
  const map: { [key: string]: number } = {}
  currentFinalizedArticles.value.forEach(article => {
    // Find all decrees for this article
    const decreesForArticle = decrees.value.filter(d => d.mardtar_name === article)
    // Sum all prices for all rule types for this article
    map[article] = decreesForArticle.reduce((sum, d) => sum + (Number(d.price) || 0), 0)
  })
  return map
})

// Calculate total price of finalized articles (for summary section)
const totalPrice = computed(() => {
  return currentFinalizedArticles.value.reduce((total, article) => {
    return total + (articlePrices.value[article] || 0)
  }, 0)
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

// Watch for articles changes and clear selected rule types only if all articles are removed
watch(articles, (newVal) => {
  if (newVal.length === 0) {
    selectedRuleTypes.value = []
  }
}, { deep: true })

const handleAddMore = () => {
  // Only add if there are selected articles
  if (articles.value.length > 0 && vehicleType.value) {
    // Add to finalized items
    finalizedItems.value.push({
      vehicleType: vehicleType.value,
      articles: [...articles.value],
      timestamp: new Date().toISOString()
    })

    // Update current finalized data for summary display
    currentFinalizedArticles.value = [...currentFinalizedArticles.value, ...articles.value]
    currentFinalizedVehicleType.value = vehicleType.value

    // Clear form after adding
    vehicleType.value = ''
    violationTypes.value = []
    selectedViolationType.value = ''
    articles.value = []

    console.log('Items added to summary:', {
      finalizedItems: finalizedItems.value,
      currentFinalizedArticles: currentFinalizedArticles.value
    })
  } else {
    console.log('Please select vehicle type and articles first')
  }
}

const handleClear = () => {
  vehicleType.value = ''
  violationTypes.value = []
  selectedViolationType.value = ''
  articles.value = []
  showSummarySection.value = false
  summaryFinalized.value = false

  // Clear finalized data
  finalizedItems.value = []
  currentFinalizedArticles.value = []
  currentFinalizedVehicleType.value = ''

  console.log('Form and summary cleared')
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

// Replace generateFinesCode to use fineId if available
const generateFinesCode = () => {
  if (props.fineId) return String(props.fineId)
  if (latestFineId.value) return String(latestFineId.value)
  return ''
}

// Update getViolationTypeForArticle to use decrees only
const getViolationTypeForArticle = (article: string) => {
  const decree = decrees.value.find(d => d.mardtar_name === article)
  return decree ? decree.muad_name : 'N/A'
}

// Add this helper function to get decree for an article
function getDecreeForArticle(article: string, ruleTypes?: string[]) {
  const decreesArr = Array.isArray(decrees.value) ? decrees.value : [];
  if (ruleTypes && ruleTypes.length > 0) {
    return decreesArr.find(d => d.mardtar_name === article && ruleTypes.includes(d.rule_type)) || {};
  }
  return decreesArr.find(d => d.mardtar_name === article) || {};
}

// Helper: get valid rule types for an article from decrees and selectedRuleTypes
function getValidRuleTypesForArticle(article: string) {
  const decreesArr = Array.isArray(decrees.value) ? decrees.value : [];
  return selectedRuleTypes.value.filter(ruleType =>
    decreesArr.some(d => d.mardtar_name === article && d.rule_type === ruleType)
  );
}

const editArticle = (article: string) => {
  console.log('Editing article:', article)
  // Add edit functionality here if needed
}

const removeArticle = (articleToRemove: string) => {
  const index = currentFinalizedArticles.value.indexOf(articleToRemove)
  if (index > -1) {
    currentFinalizedArticles.value.splice(index, 1)

    // Also remove from finalized items
    finalizedItems.value = finalizedItems.value.map(item => ({
      ...item,
      articles: item.articles.filter(article => article !== articleToRemove)
    })).filter(item => item.articles.length > 0)

    if (currentFinalizedArticles.value.length === 0) {
      showSummarySection.value = false
      summaryFinalized.value = false
      currentFinalizedVehicleType.value = ''
    }
  }
}

const saveOffenderDetail = async () => {
  try {
    // Map currentFinalizedArticles to violations array with all possible fields
    const violations = currentFinalizedArticles.value.map(article => {
      const decree = decrees.value.find(d => d.mardtar_name === article)
      return decree
        ? {
          decree_id: decree.decree_id,
          date_offend: null, // You can replace with actual value if available
          time: null,        // You can replace with actual value if available
          place: null,       // You can replace with actual value if available
          car_number: null,  // You can replace with actual value if available
          c_note: complaintDetails.value || null
        }
        : null
    }).filter(Boolean)
    const fineId = props.fineId
    if (!fineId || !violations.length) {
      alert('Missing fineId or no violations to save!')
      return
    }
    const payload = { fineId, violations }
    console.log('Sending to /api/offenderdetail/create:', payload)
    const res = await fetch('http://localhost:3000/api/offenderdetail/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok && data.success) {
      alert('ບັນທຶກຂໍ້ມູນສຳເລັດ!')
    } else {
      alert(data.message || 'Failed to save offender detail')
    }
  } catch (err) {
    alert('Server error')
  }
}

const generateReceipt = async () => {
  console.log('Generating receipt...', {
    articles: currentFinalizedArticles.value,
    totalPrice: totalPrice.value,
    finesCode: generateFinesCode(),
    vehicleType: currentFinalizedVehicleType.value,
    complaintDetails: complaintDetails.value,
    finalizedItems: finalizedItems.value
  })
  // await saveOffenderDetail(); // Disabled until you want to use /api/offenderdetail/create
}

// Filtered articles by selected rule types (for law description section)
const filteredArticlesByRuleType = computed(() => {
  if (!Array.isArray(articles.value) || selectedRuleTypes.value.length === 0) return []
  return articles.value.filter(article => {
    // Find decree for this article with all selected filters
    return decrees.value.some(d =>
      d.mardtar_name === article &&
      d.cartypes_id === selectedCartypeId.value &&
      selectedMuadIds.value.includes(d.muad_id) &&
      selectedMardtarIds.value.includes(d.mardtar_id) &&
      selectedRuleTypes.value.includes(d.rule_type)
    )
  })
})

// Cartype ID based on selected vehicle type
const selectedCartypeId = computed(() => {
  const found = decrees.value.find(d => d.cartype_name === vehicleType.value);
  return found ? found.cartypes_id : null;
});

// Add computed for selectedMuadIds and selectedMardtarIds
const selectedMuadIds = computed(() => {
  // Get muad_id for all selected violation types
  return muadOptions.value
    .filter(option => violationTypes.value.includes(option.muad_name))
    .map(option => option.muad_id)
})
const selectedMardtarIds = computed(() => {
  // Get mardtar_id for all selected articles
  return mardtarOptions.value
    .filter(option => articles.value.includes(option.mardtar_name))
    .map(option => option.mardtar_id)
})

// --- Remove backend-driven dropdowns ---
// const muadOptions = ref<any[]>([])
// const mardtarOptions = ref<any[]>([])
// const ruleTypeOptions = ref<any[]>([])

// Remove watchers for vehicleType, violationTypes, articles that fetch from backend
// ...existing code...
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
          <select v-model="vehicleType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option value="" disabled>ເລືອກປະເພດລົດ</option>
            <option v-for="option in vehicleOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <!-- Debug: Show decrees and cartypeId -->
          <!-- <div class="text-xs text-gray-400 mt-1">
            decrees: {{ decrees }}<br />
            selectedCartypeId: {{ selectedCartypeId }}
          </div> -->
        </div>
      </div>

      <!-- Violation Types Section -->
      <div class="bg-gray-200 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">ປະເພດໝວດ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <!-- Dropdown for selecting violation types -->
          <select v-model="selectedViolationType" @change="addViolationType" :disabled="!vehicleType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500">
            <option value="">
              {{ vehicleType ? 'ເລືອກໝວດ' : 'ເລືອກປະເພດລົດກ່ອນ' }}
            </option>
            <option v-for="option in muadOptions" :key="option.muad_id" :value="option.muad_name">
              {{ option.muad_no }} - {{ option.muad_name }}
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

    <!-- Articles and Law Description Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Articles Section -->
      <div class="bg-gray-200 p-6 rounded-lg" v-if="vehicleType && violationTypes.length > 0">
        <h2 class="text-xl font-semibold mb-4 text-black">ມາດຕາ</h2>
        <div class="bg-white p-4 rounded-lg space-y-3">
          <!-- Checkbox list for selecting articles -->
          <div class="flex flex-col space-y-2 max-h-48 overflow-y-auto">
            <label v-for="option in mardtarOptions" :key="option.mardtar_name" class="flex items-start w-full">
              <input type="checkbox" :value="option.mardtar_name" v-model="articles"
                class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-1" />
              <span class="ml-2 text-gray-700 break-words flex-1 min-w-0">
                {{
                  (mardtarOptions.find((a: any) => a.mardtar_name === option.mardtar_name)?.mardtar_no || '') +
                  ' - ' +
                  option.mardtar_name
                }}
              </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Law Description Section -->
      <div class="bg-gray-200 p-6 rounded-lg" v-if="vehicleType && violationTypes.length > 0">
        <h2 class="text-xl font-semibold mb-4 text-black">ຂໍ້ກົດໝາຍ</h2>
        <div class="bg-white text-black p-4 rounded-lg space-y-3">
          <!-- Rule type checkboxes -->
          <div class="rule-type-section">
            <label class="font-bold">ຂໍ້ກົດໝາຍ (Rule Type):</label>
            <div class="flex flex-wrap gap-2 mt-2">
              <label v-for="option in ruleTypeOptions" :key="String(option)" class="flex items-start w-full">
                <input type="checkbox" :value="option" v-model="selectedRuleTypes"
                  class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-1 flex-shrink-0" />
                <span class="ml-2 text-gray-700 break-words flex-1 min-w-0">{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- Filtered articles by selected rule type -->
          <div class="law-description-section mt-4">
            <div v-if="articles.length === 0 || selectedRuleTypes.length === 0">
              <p class="text-gray-500">ກະລຸນາເລືອກມາດຕາ ແລະ ຂໍ້ກົດໝາຍ</p>
            </div>
            <div v-else>
              <div v-for="article in filteredArticlesByRuleType" :key="article" class="mb-4 p-2 border rounded">
                <div class="font-bold">{{ article }}</div>
                <div class="text-sm text-gray-700">
                  <span v-if="getDecreeForArticle(article)">
                    {{ getDecreeForArticle(article).law_description }}<br />
                    <span class="italic text-xs">({{ getDecreeForArticle(article).muad_name }} - {{
                      getDecreeForArticle(article).rule_type }})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fine Prices Section (full width) -->
    <div class="bg-gray-200 p-6 rounded-lg mb-8">
      <h2 class="text-xl font-semibold mb-4 text-black">ລາຄາຄ່າປັບ (Fine Prices)</h2>
      <div class="bg-white p-4 rounded-lg">
        <div v-if="articles.length === 0" class="text-center text-gray-500 py-8">
          <p>ບໍ່ມີມາດຕາທີເລືອກ</p>
          <p class="text-sm mt-2">(No articles selected)</p>
        </div>
        <div v-else>
          <table class="w-full text-left mb-4">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-2 py-2 text-xs font-medium text-gray-500">ມາດຕາ</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500">ໝວດ</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500">Rule Type</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500">ລາຍລະອຽດ</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500">ລາຄາ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="article in articles" :key="article">
                <template v-for="rule in getValidRuleTypesForArticle(article)" :key="rule">
                  <td class="px-2 py-2">{{(mardtarOptions.find(a => a.mardtar_name === article)?.mardtar_no || '') + -
                    + article}} </td>
                  <td class="px-2 py-2">{{ getViolationTypeForArticle(article) }}</td>
                  <td class="px-2 py-2">{{ rule }}</td>
                  <td class="px-2 py-2">{{ getDecreeForArticle(article, [rule]).law_description || '-' }}</td>
                  <td class="px-2 py-2 font-semibold text-blue-600">{{ formatPrice(getDecreeForArticle(article,
                    [rule]).price || 0) }}</td>
                </template>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <span class="text-lg font-semibold text-gray-800">ລວມທັງໝົດ (Total):</span>
            <span class="text-xl font-bold text-blue-600">{{ formatPrice(selectedTotalPrice) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons Section -->
    <div class="bg-gray-200 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-black">ວາງລາຄາອອກໃບສັ່ງ</h2>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">

        <button @click="handleClear"
          class="flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
          <trashicon />
          Clear
        </button>

        <button @click="handleAddMore" :disabled="!vehicleType || articles.length === 0"
          class="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Add ({{ articles.length }})
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
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຂໍ້ກົດໝາຍ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ວັນເດືອນປີ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ລາຄາ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ຈັດການ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="!shouldShowSummary">
              <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                ເລືອກຂໍ້ຫາແລ້ວກົດປຸ່ມ "Add" ເພື່ອເພີ່ມໃສ່ສະຫງົບ<br>
                (Select violations and click "Add" button to add to summary)
              </td>
            </tr>
            <tr v-else v-for="(article, index) in currentFinalizedArticles" :key="article" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getViolationTypeForArticle(article) }}
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate" :title="article">{{ article }}</div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate" :title="getDecreeForArticle(article)?.law_description">
                  {{ getDecreeForArticle(article)?.law_description || '-' }}
                  <template v-if="Array.isArray(decrees) && decrees.length">
                    <div class="text-xs text-gray-500">
                      <span v-for="d in decrees.filter(d => d.mardtar_name === article)" :key="d.rule_type">
                        [{{ d.rule_type }}]
                      </span>
                    </div>
                  </template>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getCurrentDate() }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                {{ formatPrice(articlePrices[article] || 0) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <!-- <button @click="editArticle(article)"
                  class="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mr-2">
                  ແກ້ໄຂ
                </button> -->
                <button @click="removeArticle(article)"
                  class="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
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
            <span class="text-black">ຈຳນວນຂໍ້ຫາ:</span>
            <span class="text-black font-semibold">{{ currentFinalizedArticles.length }} ລາຍການ</span>
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
            <span class="text-black font-semibold">{{ currentFinalizedVehicleType || 'ບໍ່ໄດເລືອກ' }}</span>
          </div>
        </div>
      </div>

      <!-- Complaint Details -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-black">ລາຍລະອຽດການຮ້ອງທຸກ</h3>
        <textarea v-model="complaintDetails"
          class="text-black w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="ລາຍລະອຽດ..."></textarea>
      </div>
    </div>

    <!-- Generate Receipt Button -->
    <div class="mt-6 flex justify-end">
      <button @click="generateReceipt"
        class="flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
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