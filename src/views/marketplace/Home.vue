<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header/Navigation -->
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-brand-500">
              Kenea Marketplace
            </h1>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">
              Accueil
            </a>
            <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">
              Pharmacies
            </a>
            <a href="#" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">
              À propos
            </a>
          </nav>

          <!-- Bouton connexion -->
          <div class="flex items-center gap-4">
            <button
              @click="goToLogin"
              class="px-4 py-2 text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              Se connecter
            </button>
            <button
              @click="goToLogin"
              class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
            >
              Espace Pro
            </button>
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
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une pharmacie, un service..."
                class="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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
              class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-brand-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrer
            </button>
            <button
              class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-brand-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Trier
            </button>
          </div>
        </div>

        <!-- Grille de cartes -->
        <div v-if="filteredPharmacies.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PharmacyCard
            v-for="pharmacy in filteredPharmacies"
            :key="pharmacy.id"
            :pharmacy="pharmacy"
            @click="goToPharmacy"
          />
        </div>

        <!-- Message si aucun résultat -->
        <div v-else class="text-center py-16">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PharmacyCard from '@/components/marketplace/PharmacyCard.vue'
import { mockPharmacies, searchPharmacies } from '@/data/mockPharmacies'

const router = useRouter()
const searchQuery = ref('')

// Pharmacies filtrées selon la recherche
const filteredPharmacies = computed(() => {
  return searchPharmacies(searchQuery.value)
})

// Navigation vers la page de détails d'une pharmacie
const goToPharmacy = (pharmacyId) => {
  router.push({ name: 'pharmacy-details', params: { id: pharmacyId } })
}

// Navigation vers la page de connexion
const goToLogin = () => {
  router.push({ name: 'signin' })
}
</script>
