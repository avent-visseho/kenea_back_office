<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="$emit('close')">
    <div class="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Importer des pharmacies (CSV)
        </h3>
        <button @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 space-y-4">
        <!-- Sélection de la ville -->
       <!--  <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionner la ville <span class="text-red-500">*</span>
          </label>
          <select v-model="selectedVilleId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            :disabled="isUploading">
            <option value="">-- Choisir une ville --</option>
            <option v-for="ville in citiesList" :key="ville.id" :value="ville.id">
              {{ ville.nom || ville.name }}
            </option>
          </select>
          <p v-if="!selectedVilleId && showError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            Veuillez sélectionner une ville
          </p>
        </div> -->

        <!-- Info -->
        <div class="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-teal-800 dark:text-teal-200">
              <p class="font-medium mb-1">Format du fichier CSV attendu :</p>
              <ul class="list-disc list-inside space-y-1 text-teal-700 dark:text-teal-300">
                <li>Headers : <code class="px-1 py-0.5 bg-teal-100 dark:bg-teal-900/40 rounded text-xs">nom,adresse,telephone</code></li>
                <li>Exemple : <code class="px-1 py-0.5 bg-teal-100 dark:bg-teal-900/40 rounded text-xs">Pharmacie Centrale,12 rue X,+1234567890</code></li>
                <li>La ville sera automatiquement associée</li>
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
            <input ref="fileInput" type="file" accept=".csv" @change="handleFileChange"
              class="hidden"  />  <!-- :disabled="isUploading" -->

                <!-- :disabled="isUploading || !selectedVilleId" -->
            <button @click="triggerFileInput" 
              class="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <div class="flex items-center justify-center gap-2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ selectedFile ? selectedFile.name : 'Cliquer pour sélectionner un fichier CSV' }}
                </span>
              </div>
            </button>
          </div>
          <p v-if="!selectedFile && showError " class="mt-1 text-sm text-red-600 dark:text-red-400">
            Veuillez sélectionner un fichier
          </p> <!-- && selectedVilleId -->
        </div>

        <!-- Progress bar -->
        <div v-if="isUploading" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Import en cours...</span>
            <span class="text-teal-600 dark:text-teal-400 font-medium">{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div class="bg-teal-600 h-full transition-all duration-300 ease-out"
              :style="{ width: `${uploadProgress}%` }"></div>
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
          class="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600 transition-colors">
          <span v-if="!isUploading">Importer</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
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

/* const props = defineProps({
  citiesList: {
    type: Array,
    required: true
  }
}) */

const emit = defineEmits(['close', 'import'])

const fileInput = ref(null)
//const selectedVilleId = ref('')
const selectedFile = ref(null)
const showError = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

/* const canImport = computed(() => {
  return selectedVilleId.value && selectedFile.value
}) */

/* const triggerFileInput = () => {
  if (selectedVilleId.value) {
    fileInput.value?.click()
  }
} */


const canImport = computed(() => {
  return selectedFile.value
})

const triggerFileInput = () => {
  fileInput.value?.click()
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
     /*  villeId: selectedVilleId.value, */
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