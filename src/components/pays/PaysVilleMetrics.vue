<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
    <!-- Pays Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900"
    >
      <!-- Decorative Background Element -->
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-blue-900/20"></div>
      
      <div class="relative">
        <!-- Icon -->
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            class="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Pays</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ paysCount }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Pays enregistrés
            </p>
          </div>

          <!-- Badge -->
          <div
            class="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 shadow-sm dark:bg-blue-900/30"
          >
            <svg
              class="h-4 w-4 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Actif
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Villes Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900"
    >
      <!-- Decorative Background Element -->
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-purple-900/20"></div>
      
      <div class="relative">
        <!-- Icon -->
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            class="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Total Villes</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ villesCount }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Villes enregistrées
            </p>
          </div>

          <!-- Badge -->
          <div
            class="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 shadow-sm dark:bg-purple-900/30"
          >
            <svg
              class="h-4 w-4 text-purple-600 dark:text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Actif
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Couverture Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900"
    >
      <!-- Decorative Background Element -->
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-emerald-900/20"></div>
      
      <div class="relative">
        <!-- Icon -->
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            class="h-7 w-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Couverture</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ averageCoverage }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Villes par pays en moyenne
            </p>
          </div>

          <!-- Badge -->
          <div
            class="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 shadow-sm dark:bg-emerald-900/30"
          >
            <svg
              class="h-4 w-4 text-emerald-600 dark:text-emerald-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {{ coveragePercentage }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const { paysList, citiesList, fetchPaysList, fetchCitiesList } = usePaysVille()

// Nombre de pays
const paysCount = computed(() => paysList.value.length)

// Nombre de villes
const villesCount = computed(() => citiesList.value.length)

// Moyenne de villes par pays
const averageCoverage = computed(() => {
  if (paysCount.value === 0) return '0'
  const avg = villesCount.value / paysCount.value
  return avg.toFixed(1)
})

// Pourcentage de couverture (simulé - vous pouvez ajuster la logique)
const coveragePercentage = computed(() => {
  if (paysCount.value === 0) return '0'
  // Simulation: on considère qu'un pays bien couvert a 10 villes
  const coverage = Math.min((villesCount.value / (paysCount.value * 10)) * 100, 100)
  return coverage.toFixed(0)
})

onMounted(() => {
  // Charger les données si elles ne sont pas déjà chargées
  if (paysList.value.length === 0) {
    fetchPaysList()
  }
  if (citiesList.value.length === 0) {
    fetchCitiesList()
  }
})
</script>