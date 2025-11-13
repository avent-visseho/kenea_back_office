<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header/Navigation -->
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo et retour -->
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg
                class="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 class="text-xl font-bold text-brand-500">
              Kenea Marketplace
            </h1>
          </div>

          <!-- Bouton connexion -->
          <button
            @click="goToLogin"
            class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    </header>

    <!-- État de chargement -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-brand-500 mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400 text-lg">Chargement de la pharmacie...</p>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
        <div class="text-center">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">Erreur de chargement</h3>
          <p class="text-red-700 dark:text-red-400 mb-6">{{ error }}</p>
          <div class="flex gap-4 justify-center">
            <button
              @click="retryLoading"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Réessayer
            </button>
            <button
              @click="goBack"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="pharmacy" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête de la pharmacie -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <!-- Image de couverture -->
        <div class="relative h-64 md:h-80">
          <img
            :src="pharmacy.image"
            :alt="pharmacy.nom"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <!-- Informations superposées -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ pharmacy.nom }}</h2>
                <div class="flex flex-wrap items-center gap-4 text-sm">
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span class="font-semibold">{{ pharmacy.note }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{{ pharmacy.distance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Détails de la pharmacie -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Colonne gauche -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Description</h3>
                <p class="text-gray-700 dark:text-gray-300">{{ pharmacy.description }}</p>
              </div>

              <div>
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Adresse</h3>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ pharmacy.adresse }}</span>
                </div>
              </div>

              <div>
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Horaires</h3>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ pharmacy.horaires }}</span>
                </div>
              </div>
            </div>

            <!-- Colonne droite -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Contact</h3>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a :href="`tel:${pharmacy.telephone}`" class="text-brand-600 dark:text-brand-400 hover:underline">
                      {{ pharmacy.telephone }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a :href="`mailto:${pharmacy.email}`" class="text-brand-600 dark:text-brand-400 hover:underline">
                      {{ pharmacy.email }}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Services</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(service, index) in pharmacy.services"
                    :key="index"
                    class="px-3 py-1 bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-sm rounded-full"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section produits et commande -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Liste des produits (2/3) -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Produits disponibles
          </h2>
          <ProductList
            :products="products"
            :selected-products="selectedProducts"
            @toggle-selection="toggleProductSelection"
            @clear-selection="clearSelection"
          />
        </div>

        <!-- Formulaire de commande (1/3) -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <OrderForm
              :selected-products="selectedProducts"
              :all-products="products"
              :pharmacy-id="pharmacy?.id"
              :pharmacy-name="pharmacy?.nom"
              @order-submitted="handleOrderSubmitted"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Page 404 si pharmacie non trouvée -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <svg
        class="w-24 h-24 mx-auto text-gray-400 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Pharmacie non trouvée
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        La pharmacie que vous recherchez n'existe pas ou n'est plus disponible.
      </p>
      <button
        @click="goBack"
        class="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
      >
        Retour à l'accueil
      </button>
    </div>

    <!-- Modal de confirmation -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeSuccessModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Commande envoyée !
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Votre commande a été transmise à {{ pharmacy?.nom }}. Vous serez contacté très prochainement.
          </p>
          <div class="space-y-3">
            <button
              @click="closeSuccessModal"
              class="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
            >
              Continuer mes achats
            </button>
            <button
              @click="goBack"
              class="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductList from '@/components/marketplace/ProductList.vue'
import OrderForm from '@/components/marketplace/OrderForm.vue'
import { useMarketPlace } from '@/composables/marketPlace/useMarketPlace'
import { useCartStore } from '@/store/cart/cartStore'

const route = useRoute()
const router = useRouter()

// Utilisation du composable marketplace
const {
  products: pharmacyProducts,
  isLoading,
  error,
  fetchPharmacyById,
  fetchPharmacyInfoFromNearbyList
} = useMarketPlace()

// Store du panier
const cartStore = useCartStore()

const selectedProducts = ref([])
const showSuccessModal = ref(false)

// Récupérer l'objet pharmacie depuis le router state
const pharmacy = ref(history.state.pharmacy || null)

// Computed pour simplifier l'accès aux produits
const products = computed(() => pharmacyProducts.value)

// Chargement initial des produits et infos de la pharmacie
onMounted(async () => {
  const pharmacyId = route.params.id

  // Si on n'a pas l'objet pharmacie (accès direct par URL), essayer de le récupérer
  if (!pharmacy.value && pharmacyId) {
    console.warn('⚠️ Objet pharmacie non disponible, chargement depuis l\'API...')
    try {
      const pharmacyInfo = await fetchPharmacyInfoFromNearbyList(pharmacyId)
      if (pharmacyInfo) {
        pharmacy.value = pharmacyInfo
        console.log('✅ Infos de la pharmacie récupérées:', pharmacyInfo.nom)
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des infos de la pharmacie:', err)
    }
  }

  // Charger les produits de cette pharmacie
  if (pharmacyId) {
    try {
      await fetchPharmacyById(pharmacyId)
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err)
    }
  }
})

// Fonction pour réessayer le chargement en cas d'erreur
const retryLoading = async () => {
  const pharmacyId = route.params.id
  if (pharmacyId) {
    try {
      // Réessayer de charger les infos si on ne les a pas
      if (!pharmacy.value) {
        const pharmacyInfo = await fetchPharmacyInfoFromNearbyList(pharmacyId)
        if (pharmacyInfo) {
          pharmacy.value = pharmacyInfo
        }
      }
      // Charger les produits
      await fetchPharmacyById(pharmacyId)
    } catch (err) {
      console.error('Erreur lors du rechargement:', err)
    }
  }
}

// Définir la pharmacie dans le store quand elle change
watch(pharmacy, (newPharmacy) => {
  if (newPharmacy?.id && newPharmacy?.nom) {
    cartStore.setPharmacy(newPharmacy.id, newPharmacy.nom)
  }
}, { immediate: true })

const toggleProductSelection = (productId) => {
  const index = selectedProducts.value.indexOf(productId)
  if (index > -1) {
    // Retirer du tableau de sélection temporaire
    selectedProducts.value.splice(index, 1)
  } else {
    // Ajouter au tableau de sélection temporaire
    selectedProducts.value.push(productId)

    // Ajouter au panier (store)
    const product = products.value.find(p => p.id === productId)
    if (product) {
      cartStore.addItem(product, 1)
    }
  }
}

const clearSelection = () => {
  selectedProducts.value = []
}

const handleOrderSubmitted = (orderData) => {
  console.log('✅ Commande créée:', orderData)

  // Afficher le modal de succès
  showSuccessModal.value = true

  // Réinitialiser la sélection
  selectedProducts.value = []
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const goBack = () => {
  router.push({ name: 'home' })
}

const goToLogin = () => {
  router.push({ name: 'signin' })
}
</script>
