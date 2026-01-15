<!-- src/components/pharmacie/ImportProduitModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50 transition-opacity"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all"
          >
            <!-- Header -->
            <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Importer des produits
                </h3>
                <button
                  @click="close"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Body -->
            <form @submit.prevent="handleSubmit" class="px-6 py-4">
              <!-- Error message -->
              <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                {{ error }}
              </div>

              <!-- Success message -->
              <div v-if="successMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                {{ successMessage }}
              </div>

              <!-- Instructions -->
              <div class="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                <p class="text-sm">
                  Importez un fichier contenant les informations des produits (CSV, Excel, etc.) et les images associées.
                </p>
              </div>

              <!-- Fichier principal -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fichier de données <span class="text-red-500">*</span>
                </label>
                <input
                  ref="fileDataInput"
                  type="file"
                  required
                  @change="handleFileSelect"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p v-if="selectedFile" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Fichier sélectionné : {{ selectedFile.name }}
                </p>
              </div>

              <!-- Images -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images des produits (optionnel)
                </label>
                <input
                  ref="imagesInput"
                  type="file"
                  accept="image/*"
                  multiple
                  @change="handleImagesSelect"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p v-if="selectedImages.length > 0" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {{ selectedImages.length }} image(s) sélectionnée(s)
                </p>

                <!-- Images preview -->
                <div v-if="selectedImages.length > 0" class="mt-3 grid grid-cols-4 gap-2">
                  <div
                    v-for="(image, index) in imagePreviews"
                    :key="index"
                    class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                  >
                    <img :src="image" :alt="`Preview ${index + 1}`" class="h-full w-full object-cover" />
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  @click="close"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="loading || !selectedFile"
                  class="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="loading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importation...
                  </span>
                  <span v-else>Importer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useProduitsPharmacie } from '@/composables/pharmacie/useProduitsPharmacie'
import { useAuthStore } from '@/store/auth/auth'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'imported'])

const authStore = useAuthStore()
const { importProduitsFile, loading, error: composableError, clearError } = useProduitsPharmacie()

// État local
const selectedFile = ref(null)
const selectedImages = ref([])
const imagePreviews = ref([])
const error = ref(null)
const successMessage = ref(null)
const fileDataInput = ref(null)
const imagesInput = ref(null)

// Gérer la sélection du fichier de données
const handleFileSelect = (event) => {
  const file = event.target.files?.[0]

  if (file) {
    selectedFile.value = file
    error.value = null
    console.log('📄 Fichier sélectionné:', file.name)
  }
}

// Gérer la sélection des images
const handleImagesSelect = (event) => {
  const files = Array.from(event.target.files || [])

  selectedImages.value = files
  imagePreviews.value = []

  // Créer les aperçus
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
      }

      reader.readAsDataURL(file)
    }
  })

  console.log('🖼️ Images sélectionnées:', files.length)
}

// Soumettre le formulaire
const handleSubmit = async () => {
  error.value = null
  successMessage.value = null
  clearError()

  // Validation
  if (!selectedFile.value) {
    error.value = 'Veuillez sélectionner un fichier à importer'
    return
  }

  // Récupérer l'ID de la pharmacie depuis assignments.PHARMACIE[0]
  const pharmacieAssignments = authStore.user?.assignments?.PHARMACIE
  let pharmacieId = null

  if (pharmacieAssignments && pharmacieAssignments.length > 0) {
    pharmacieId = pharmacieAssignments[0]
  }

  if (!pharmacieId) {
    error.value = 'ID de pharmacie introuvable. Veuillez vous reconnecter.'
    return
  }

  console.log('📤 Import en cours...', {
    pharmacieId,
    file: selectedFile.value.name,
    imagesCount: selectedImages.value.length
  })

  // Appeler l'API
  const result = await importProduitsFile(pharmacieId, selectedFile.value, selectedImages.value)

  if (result.success) {
    successMessage.value = 'Import réussi ! Les produits ont été ajoutés.'

    // Réinitialiser le formulaire après 2 secondes
    setTimeout(() => {
      emit('imported')
      resetForm()
    }, 2000)
  } else {
    error.value = result.error || composableError.value
  }
}

// Réinitialiser le formulaire
const resetForm = () => {
  selectedFile.value = null
  selectedImages.value = []
  imagePreviews.value = []
  error.value = null
  successMessage.value = null

  if (fileDataInput.value) {
    fileDataInput.value.value = ''
  }

  if (imagesInput.value) {
    imagesInput.value.value = ''
  }
}

// Fermer le modal
const close = () => {
  resetForm()
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
  transition: all 0.3s ease;
}

.modal-enter-from .transform,
.modal-leave-to .transform {
  transform: scale(0.95);
  opacity: 0;
}
</style>
