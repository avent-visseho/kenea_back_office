<!-- src/components/categorie/ImportCategoriesCsvModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="$emit('close')">
    <div class="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Importer des catégories (CSV)
          </h3>
        </div>
        <button @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 space-y-5">
        <!-- Info Banner -->
        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm">
              <p class="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                Format du fichier CSV attendu :
              </p>
              <div class="space-y-2 text-purple-800 dark:text-purple-300">
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="font-medium">En-têtes :</p>
                    <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 rounded text-xs font-mono">
                      nom,description
                    </code>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="font-medium">Exemple :</p>
                    <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 rounded text-xs font-mono block mt-1">
                      Analgésiques,Médicaments contre la douleur
                    </code>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <p>La description est optionnelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- File Upload Area -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fichier CSV <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              ref="fileInput" 
              type="file" 
              accept=".csv" 
              @change="handleFileChange"
              class="hidden" 
              :disabled="isUploading" 
            />

            <button 
              @click="triggerFileInput" 
              :disabled="isUploading"
              class="w-full px-6 py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 bg-gray-50 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div class="flex flex-col items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm group-hover:shadow-md transition-shadow">
                  <svg class="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div class="text-center">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ selectedFile ? selectedFile.name : 'Cliquez pour sélectionner un fichier CSV' }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ou glissez-déposez votre fichier ici
                  </p>
                </div>
              </div>
            </button>
          </div>
          
          <!-- File info -->
          <div v-if="selectedFile" class="mt-3 flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ selectedFile.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatFileSize(selectedFile.size) }}
              </p>
            </div>
            <button 
              @click="clearFile" 
              :disabled="isUploading"
              class="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p v-if="!selectedFile && showError" class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Veuillez sélectionner un fichier CSV
          </p>
        </div>

        <!-- Progress bar -->
        <div v-if="isUploading" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <svg class="w-4 h-4 animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Import en cours...
            </span>
            <span class="text-purple-600 dark:text-purple-400 font-semibold">{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-300 ease-out rounded-full"
              :style="{ width: `${uploadProgress}%` }"
            ></div>
          </div>
          <p class="text-xs text-center text-gray-500 dark:text-gray-400">
            Veuillez patienter pendant l'importation des données...
          </p>
        </div>

        <!-- Download Template -->
        <div class="pt-2">
          <button 
            @click="downloadTemplate"
            :disabled="isUploading"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger le modèle CSV
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
        <button 
          @click="$emit('close')" 
          :disabled="isUploading"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-white dark:hover:bg-gray-900"
        >
          Annuler
        </button>
        <button 
          @click="handleImport" 
          :disabled="!canImport || isUploading"
          class="px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600 transition-colors shadow-sm inline-flex items-center gap-2"
        >
          <svg v-if="!isUploading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isUploading ? 'Importation...' : 'Importer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close', 'import'])

const fileInput = ref(null)
const selectedFile = ref(null)
const showError = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

const canImport = computed(() => {
  return selectedFile.value !== null
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
      alert('Veuillez sélectionner un fichier CSV valide')
    }
  }
}

const clearFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleImport = async () => {
  showError.value = true

  if (!canImport.value) {
    return
  }

  isUploading.value = true
  uploadProgress.value = 0

  // Simulation de progression
  const progressInterval = setInterval(() => {
    if (uploadProgress.value < 90) {
      uploadProgress.value += 10
    }
  }, 200)

  try {
    await emit('import', {
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
    setTimeout(() => {
      isUploading.value = false
    }, 600)
  }
}

const downloadTemplate = () => {
  // Créer un fichier CSV template
  const csvContent = 'nom,description\nAnalgésiques,Médicaments contre la douleur\nAntibiotiques,Médicaments contre les infections\nVitamines,Compléments alimentaires'
  
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'template_categories.csv')
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>