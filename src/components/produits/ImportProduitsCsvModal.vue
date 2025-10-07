<!-- src/components/produit/ImportProduitsCsvModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Importer des produits (CSV)
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 space-y-4">
        <!-- Sélection Pharmacie -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionner la pharmacie <span class="text-red-500">*</span>
          </label>
          <select v-model="selectedPharmacieId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            :disabled="isUploading">
            <option value="">-- Choisir une pharmacie --</option>
            <option v-for="pharmacie in pharmaciesList" :key="pharmacie.id" :value="pharmacie.id">
              {{ pharmacie.nom || pharmacie.name }}
            </option>
          </select>
          <p v-if="!selectedPharmacieId && showError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            Veuillez sélectionner une pharmacie
          </p>
        </div>

        <!-- Sélection Catégorie -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionner la catégorie <span class="text-red-500">*</span>
          </label>
          <select v-model="selectedCategorieId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            :disabled="isUploading">
            <option value="">-- Choisir une catégorie --</option>
          </select>
          <p v-if="!selectedCategorieId && showError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            Veuillez sélectionner une catégorie
          </p>
        </div>

        <!-- Info -->
        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-purple-800 dark:text-purple-200">
              <p class="font-medium mb-1">Format du fichier CSV attendu :</p>
              <ul class="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-300">
                <li>Headers : <code class="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded text-xs">nom,prix,description</code></li>
                <li>Exemple : <code class="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded text-xs">Paracétamol,2500,Anti-douleur</code></li>
                <li>La pharmacie et catégorie seront automatiquement associées</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Upload file -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fichier CSV <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input ref="fileInput" type="file" accept=".csv" @change="handleFileChange" class="hidden" :disabled="isUploading" />

            <button @click="triggerFileInput" :disabled="isUploading || !selectedPharmacieId || !selectedCategorieId"
              class="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 bg-gray-50 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <div class="flex items-center justify-center gap-2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ selectedFile ? selectedFile.name : 'Cliquer pour sélectionner un fichier CSV' }}
                </span>
              </div>
            </button>
          </div>
          <p v-if="!selectedFile && showError && selectedPharmacieId && selectedCategorieId" class="mt-1 text-sm text-red-600 dark:text-red-400">
            Veuillez sélectionner un fichier
          </p>
        </div>

        <!-- Progress bar -->
        <div v-if="isUploading" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Import en cours...</span>
            <span class="text-purple-600 dark:text-purple-400 font-medium">{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div class="bg-purple-600 h-full transition-all duration-300 ease-out" :style="{ width: `${uploadProgress}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <button @click="$emit('close')" :disabled="isUploading"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
          Annuler
        </button>
        <button @click="handleImport" :disabled="!canImport || isUploading"
          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600 transition-colors">
          <span v-if="!isUploading">Importer</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Import...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  pharmaciesList: {
    type: Array,
    required: true
  },
  categoriesList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'import'])

const fileInput = ref(null)
const selectedPharmacieId = ref('')
const selectedCategorieId = ref('')
const selectedFile = ref(null)
const showError = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

const canImport = computed(() => {
  return selectedPharmacieId.value && selectedCategorieId.value && selectedFile.value
})

const triggerFileInput = () => {
  if (selectedPharmacieId.value && selectedCategorieId.value) {
    fileInput.value?.click()
  }
}

const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (file && file.name.endsWith('.csv')) {
    selectedFile.value = file
    showError.value = false
  } else {
    selectedFile.value = null
    if (file) {
      alert('Veuillez sélectionner un fichier CSV')
    }
  }
}

const handleImport = async () => {
  showError.value = true

  if (!canImport.value) {
    return
  }

  isUploading.value = true
  uploadProgress.value = 0

  const progressInterval = setInterval(() => {
    if (uploadProgress.value < 90) {
      uploadProgress.value += 10
    }
  }, 200)

  try {
    await emit('import', {
      pharmacieId: selectedPharmacieId.value,
      categorieId: selectedCategorieId.value,
      file: selectedFile.value
    })
    
    uploadProgress.value = 100
    
    setTimeout(() => {
      clearInterval(progressInterval)
      emit('close')
    }, 500)
  } catch (error) {
    clearInterval(progressInterval)
    uploadProgress.value = 0
    console.error('Erreur import:', error)
  } finally {
    isUploading.value = false
  }
}
</script>