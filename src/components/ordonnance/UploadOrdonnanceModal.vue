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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Uploader une ordonnance
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Pharmacies suggérées ou recherchez par mot-clé
              </p>
            </div>
          </div>
          <button @click="$emit('close')" class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Pharmacies Selection -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sélectionner des pharmacies <span class="text-red-500">*</span>
            </label>

            <!-- Info Box avec toggle -->
            <div class="mb-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border border-blue-100 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-900/30">
              <div class="flex gap-2 items-center justify-between">
                <div class="flex gap-2 items-start flex-1">
                  <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div class="text-sm text-blue-800 dark:text-blue-300">
                    <span class="font-medium">{{ searchMode ? 'Recherche personnalisée' : 'Pharmacies suggérées (les plus proches)' }}</span>
                    <span v-if="!searchMode && (sugestPharmaciesList || []).length > 0" class="ml-1">
                      ({{ (sugestPharmaciesList || []).length }} disponible{{ (sugestPharmaciesList || []).length > 1 ? 's' : '' }})
                    </span>
                  </div>
                </div>
                <!-- Toggle Switch -->
                <button type="button" @click="toggleSearchMode" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-colors text-xs font-medium text-blue-700 dark:text-blue-300">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {{ searchMode ? 'Voir suggestions' : 'Rechercher' }}
                </button>
              </div>
            </div>

            <!-- Tags des pharmacies sélectionnées -->
            <div v-if="form.selectedPharmacies.length > 0" class="mb-3 flex flex-wrap gap-2">
              <div v-for="pharma in form.selectedPharmacies" :key="pharma.id" class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <span>{{ pharma.name }}</span>
                <span v-if="pharma.distanceTemp" class="text-xs opacity-75">
                  ({{ pharma.distanceTemp.toFixed(2) }} km)
                </span>
                <button type="button" @click="removePharmacy(pharma.id)" class="rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 p-0.5 transition-colors">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Champ de recherche -->
            <div class="position-relative">
              <div class="relative">
                <input type="text" class="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  :class="{ 'border-red-300 dark:border-red-700': error && form.selectedPharmacies.length === 0 }"
                  v-model="searchQuery"
                  @input="handleSearch"
                  @focus="showDropdown = true"
                  @blur="handleBlur"
                  :placeholder="searchMode ? 'Rechercher par nom, ville, région...' : 'Rechercher une pharmacie suggérée...'"
                  autocomplete="off" />
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <!-- Dropdown Liste des pharmacies -->
              <div v-if="showDropdown && displayedPharmacies.length > 0" class="autocomplete-dropdown">
                <div v-for="pharma in displayedPharmacies" :key="pharma.id" class="autocomplete-item"
                  @mousedown.prevent="selectPharmacy(pharma)"
                  :class="{ 'selected-item': isPharmacySelected(pharma.id) }">
                  <div class="flex items-center gap-3 flex-1">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <svg class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 dark:text-white">{{ pharma.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                        <div v-if="pharma.adresse || pharma.ville || pharma.region">
                          {{ pharma.adresse || '' }} 
                          {{ pharma.ville ? '- ' + pharma.ville : '' }}
                          {{ pharma.region && !pharma.ville ? '- ' + pharma.region : '' }}
                        </div>
                        <div v-if="pharma.distanceTemp" class="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{{ pharma.distanceTemp.toFixed(2) }} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="isPharmacySelected(pharma.id)" class="ml-2">
                    <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Loading state -->
              <div v-if="showDropdown && isLoadingSearch" class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="h-4 w-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-gray-500 dark:text-gray-400">Recherche en cours...</span>
                  </div>
                </div>
              </div>

              <!-- Message si aucun résultat -->
              <div v-if="showDropdown && !isLoadingSearch && searchQuery && displayedPharmacies.length === 0" class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">Aucune pharmacie trouvée</span>
                </div>
              </div>

              <!-- Message si pas de pharmacies suggérées -->
              <div v-if="showDropdown && !searchMode && !searchQuery && (sugestPharmaciesList || []).length === 0" class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">Aucune pharmacie suggérée disponible</span>
                </div>
              </div>
            </div>

            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ form.selectedPharmacies.length }} pharmacie(s) sélectionnée(s)
            </p>
          </div>

          <!-- File Upload Zone -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fichier de l'ordonnance <span class="text-red-500">*</span>
            </label>

            <div @drop.prevent="handleDrop" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
              :class="['relative rounded-xl border-2 border-dashed transition-all duration-200', isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50']">
              <input ref="fileInput" type="file" @change="handleFileSelect" accept="image/*,.pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

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
                    <button type="button" @click.stop="removeFile" class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition-colors">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <button type="button" @click="$refs.fileInput.click()" class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
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
                  <li>Sélectionnez parmi les pharmacies suggérées ou recherchez par mot-clé</li>
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
            <button type="button" @click="$emit('close')" class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || !selectedFile || form.selectedPharmacies.length === 0" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
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
import { ref, onMounted, computed, watch } from 'vue'
import { useOrdonnances } from '@/composables/ordannance/useOrdonnances.js'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'

const emit = defineEmits(['close', 'success'])

const { uploadOrdonnance, isLoading: isLoadingUpload } = useOrdonnances()
const { 
  sugestPharmaciesList, 
  searchResults, 
  fetchSugestPharmaciesList, 
  searchPharmaciesByKeyword,
  isLoading: isLoadingPharmacies
} = usePharmaciesVille()

const showDropdown = ref(false)
const searchQuery = ref('')
const searchMode = ref(false)
const isLoadingSearch = ref(false)
const isLoading = computed(() => isLoadingUpload.value || isLoadingPharmacies.value)
let searchTimeout = null

const form = ref({
  selectedPharmacies: []
})

const selectedFile = ref(null)
const isDragging = ref(false)
const error = ref(null)
const fileInput = ref(null)

// ✅ NOUVEAU: Pharmacies à afficher selon le mode
const displayedPharmacies = computed(() => {
  if (searchMode.value) {
    // Mode recherche par mot-clé
    return searchResults.value || []
  } else {
    // Mode suggestions (pharmacies les plus proches)
    const pharmacies = sugestPharmaciesList.value || []
    
    if (!searchQuery.value.trim()) {
      return pharmacies
    }

    const query = searchQuery.value.toLowerCase().trim()
    return pharmacies.filter(pharma => {
      const name = (pharma.name || '').toLowerCase()
      const adresse = (pharma.adresse || '').toLowerCase()
      const ville = (pharma.ville || '').toLowerCase()
      const region = (pharma.region || '').toLowerCase()

      return name.includes(query) || adresse.includes(query) || ville.includes(query) || region.includes(query)
    })
  }
})

// ✅ NOUVEAU: Toggle entre mode suggestions et recherche
const toggleSearchMode = () => {
  searchMode.value = !searchMode.value
  searchQuery.value = ''
  showDropdown.value = false
}

// ✅ Recherche avec debounce
const handleSearch = async () => {
  showDropdown.value = true

  if (searchMode.value) {
    // Annuler la recherche précédente
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const query = searchQuery.value.trim()

    if (query.length < 2) {
      if (searchResults.value) {
        searchResults.value = []
      }
      return
    }

    // Debounce de 500ms
    searchTimeout = setTimeout(async () => {
      isLoadingSearch.value = true
      try {
        await searchPharmaciesByKeyword(query)
      } catch (err) {
        console.error('Erreur recherche:', err)
      } finally {
        isLoadingSearch.value = false
      }
    }, 500)
  }
}

// ✅ Nettoyer le timeout au démontage
watch(() => searchMode.value, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
    searchTimeout = null
  }
  isLoadingSearch.value = false
})

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const selectPharmacy = (pharmacie) => {
  const index = form.value.selectedPharmacies.findIndex(p => p.id === pharmacie.id)

  if (index > -1) {
    form.value.selectedPharmacies.splice(index, 1)
  } else {
    form.value.selectedPharmacies.push(pharmacie)
  }
}

const isPharmacySelected = (pharmacieId) => {
  return form.value.selectedPharmacies.some(p => p.id === pharmacieId)
}

const removePharmacy = (pharmacieId) => {
  form.value.selectedPharmacies = form.value.selectedPharmacies.filter(p => p.id !== pharmacieId)
}

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

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    error.value = 'Type de fichier non supporté. Utilisez PNG, JPG ou PDF.'
    return
  }

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
  if (!selectedFile.value || form.value.selectedPharmacies.length === 0) {
    error.value = 'Veuillez sélectionner au moins une pharmacie et un fichier'
    return
  }

  error.value = null

  const pharmacieIds = form.value.selectedPharmacies.map(p => p.id)
  const result = await uploadOrdonnance(pharmacieIds, selectedFile.value)

  if (result.success) {
    emit('success')
  } else {
    error.value = result.error || 'Erreur lors de l\'upload'
  }
}

onMounted(async () => {
  // Charger la liste des pharmacies suggérées par défaut
  if (!sugestPharmaciesList.value || sugestPharmaciesList.value.length === 0) {
    const result = await fetchSugestPharmaciesList()
    if (!result.success) {
      error.value = 'Impossible de charger les pharmacies suggérées'
    }
  }
})
</script>

<style scoped>
.position-relative {
  position: relative;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1050;
  margin-top: 4px;
}

.dark .autocomplete-dropdown {
  background: #1f2937;
  border-color: #374151;
}

.autocomplete-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
}

.dark .autocomplete-item {
  border-bottom-color: #374151;
}

.autocomplete-item:last-child {
  border-bottom: none;
}

.autocomplete-item:hover {
  background-color: #f9fafb;
}

.dark .autocomplete-item:hover {
  background-color: #374151;
}

.autocomplete-item.selected-item {
  background-color: #eff6ff;
}

.dark .autocomplete-item.selected-item {
  background-color: #1e3a5f;
}

.autocomplete-dropdown::-webkit-scrollbar {
  width: 8px;
}

.autocomplete-dropdown::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 10px;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-track {
  background: #374151;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 10px;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>