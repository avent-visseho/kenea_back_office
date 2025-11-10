<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <!-- Header -->
    <div class="bg-brand-500 text-white px-6 py-4 rounded-t-lg">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Panier de commande
      </h3>
    </div>

    <!-- Contenu -->
    <div class="p-6">
      <!-- Message si panier vide -->
      <div v-if="selectedProductsDetails.length === 0" class="text-center py-8">
        <svg
          class="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p class="text-gray-600 dark:text-gray-400">
          Votre panier est vide. Sélectionnez des produits pour commencer.
        </p>
      </div>

      <!-- Liste des produits sélectionnés -->
      <div v-else class="space-y-6">
        <!-- Produits -->
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div
            v-for="product in selectedProductsDetails"
            :key="product.id"
            class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <img
              :src="product.image"
              :alt="product.nom"
              class="w-16 h-16 object-cover rounded"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                {{ product.nom }}
              </h4>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ product.format }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-brand-600 dark:text-brand-400 font-bold">
                  {{ product.prix }} {{ product.devise }}
                </span>
                <span
                  v-if="product.ordonnanceRequise"
                  class="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded"
                >
                  Ordonnance requise
                </span>
              </div>
            </div>
            <button
              @click="$emit('remove-product', product.id)"
              class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Alerte ordonnance requise -->
        <div v-if="requiresPrescription" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div class="flex gap-3">
            <svg
              class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h4 class="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Ordonnance médicale requise
              </h4>
              <p class="text-xs text-yellow-700 dark:text-yellow-400">
                Certains produits nécessitent une ordonnance. Veuillez joindre votre ordonnance ci-dessous.
              </p>
            </div>
          </div>
        </div>

        <!-- Upload ordonnance -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordonnance médicale {{ requiresPrescription ? '(Obligatoire)' : '(Optionnelle)' }}
          </label>

          <!-- Zone de drop -->
          <div
            @dragover.prevent
            @drop.prevent="handleFileDrop"
            class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-brand-500 transition-colors cursor-pointer"
            :class="{ 'border-brand-500 bg-brand-50 dark:bg-brand-900/10': isDragging }"
            @dragenter="isDragging = true"
            @dragleave="isDragging = false"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*,.pdf"
              @change="handleFileSelect"
              class="hidden"
            />

            <div v-if="!prescriptionFile">
              <svg
                class="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <button
                @click="$refs.fileInput.click()"
                class="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
              >
                Cliquez pour télécharger
              </button>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ou glissez-déposez votre fichier ici
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                PDF, PNG, JPG (max 5MB)
              </p>
            </div>

            <!-- Fichier sélectionné -->
            <div v-else class="flex items-center justify-between gap-3 bg-white dark:bg-gray-700 p-3 rounded-lg">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <svg class="w-8 h-8 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div class="flex-1 min-w-0 text-left">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ prescriptionFile.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatFileSize(prescriptionFile.size) }}
                  </p>
                </div>
              </div>
              <button
                @click="removePrescription"
                class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Informations de contact -->
        <div class="space-y-4">
          <h4 class="font-semibold text-gray-900 dark:text-white">Informations de contact</h4>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom complet *
            </label>
            <input
              v-model="contactInfo.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              placeholder="Votre nom complet"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Téléphone *
            </label>
            <input
              v-model="contactInfo.phone"
              type="tel"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              placeholder="+243 81 234 5678"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Adresse de livraison *
            </label>
            <textarea
              v-model="contactInfo.address"
              required
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              placeholder="Votre adresse complète"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (optionnel)
            </label>
            <textarea
              v-model="contactInfo.notes"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              placeholder="Instructions spéciales pour la livraison..."
            ></textarea>
          </div>
        </div>

        <!-- Résumé -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Sous-total</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ totalPrice }} FCFA</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Frais de livraison</span>
            <span class="font-medium text-gray-900 dark:text-white">À déterminer</span>
          </div>
          <div class="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
            <span class="text-gray-900 dark:text-white">Total</span>
            <span class="text-brand-600 dark:text-brand-400">{{ totalPrice }} FCFA</span>
          </div>
        </div>

        <!-- Bouton envoyer -->
        <button
          @click="submitOrder"
          :disabled="!canSubmit"
          class="w-full py-3 px-6 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          Envoyer la commande
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  selectedProducts: {
    type: Array,
    required: true
  },
  allProducts: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove-product', 'submit-order'])

const prescriptionFile = ref(null)
const isDragging = ref(false)
const contactInfo = ref({
  name: '',
  phone: '',
  address: '',
  notes: ''
})

// Détails des produits sélectionnés
const selectedProductsDetails = computed(() => {
  return props.allProducts.filter(p => props.selectedProducts.includes(p.id))
})

// Vérifie si une ordonnance est requise
const requiresPrescription = computed(() => {
  return selectedProductsDetails.value.some(p => p.ordonnanceRequise)
})

// Calcul du prix total
const totalPrice = computed(() => {
  return selectedProductsDetails.value.reduce((sum, p) => sum + p.prix, 0).toFixed(2)
})

// Vérifie si on peut soumettre
const canSubmit = computed(() => {
  const hasProducts = props.selectedProducts.length > 0
  const hasContactInfo = contactInfo.value.name && contactInfo.value.phone && contactInfo.value.address
  const hasPrescriptionIfRequired = !requiresPrescription.value || prescriptionFile.value

  return hasProducts && hasContactInfo && hasPrescriptionIfRequired
})

// Gestion de fichier
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  // Vérifier la taille (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Le fichier est trop volumineux. Taille maximale: 5MB')
    return
  }

  // Vérifier le type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    alert('Type de fichier non supporté. Utilisez PNG, JPG ou PDF.')
    return
  }

  prescriptionFile.value = file
}

const removePrescription = () => {
  prescriptionFile.value = null
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const submitOrder = () => {
  if (!canSubmit.value) return

  const orderData = {
    products: selectedProductsDetails.value,
    prescription: prescriptionFile.value,
    contact: contactInfo.value,
    total: totalPrice.value
  }

  emit('submit-order', orderData)
}
</script>
