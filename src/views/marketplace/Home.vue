<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Landing Page Hero avec bannière -->
    <section
      v-if="showLandingPage"
      class="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/60"></div>

      <!-- Contenu -->
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <div class="mb-8">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
            Kenea
          </h1>
          <p class="text-xl md:text-2xl text-white/90">
            Votre santé, notre priorité
          </p>
        </div>

        <!-- Texte principal -->
        <div class="max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Trouvez vos médicaments facilement
          </h2>
          <p class="text-lg md:text-xl text-white/80">
            Commandez vos médicaments en ligne ou recherchez des produits spécifiques dans nos pharmacies partenaires
          </p>
        </div>

        <!-- Boutons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <!-- Achat direct -->
          <div class="relative group">
            <button
              @click="showMarketplace"
              class="relative px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[250px]"
            >
              <span class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Achat Direct
              </span>
            </button>

            <!-- Tooltip Achat Direct -->
            <div class="tooltip-elegant">
              <div class="tooltip-content">
                <div class="flex items-start gap-3 mb-3">
                  <!-- <div class="flex-shrink-0 w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div> -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Parcourir & Commander</h4>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      Explorez notre marketplace, sélectionnez les produits que vous souhaitez avec leurs prix affichés, et envoyez votre commande à la pharmacie de votre choix.
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-xs text-brand-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pas de connexion requise</span>
                </div>
              </div>
              <div class="tooltip-arrow"></div>
            </div>
          </div>

          <!-- Recherche -->
          <div class="relative group">
            <button
              @click="goToSearch"
              class="relative px-8 py-4 bg-white hover:bg-gray-50 text-brand-500 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[250px]"
            >
              <span class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Recherche
              </span>
            </button>

            <!-- Tooltip Recherche -->
            <div class="tooltip-elegant">
              <div class="tooltip-content">
                <div class="flex items-start gap-3 mb-3">
                 <!--  <div class="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div> -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Upload d'Ordonnance</h4>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      Connectez-vous pour uploader votre ordonnance médicale et l'envoyer à une ou plusieurs pharmacies. Recevez les réponses directement avec les prix et disponibilités.
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-xs text-purple-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Connexion requise</span>
                </div>
              </div>
              <div class="tooltip-arrow"></div>
            </div>
          </div>
        </div>

        <!-- Info supplémentaire -->
        <div class="mt-12">
          <p class="text-white/70 text-sm">
            Service disponible 24h/24 - Plus de 1000 produits disponibles
          </p>
        </div>
      </div>

      <!-- Bouton scroll vers le bas -->
      <button
        @click="showMarketplace"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80 hover:text-white transition-colors"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>

    <!-- Header/Navigation (affiché après le clic sur "Achat direct") -->
    <header v-if="!showLandingPage" class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center cursor-pointer" @click="backToLanding">
            <h1 class="text-2xl font-bold text-brand-500">
              Kenea
            </h1>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <a @click="backToLanding" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium cursor-pointer">Accueil</a>
            <a href="#pharmacies" class="text-gray-700 dark:text-gray-300 hover:text-brand-500 font-medium">Pharmacies</a>
          </nav>

          <!-- Bouton connexion -->
          <div class="flex items-center gap-4">
            <router-link to="/signin"
              class="px-4 py-2 text-brand-500 hover:text-brand-600 font-medium transition-colors">
              Se connecter
            </router-link>
            <router-link to="/signin"
              class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors">
              Espace Pro
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section v-if="!showLandingPage" class="bg-gradient-to-r from-brand-500 to-brand-600 text-white py-16">
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
    <section v-if="!showLandingPage" class="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" id="pharmacies">
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
    <section v-if="!showLandingPage" class="py-12">
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
    <footer v-if="!showLandingPage" class="bg-gray-800 dark:bg-gray-900 text-white py-12 mt-12">
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
const showLandingPage = ref(true)

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

// Afficher le marketplace (masquer le landing)
const showMarketplace = () => {
  showLandingPage.value = false
}

// Rediriger vers la recherche (page de connexion)
const goToSearch = () => {
  router.push('/signin')
}

// Retour au landing
const backToLanding = () => {
  showLandingPage.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* Tooltip élégant */
.tooltip-elegant {
  position: absolute;
  bottom: calc(100% + 20px);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1000;
  pointer-events: none;
}

.group:hover .tooltip-elegant {
  opacity: 1;
  visibility: visible;
  bottom: calc(100% + 15px);
}

.tooltip-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
              0 10px 30px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
  min-width: 320px;
  max-width: 380px;
}

.tooltip-arrow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transform: translateX(-50%) rotate(45deg);
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
}

/* Animation au survol */
@keyframes tooltipPulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.02);
  }
}

.group:hover .tooltip-elegant {
  animation: tooltipPulse 2s ease-in-out infinite;
}

/* Responsive */
@media (max-width: 640px) {
  .tooltip-content {
    min-width: 280px;
    max-width: 320px;
    padding: 16px;
  }

  .tooltip-elegant {
    left: 50%;
    right: auto;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .tooltip-content {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .tooltip-content h4 {
    color: #f9fafb;
  }

  .tooltip-content p {
    color: #d1d5db;
  }

  .tooltip-arrow {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
