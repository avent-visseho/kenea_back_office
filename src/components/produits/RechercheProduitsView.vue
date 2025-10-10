<!-- src/views/produits/RechercheProduitsView.vue -->
<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <!-- Barre de recherche principale -->
      <div class="col-span-12">
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rechercher un produit
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Entrez le nom du produit..." 
                  @keyup.enter="handleSearch"
                  class="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div class="flex-shrink-0 pt-7">
              <button 
                @click="handleSearch" 
                :disabled="isSearching || !searchQuery.trim()"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg v-if="!isSearching" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSearching ? 'Recherche...' : 'Rechercher' }}
              </button>
            </div>
          </div>

          <!-- Filtres avancés -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pharmacie spécifique
                </label>
                <select 
                  v-model="selectedPharmacieId"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option value="">Toutes les pharmacies</option>
                  <option v-for="pharmacie in pharmaciesList" :key="pharmacie.id" :value="pharmacie.id">
                    {{ pharmacie.nom || pharmacie.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mode de recherche
                </label>
                <div class="flex gap-3">
                  <button 
                    @click="searchMode = 'standard'"
                    :class="[
                      'flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors',
                      searchMode === 'standard'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    ]">
                    Standard
                  </button>
                  <button 
                    @click="searchMode = 'geolocalisation'"
                    :class="[
                      'flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors',
                      searchMode === 'geolocalisation'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    ]">
                    Géolocalisation
                  </button>
                </div>
              </div>
            </div>

            <!-- Géolocalisation (si mode activé) -->
            <div v-if="searchMode === 'geolocalisation'" class="mt-4">
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Recherche basée sur votre position
                    </p>
                    <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Les produits seront classés par proximité des pharmacies
                    </p>
                    <button 
                      @click="getGeolocation"
                      :disabled="isGettingLocation"
                      class="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                      <svg v-if="!isGettingLocation" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isGettingLocation ? 'Localisation...' : userLocation ? 'Position obtenue ✓' : 'Obtenir ma position' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Résultats de recherche -->
      <div class="col-span-12">
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
              Résultats de recherche
              <span v-if="searchResults.length > 0" class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({{ searchResults.length }} produit{{ searchResults.length > 1 ? 's' : '' }} trouvé{{ searchResults.length > 1 ? 's' : '' }})
              </span>
            </h3>
          </div>

          <!-- Liste des résultats -->
          <div class="p-6">
            <div v-if="isSearching" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>

            <div v-else-if="searchResults.length === 0 && hasSearched" class="text-center py-12">
              <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Aucun produit trouvé</p>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Essayez avec un autre nom ou changez les filtres
              </p>
            </div>

            <div v-else-if="searchResults.length === 0 && !hasSearched" class="text-center py-12">
              <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Commencez votre recherche</p>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Entrez le nom d'un produit pour rechercher dans notre catalogue
              </p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="produit in searchResults" 
                :key="produit.id"
                class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 hover:shadow-lg transition-all dark:border-gray-800 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]">
                <div class="flex items-start gap-4">
                  <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                    <svg class="h-7 w-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 dark:text-white truncate">
                      {{ produit.nom }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {{ produit.description || 'Pas de description' }}
                    </p>
                    <div class="flex items-center gap-2 mt-3">
                      <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-500">
                        {{ formatPrice(produit.prix) }} FCFA
                      </span>
                      <span class="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-500">
                        {{ produit.categorieName }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span class="truncate">{{ produit.pharmacieName }}</span>
                    </div>
                    <div v-if="searchMode === 'geolocalisation' && produit.distance" class="flex items-center gap-2 mt-2 text-sm text-purple-600 dark:text-purple-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{{ produit.distance }} km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { useProduits } from '@/composables/pharmacie/useProduits'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'

const currentPageTitle = ref('Recherche de Produits')

const { searchProduits, suggestProduits } = useProduits()
const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()

const searchQuery = ref('')
const selectedPharmacieId = ref('')
const searchMode = ref('standard')
const isSearching = ref(false)
const hasSearched = ref(false)
const searchResults = ref([])
const userLocation = ref(null)
const isGettingLocation = ref(false)
const showDeleted = ref(false)


const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('fr-FR').format(price)
}

const getGeolocation = () => {
  isGettingLocation.value = true
  
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        isGettingLocation.value = false
        console.log('✅ Position obtenue:', userLocation.value)
      },
      (error) => {
        console.error('❌ Erreur géolocalisation:', error)
        alert('Impossible d\'obtenir votre position. Veuillez activer la géolocalisation.')
        isGettingLocation.value = false
      }
    )
  } else {
    alert('La géolocalisation n\'est pas supportée par votre navigateur')
    isGettingLocation.value = false
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  isSearching.value = true
  hasSearched.value = true
  searchResults.value = []

  try {
    let result

    if (searchMode.value === 'geolocalisation') {
      // Recherche par géolocalisation
      if (!userLocation.value) {
        alert('Veuillez d\'abord obtenir votre position')
        isSearching.value = false
        return
      }

      result = await suggestProduits({
        clientLat: userLocation.value.latitude,
        clientLon: userLocation.value.longitude,
        nomProduit: searchQuery.value
      })
    } else {
      // Recherche standard
      result = await searchProduits({
        nom: searchQuery.value,
        pharmacieId: selectedPharmacieId.value || ''
      })
    }

    if (result.success) {
      searchResults.value = result.data
      console.log('✅ Résultats:', searchResults.value)
    } else {
      console.log('⚠️ Aucun résultat:', result.error)
    }
  } catch (error) {
    console.error('❌ Erreur recherche:', error)
    alert('Une erreur est survenue lors de la recherche')
  } finally {
    isSearching.value = false
  }
}

onMounted(async () => {
  if (pharmaciesList.value.length === 0) {
    await fetchPharmaciesList(showDeleted.value)
  }
})
</script>