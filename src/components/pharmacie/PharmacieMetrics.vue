<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Pharmacies -->
    <div
      class="overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-200 dark:border-teal-900/30 dark:from-teal-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-teal-600 dark:text-teal-400">Total Pharmacies</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ pharmaciesCount }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pharmacies enregistrées</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
          Actif
        </span>
      </div>
    </div>

    <!-- Villes Couvertes -->
    <div
      class="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:border-indigo-900/30 dark:from-indigo-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Villes couvertes</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ villesCouvertes }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Avec au moins une pharmacie</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          {{ coveragePercentage }}%
        </span>
      </div>
    </div>

    <!-- Moyenne par Ville -->
    <div
      class="overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-200 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-amber-600 dark:text-amber-400">Moyenne</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ averagePerVille }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pharmacies par ville</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" />
          </svg>
          Optimal
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted ,ref} from 'vue'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()
const { citiesList, fetchCitiesList } = usePaysVille()

// Nombre total de pharmacies
const pharmaciesCount = computed(() => pharmaciesList.value.length)

const showDeleted = ref(false)


// Nombre de villes couvertes (avec au moins une pharmacie)
const villesCouvertes = computed(() => {
  if (pharmaciesList.value.length === 0) return 0
  
  const villesUniques = new Set()
  pharmaciesList.value.forEach(pharmacie => {
    if (pharmacie.ville_id || pharmacie.city_id) {
      villesUniques.add(pharmacie.ville_id || pharmacie.city_id)
    }
  })
  
  return villesUniques.size
})

// Pourcentage de couverture des villes
const coveragePercentage = computed(() => {
  const totalVilles = citiesList.value.length
  if (totalVilles === 0) return '0'
  
  const percentage = (villesCouvertes.value / totalVilles) * 100
  return percentage.toFixed(0)
})

// Moyenne de pharmacies par ville couverte
const averagePerVille = computed(() => {
  if (villesCouvertes.value === 0) return '0'
  
  const avg = pharmaciesCount.value / villesCouvertes.value
  return avg.toFixed(1)
})

onMounted(async () => {
  // Charger les données si elles ne sont pas déjà chargées
  if (pharmaciesList.value.length === 0) {
    await fetchPharmaciesList(showDeleted.value)
  }
  if (citiesList.value.length === 0) {
    await fetchCitiesList(showDeleted.value)
  }
})
</script>