<!-- src/components/pays/PaysVilleMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Pays -->
    <div
      class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Pays</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ paysCount }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pays enregistrés</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
          Actif
        </span>
      </div>
    </div>

    <!-- Total Villes -->
    <div
      class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Total Villes</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ villesCount }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Villes enregistrées</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
          Actif
        </span>
      </div>
    </div>

    <!-- Couverture -->
    <div
      class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Couverture</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ averageCoverage }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Villes par pays en moyenne
          </p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" />
          </svg>
          {{ coveragePercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const { paysList, citiesList, fetchPaysList, fetchCitiesList } = usePaysVille()
const showDeleted = ref(false)

const paysCount = computed(() => paysList.value.length)
const villesCount = computed(() => citiesList.value.length)

const averageCoverage = computed(() => {
  if (paysCount.value === 0) return '0'
  const avg = villesCount.value / paysCount.value
  return avg.toFixed(1)
})

const coveragePercentage = computed(() => {
  if (paysCount.value === 0) return '0'
  const coverage = Math.min((villesCount.value / (paysCount.value * 10)) * 100, 100)
  return coverage.toFixed(0)
})

onMounted(() => {
  if (paysList.value.length === 0) fetchPaysList(showDeleted.value)
  if (citiesList.value.length === 0) fetchCitiesList(showDeleted.value)
})
</script>
