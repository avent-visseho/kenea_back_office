<!-- src/components/privileges/PrivilegesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Privilèges -->
    <div
      class="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:border-indigo-900/30 dark:from-indigo-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Total Privilèges</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalPrivileges }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Permissions définies</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          Tous
        </span>
      </div>
    </div>

    <!-- Privilèges Actifs -->
    <div
      class="overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-200 dark:border-green-900/30 dark:from-green-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-green-600 dark:text-green-400">Actifs</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ activePrivileges }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Permissions utilisables</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {{ activePercentage }}%
        </span>
      </div>
    </div>

    <!-- Privilèges Supprimés -->
    <div
      class="overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-red-200 dark:border-red-900/30 dark:from-red-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-red-600 dark:text-red-400">Supprimés</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ deletedPrivileges }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Permissions archivées</p>
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
          {{ ((deletedPrivileges / totalPrivileges) * 100).toFixed(0) }}%
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import { usePrivileges } from '@/composables/privileges/usePrivileges'

const { privilegesList, fetchPrivileges } = usePrivileges()

const totalPrivileges = computed(() => privilegesList.value.length)

const activePrivileges = computed(() => {
  return privilegesList.value.filter(privilege => !privilege.deleted).length
})

const deletedPrivileges = computed(() => {
  return privilegesList.value.filter(privilege => privilege.deleted).length
})

const activePercentage = computed(() => {
  if (totalPrivileges.value === 0) return '0'
  return ((activePrivileges.value / totalPrivileges.value) * 100).toFixed(0)
})

onMounted(async () => {
  if (privilegesList.value.length === 0) {
    await fetchPrivileges({ supprime: false })
  }
})
</script>