<!-- src/components/ordonnances/UploadOrdonnanceModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 3 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Uploader une ordonnance
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Sélectionnez une pharmacie et choisissez un fichier
              </p>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Pharmacie Selection -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pharmacie <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.pharmacieId"
              required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Sélectionnez une pharmacie</option>
              <option v-for="pharmacie in pharmacies" :key="pharmacie.id" :value="pharmacie.id">
                {{ pharmacie.nom || pharmacie.name }}
              </option>
            </select>
          </div>

          <!-- File Upload Zone -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fichier de l'ordonnance <span class="text-red-500">*</span>
            </label>
            
            <div
              @drop.prevent="handleDrop"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              :class="[
                'relative rounded-xl border-2 border-dashed transition-all duration-200',
                isDragging 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
              ]"
            >
              <input
                ref="fileInput"
                type="file"
                @change="handleFileSelect"
                accept="image/*,.pdf"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div class="p-8 text-center">
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <svg class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>

                <div v-if="!selectedFile">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Glissez-déposez votre fichier ici
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    ou cliquez pour parcourir
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    PNG, JPG, PDF jusqu'à 10MB
                  </p>
                </div>

                <div v-else class="space-y-3">
                  <div class="inline-flex items-center gap-3 rounded-lg bg-white dark:bg-gray-900 px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="text-left flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ selectedFile.name }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatFileSize(selectedFile.size) }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click.stop="removeFile"
                      class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    Choisir un autre fichier
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="rounded-lg bg-blue-50 p-4 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30">
            <div class="flex gap-3">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm text-blue-800 dark:text-blue-300">
                <p class="font-medium mb-1">Conseils pour l'upload</p>
                <ul class="list-disc list-inside space-y-0.5 text-xs">
                  <li>Assurez-vous que l'image est claire et lisible</li>
                  <li>Formats acceptés: PNG, JPG, JPEG, PDF</li>
                  <li>Taille maximale: 10 MB</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <div class="flex gap-2">
              <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isLoading || !selectedFile || !form.pharmacieId"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {{ isLoading ? 'Upload en cours...' : 'Uploader' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOrdonnances } from '@/composables/ordannance/useOrdonnances.js'

const emit = defineEmits(['close', 'success'])

const { uploadOrdonnance, isLoading } = useOrdonnances()

const form = ref({
  pharmacieId: ''
})

const selectedFile = ref(null)
const isDragging = ref(false)
const error = ref(null)
const fileInput = ref(null)

// Mock data - À remplacer par vos vraies données
const pharmacies = ref([
  { id: 'PHA-1759831495814-445', nom: 'Pharmacie Centrale' },
  { id: 'PHA-1759831495814-572', nom: 'Pharmacie du Quartier' }
])

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  error.value = null

  // Validation du type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    error.value = 'Type de fichier non supporté. Utilisez PNG, JPG ou PDF.'
    return
  }

  // Validation de la taille (10MB max)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    error.value = 'Le fichier est trop volumineux. Taille maximale: 10 MB.'
    return
  }

  selectedFile.value = file
}

const removeFile = () => {
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

const handleSubmit = async () => {
  if (!selectedFile.value || !form.value.pharmacieId) {
    error.value = 'Veuillez remplir tous les champs requis'
    return
  }

  error.value = null

  const result = await uploadOrdonnance(form.value.pharmacieId, selectedFile.value)

  if (result.success) {
    emit('success')
  } else {
    error.value = result.error || 'Erreur lors de l\'upload'
  }
}
</script>