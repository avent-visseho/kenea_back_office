<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Progressions -->
    <div
      class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Total Progressions</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalProgressions }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Toutes les progressions</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          Tous
        </span>
      </div>
    </div>

    <!-- En cours -->
    <div
      class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">En cours</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ inProgressCount }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">À traiter</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {{ inProgressPercentage }}%
        </span>
      </div>
    </div>

    <!-- Complétées -->
    <div
      class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Complétées</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ completedCount }}</h4>
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
          {{ completedPercentage }}%
        </span>
      </div>
    </div>

    <!-- Supprimées -->
    <div
      class="overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-red-200 dark:border-red-900/30 dark:from-red-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-red-600 dark:text-red-400">Supprimées</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ deletedCount }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Archivées</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {{ deletedPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progressions: {
    type: Array,
    default: () => []
  }
})

const totalProgressions = computed(() => props.progressions.filter(p => !p.deleted).length)

const inProgressCount = computed(() =>
  props.progressions.filter(p => !p.deleted && p.statut === 'PENDING').length
)

const completedCount = computed(() =>
  props.progressions.filter(p => !p.deleted && p.statut === 'COMPLETED').length
)

const deletedCount = computed(() =>
  props.progressions.filter(p => p.deleted).length
)

const inProgressPercentage = computed(() => {
  const total = totalProgressions.value
  return total === 0 ? 0 : Math.round((inProgressCount.value / total) * 100)
})

const completedPercentage = computed(() => {
  const total = totalProgressions.value
  return total === 0 ? 0 : Math.round((completedCount.value / total) * 100)
})

const deletedPercentage = computed(() => {
  const total = props.progressions.length
  return total === 0 ? 0 : Math.round((deletedCount.value / total) * 100)
})
</script>