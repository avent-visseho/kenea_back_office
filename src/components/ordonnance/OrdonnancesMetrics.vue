<!-- src/components/ordonnances/OrdonnancesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Ordonnances -->
    <div
      class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Ordonnances</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalOrdonnances }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Toutes les ordonnances</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          Tous
        </span>
      </div>
    </div>

    <!-- En attente -->
    <div
      class="overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-200 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-amber-600 dark:text-amber-400">En attente</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ pendingOrdonnances }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">À traiter</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          {{ pendingPercentage }}%
        </span>
      </div>
    </div>

    <!-- Validées -->
    <div
      class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Validées</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ validatedOrdonnances }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Traitées avec succès</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          {{ validatedPercentage }}%
        </span>
      </div>
    </div>

    <!-- Rejetées -->
    <div
      class="overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-red-200 dark:border-red-900/30 dark:from-red-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-red-600 dark:text-red-400">Rejetées</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ rejectedOrdonnances }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Non validées</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {{ rejectedPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>




<script setup>
import { computed } from 'vue'

const props = defineProps({
  ordonnances: {
    type: Array,
    default: () => []
  }
})

const totalOrdonnances = computed(() => props.ordonnances.length)

const pendingOrdonnances = computed(() =>
  props.ordonnances.filter(o => o.etat === 'PENDING').length
)

const validatedOrdonnances = computed(() =>
  props.ordonnances.filter(o => o.etat === 'VALIDATED' || o.etat === 'APPROVED').length
)

const rejectedOrdonnances = computed(() =>
  props.ordonnances.filter(o => o.etat === 'REJECTED' || o.etat === 'CANCELLED').length
)
</script>