<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <!-- Header -->
    <div class="bg-brand-500 text-white px-6 py-4 rounded-t-lg">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Panier de commande
      </h3>
      <p v-if="cartStore.itemCount > 0" class="text-brand-50 text-sm mt-1">
        {{ cartStore.itemCount }} article(s) - {{ cartStore.total }} FCFA
      </p>
    </div>

    <!-- Contenu -->
    <div class="p-6">
      <!-- Message si panier vide -->
      <div v-if="cartStore.isEmpty" class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p class="text-gray-600 dark:text-gray-400">
          Votre panier est vide. Sélectionnez des produits pour commencer.
        </p>
      </div>

      <!-- Liste des produits dans le panier -->
      <div v-else class="space-y-6">
        <!-- Produits -->
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div
            v-for="item in cartStore.items"
            :key="item.produitPharmacieId"
            class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <img :src="item.image" :alt="item.productName" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                {{ item.productName }}
              </h4>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                {{ item.prixUnitaire }} FCFA × {{ item.quantite }}
              </p>
              <p class="text-brand-600 dark:text-brand-400 font-bold text-sm mt-1">
                {{ item.sousTotal }} FCFA
              </p>
            </div>
            <!-- Contrôles quantité -->
            <div class="flex items-center gap-2">
              <button
                @click="cartStore.updateQuantity(item.produitPharmacieId, item.quantite - 1)"
                class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="w-8 text-center font-semibold">{{ item.quantite }}</span>
              <button
                @click="cartStore.updateQuantity(item.produitPharmacieId, item.quantite + 1)"
                :disabled="item.quantite >= item.stock"
                class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button
              @click="cartStore.removeItem(item.produitPharmacieId)"
              class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Upload ordonnance -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordonnance médicale (Optionnelle)
          </label>

          <!-- Ordonnance déjà uploadée -->
          <div v-if="cartStore.hasOrdonnance" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="text-sm font-semibold text-green-800 dark:text-green-300">Ordonnance envoyée</p>
                  <p class="text-xs text-green-700 dark:text-green-400">ID: {{ cartStore.ordonnanceId }}</p>
                </div>
              </div>
              <button
                @click="removeOrdonnance"
                class="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-colors"
              >
                Retirer
              </button>
            </div>
          </div>

          <!-- Zone d'upload -->
          <div v-else class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-brand-500 transition-colors">
            <input
              ref="fileInput"
              type="file"
              accept="image/*,.pdf"
              @change="handleFileSelect"
              class="hidden"
            />
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <button
              @click="$refs.fileInput.click()"
              class="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
            >
              Cliquez pour télécharger
            </button>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              PDF, PNG, JPG (max 5MB)
            </p>
          </div>
        </div>

        <!-- Informations de contact -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900 dark:text-white">Informations de contact</h4>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom *</label>
              <input
                v-model="form.nom"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom *</label>
              <input
                v-model="form.prenom"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                placeholder="Votre prénom"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Téléphone WhatsApp *
            </label>
            <input
              v-model="form.telWathsApp"
              type="tel"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              placeholder="+243 81 234 5678"
            />
          </div>
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-red-700 dark:text-red-400 text-sm">{{ error }}</p>
          </div>
        </div>

        <!-- Total et bouton commander -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
            <span class="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {{ cartStore.total }} FCFA
            </span>
          </div>

          <button
            @click="handleSubmit"
            :disabled="submittingOrder || cartStore.isEmpty"
            class="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="submittingOrder" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="submittingOrder">Envoi en cours...</span>
            <span v-else>Commander maintenant</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de preview d'ordonnance -->
    <OrdonnancePreviewModal
      :show="showPreviewModal"
      :preview="ordonnancePreview"
      :loading="uploadingOrdonnance"
      :error="error"
      @confirm="confirmOrdonnanceUpload"
      @cancel="cancelOrdonnanceUpload"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCart } from '@/composables/marketPlace/useCart'
import { useCartStore } from '@/store/cart/cartStore'
import OrdonnancePreviewModal from './OrdonnancePreviewModal.vue'

const props = defineProps({
  selectedProducts: {
    type: Array,
    default: () => []
  },
  allProducts: {
    type: Array,
    default: () => []
  },
  pharmacyId: {
    type: String,
    required: false
  },
  pharmacyName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['order-submitted'])

// Composables
const {
  selectOrdonnanceFile,
  confirmAndUploadOrdonnance,
  cancelOrdonnanceUpload: cancelOrdonnanceFromComposable,
  removeOrdonnance: removeOrdonnanceFromStore,
  submitOrder,
  uploadingOrdonnance,
  submittingOrder,
  ordonnancePreview,
  showPreviewModal,
  error,
  clearError,
  cartStore
} = useCart()

// Formulaire
const form = ref({
  nom: '',
  prenom: '',
  telWathsApp: ''
})

const fileInput = ref(null)

// Synchroniser les produits sélectionnés avec le store
watch(() => props.selectedProducts, (newProducts) => {
  // Mettre à jour le panier si nécessaire
  // Pour l'instant, on laisse l'utilisateur gérer manuellement
}, { immediate: true })

// Définir la pharmacie au montage
watch(() => props.pharmacyId, (newId) => {
  if (newId && props.pharmacyName) {
    cartStore.setPharmacy(newId, props.pharmacyName)
  }
}, { immediate: true })

/**
 * Gère la sélection d'un fichier d'ordonnance
 */
const handleFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (file) {
    await selectOrdonnanceFile(file)
  }
}

/**
 * Confirme et upload l'ordonnance
 */
const confirmOrdonnanceUpload = async () => {
  if (!props.pharmacyId) {
    error.value = 'ID de pharmacie manquant'
    return
  }

  const success = await confirmAndUploadOrdonnance(props.pharmacyId)
  if (success) {
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

/**
 * Annule l'upload
 */
const cancelOrdonnanceUpload = () => {
  cancelOrdonnanceFromComposable()
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

/**
 * Retire l'ordonnance uploadée
 */
const removeOrdonnance = () => {
  removeOrdonnanceFromStore()
}

/**
 * Soumet la commande
 */
const handleSubmit = async () => {
  clearError()

  // Valider le formulaire
  if (!form.value.nom || !form.value.prenom || !form.value.telWathsApp) {
    error.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }

  // Enregistrer les infos client dans le store
  cartStore.setCustomerInfo({
    nom: form.value.nom,
    prenom: form.value.prenom,
    telWathsApp: form.value.telWathsApp
  })

  // Soumettre la commande
  const result = await submitOrder()

  if (result) {
    // Réinitialiser le formulaire
    form.value = {
      nom: '',
      prenom: '',
      telWathsApp: ''
    }

    // Émettre l'événement
    emit('order-submitted', result)
  }
}
</script>
