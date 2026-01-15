<!-- src/components/pharmacie/ProduitPharmacieModal.vue -->
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
            class="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all"
          >
            <!-- Header -->
            <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ isEdit ? 'Modifier le produit' : 'Nouveau produit' }}
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

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <!-- Produit ID -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Produit ID <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.produitId"
                    type="text"
                    required
                    :disabled="isEdit"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                    placeholder="Ex: PROD-123"
                  />
                </div>

                <!-- Prix -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prix (FCFA) <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="form.prix"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="1500"
                  />
                </div>

                <!-- Stock -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="form.stock"
                    type="number"
                    required
                    min="0"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="100"
                  />
                </div>

                <!-- Promotion -->
                <div class="flex items-center gap-2">
                  <input
                    v-model="form.promotion"
                    type="checkbox"
                    id="promotion"
                    class="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="promotion" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    En promotion
                  </label>
                </div>

                <!-- Prix promotion -->
                <div v-if="form.promotion">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prix promotion (FCFA)
                  </label>
                  <input
                    v-model.number="form.prixPromotion"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="1200"
                  />
                </div>

                <!-- Date d'expiration -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date d'expiration <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.dateExpiration"
                    type="date"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <!-- Fournisseur -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fournisseur
                  </label>
                  <input
                    v-model="form.fournisseur"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Ex: Pharma Distribution"
                  />
                </div>

                <!-- Image -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image du produit
                  </label>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />

                  <!-- Image preview -->
                  <div v-if="imagePreview" class="mt-3">
                    <img :src="imagePreview" alt="Preview" class="h-32 w-32 object-cover rounded-lg" />
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
                  :disabled="loading"
                  class="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="loading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enregistrement...
                  </span>
                  <span v-else>{{ isEdit ? 'Modifier' : 'Créer' }}</span>
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
import { ref, computed, watch } from 'vue'
import { useProduitsPharmacie } from '@/composables/pharmacie/useProduitsPharmacie'
import { useAuthStore } from '@/store/auth/auth'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  produit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'saved'])

const authStore = useAuthStore()
const { createProduitPharmacie, updateProduitPharmacie, loading, error: composableError, clearError } = useProduitsPharmacie()

// État local
const form = ref({
  produitId: '',
  pharmacieId: '',
  prix: 0,
  stock: 0,
  promotion: false,
  prixPromotion: 0,
  dateExpiration: '',
  fournisseur: ''
})

const imagePreview = ref(null)
const imageBase64 = ref('')
const error = ref(null)
const fileInput = ref(null)

// Calculé
const isEdit = computed(() => !!props.produit)

// Réinitialiser le formulaire
const resetForm = () => {
  form.value = {
    produitId: '',
    pharmacieId: '',
    prix: 0,
    stock: 0,
    promotion: false,
    prixPromotion: 0,
    dateExpiration: '',
    fournisseur: ''
  }
  imagePreview.value = null
  imageBase64.value = ''
  error.value = null

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Watcher pour remplir le formulaire en mode édition
watch(() => props.produit, (newProduit) => {
  if (newProduit) {
    form.value = {
      produitId: newProduit.produitId || '',
      pharmacieId: newProduit.pharmacieId || '',
      prix: newProduit.prix || 0,
      stock: newProduit.stock || 0,
      promotion: newProduit.promotion || false,
      prixPromotion: newProduit.prixPromotion || 0,
      dateExpiration: newProduit.dateExpiration || '',
      fournisseur: newProduit.fournisseur || ''
    }

    if (newProduit.image) {
      imagePreview.value = newProduit.image
      imageBase64.value = newProduit.image
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Gérer la sélection de fichier
const handleFileSelect = (event) => {
  const file = event.target.files?.[0]

  if (file) {
    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      error.value = 'Veuillez sélectionner une image valide'
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'L\'image est trop volumineuse (max 5MB)'
      return
    }

    // Lire le fichier et créer un aperçu
    const reader = new FileReader()

    reader.onload = (e) => {
      imagePreview.value = e.target.result
      imageBase64.value = e.target.result
      error.value = null
    }

    reader.readAsDataURL(file)
  }
}

// Soumettre le formulaire
const handleSubmit = async () => {
  error.value = null
  clearError()

  // Validation
  if (!form.value.produitId) {
    error.value = 'L\'ID du produit est requis'
    return
  }

  if (form.value.prix <= 0) {
    error.value = 'Le prix doit être supérieur à 0'
    return
  }

  if (form.value.stock < 0) {
    error.value = 'Le stock ne peut pas être négatif'
    return
  }

  if (!form.value.dateExpiration) {
    error.value = 'La date d\'expiration est requise'
    return
  }

  // Préparer les données
  let pharmacieId = form.value.pharmacieId

  if (!pharmacieId) {
    // Récupérer l'ID de la pharmacie depuis assignments.PHARMACIE[0]
    const pharmacieAssignments = authStore.user?.assignments?.PHARMACIE

    if (pharmacieAssignments && pharmacieAssignments.length > 0) {
      pharmacieId = pharmacieAssignments[0]
    }
  }

  if (!pharmacieId) {
    error.value = 'ID de pharmacie introuvable'
    return
  }

  const data = {
    dto: {
      produitId: form.value.produitId,
      pharmacieId: pharmacieId,
      prix: form.value.prix,
      stock: form.value.stock,
      promotion: form.value.promotion,
      prixPromotion: form.value.promotion ? form.value.prixPromotion : 0,
      dateExpiration: form.value.dateExpiration,
      fournisseur: form.value.fournisseur
    },
    image: imageBase64.value || ''
  }

  console.log('📤 Données à envoyer:', data)

  // Appeler l'API
  let result
  if (isEdit.value) {
    result = await updateProduitPharmacie(props.produit.id, data)
  } else {
    result = await createProduitPharmacie(data)
  }

  if (result.success) {
    emit('saved')
  } else {
    error.value = result.error || composableError.value
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
