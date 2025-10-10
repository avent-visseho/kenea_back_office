<!-- src/components/ordonnances/OrdonnancesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
    <!-- Total Ordonnances -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:via-gray-900 dark:to-blue-950/10"
    >
      <div class="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      
      <div class="relative">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div class="mt-5">
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Ordonnances</p>
          <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {{ totalOrdonnances }}
          </h4>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Toutes les ordonnances
          </p>
        </div>
      </div>
    </div>

    <!-- En attente -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-200 dark:border-amber-900/30 dark:from-amber-950/20 dark:via-gray-900 dark:to-amber-950/10"
    >
      <div class="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      
      <div class="relative">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div class="mt-5">
          <p class="text-sm font-medium text-amber-600 dark:text-amber-400">En attente</p>
          <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {{ pendingOrdonnances }}
          </h4>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            À traiter
          </p>
        </div>
      </div>
    </div>

    <!-- Validées -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:via-gray-900 dark:to-emerald-950/10"
    >
      <div class="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      
      <div class="relative">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div class="mt-5">
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Validées</p>
          <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {{ validatedOrdonnances }}
          </h4>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Traitées avec succès
          </p>
        </div>
      </div>
    </div>

    <!-- Rejetées -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200 dark:border-red-900/30 dark:from-red-950/20 dark:via-gray-900 dark:to-red-950/10"
    >
      <div class="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-red-400/20 to-red-600/20 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
      
      <div class="relative">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div class="mt-5">
          <p class="text-sm font-medium text-red-600 dark:text-red-400">Rejetées</p>
          <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {{ rejectedOrdonnances }}
          </h4>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Non validées
          </p>
        </div>
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