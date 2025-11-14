<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header/Navigation -->
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-brand-500">
              Kenea
            </h1>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <router-link to=""
              class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">Accueil</router-link>
            <router-link to=""
              class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">Pharmacies</router-link>
            <router-link to="" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium"> À
              propos</router-link>
          </nav>

          <!-- Bouton connexion -->
          <div class="flex items-center gap-4">
            <router-link to="/signin"
              class="px-4 py-2 text-brand-500 hover:text-brand-600 font-medium transition-colors"> Se
              connecter</router-link>
            <router-link to="/signin"
              class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors">
              Espace Pro</router-link>

            <!--             <button
              @click="goToLogin"
              class="px-4 py-2 text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              Se connecter
            </button> -->
            <!--  <button
              @click="goToLogin"
              class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
            >
              Espace Pro
            </button> -->
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-brand-500 to-brand-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Trouvez votre pharmacie facilement
          </h2>
          <p class="text-xl text-brand-50 mb-8">
            Découvrez les pharmacies près de chez vous et commandez vos médicaments en ligne
          </p>

          <!-- Barre de recherche -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Rechercher une pharmacie, un service..."
                class="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-300" />
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistiques -->
    <section class="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-brand-500 mb-1">{{ filteredPharmacies.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Pharmacies disponibles</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-brand-500 mb-1">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Service disponible</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-brand-500 mb-1">1000+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Produits</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-brand-500 mb-1">4.7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Liste des pharmacies -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Titre et filtres -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Pharmacies près de vous
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ filteredPharmacies.length }} pharmacie(s) trouvée(s)
            </p>
          </div>

          <!-- Filtres -->
          <div class="flex gap-3">
            <button
              class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-brand-500 transition-colors text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtrer
            </button>
            <button
              class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-brand-500 transition-colors text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Trier
            </button>
          </div>
        </div>

        <!-- État de chargement -->
        <div v-if="isLoading" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Chargement des pharmacies proches...</p>
        </div>

        <!-- Message d'erreur -->
        <div v-else-if="error"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="flex-1">
              <h3 class="text-red-800 dark:text-red-300 font-semibold mb-1">Erreur de chargement</h3>
              <p class="text-red-700 dark:text-red-400 text-sm mb-3">{{ error }}</p>
              <button @click="retryLoading"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                Réessayer
              </button>
            </div>
          </div>
        </div>

        <!-- Alerte géolocalisation -->
        <div v-else-if="locationError"
          class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="text-yellow-800 dark:text-yellow-300 text-sm">
                {{ locationError }} Affichage des pharmacies avec position par défaut.
              </p>
            </div>
          </div>
        </div>

        <!-- Grille de cartes -->
        <div v-if="!isLoading && !error && filteredPharmacies.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PharmacyCard v-for="pharmacy in filteredPharmacies" :key="pharmacy.id" :pharmacy="pharmacy"
            @click="goToPharmacy" />
        </div>

        <!-- Message si aucun résultat -->
        <div v-else-if="!isLoading && !error && filteredPharmacies.length === 0" class="text-center py-16">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Aucune pharmacie trouvée
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Essayez de modifier votre recherche
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 dark:bg-gray-900 text-white py-12 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 class="text-lg font-bold mb-4">Kenea Marketplace</h4>
            <p class="text-gray-400 text-sm">
              Votre plateforme de confiance pour trouver des pharmacies et commander vos médicaments en ligne.
            </p>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Liens rapides</h5>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">Accueil</a></li>
              <li><a href="#" class="hover:text-white">Pharmacies</a></li>
              <li><a href="#" class="hover:text-white">À propos</a></li>
              <li><a href="#" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Services</h5>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">Commander en ligne</a></li>
              <li><a href="#" class="hover:text-white">Consultation</a></li>
              <li><a href="#" class="hover:text-white">Livraison</a></li>
              <li><a href="#" class="hover:text-white">Aide</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Contact</h5>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>Email: contact@kenea.sn</li>
              <li>Tél: +221 33 821 2345</li>
              <li>Dakar, Sénégal</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Kenea Marketplace. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PharmacyCard from '@/components/marketplace/PharmacyCard.vue'
import { useMarketPlace } from '@/composables/marketPlace/useMarketPlace'

const router = useRouter()
const searchQuery = ref('')

// Utilisation du composable marketplace
const {
  pharmacies,
  isLoading,
  error,
  locationError,
  fetchNearbyPharmacies,
  filterPharmaciesLocally
} = useMarketPlace()

// Pharmacies filtrées selon la recherche
const filteredPharmacies = computed(() => {
  return filterPharmaciesLocally(searchQuery.value)
})

// Chargement initial des pharmacies au montage du composant
onMounted(async () => {
  try {
    await fetchNearbyPharmacies(50) // Charger jusqu'à 50 pharmacies proches
  } catch (err) {
    console.error('Erreur lors du chargement initial:', err)
  }
})

// Fonction pour réessayer le chargement en cas d'erreur
const retryLoading = async () => {
  try {
    await fetchNearbyPharmacies(50)
  } catch (err) {
    console.error('Erreur lors du rechargement:', err)
  }
}

// Navigation vers la page de détails d'une pharmacie
const goToPharmacy = (pharmacy) => {
  // Passer l'objet pharmacie complet via router state
  router.push({
    name: 'pharmacy-details',
    params: { id: pharmacy.id },
    state: { pharmacy } // ← Passer l'objet complet ici
  })
}

// Navigation vers la page de connexion
const goToLogin = () => {
  router.push({ name: 'signin' })
}
</script>
