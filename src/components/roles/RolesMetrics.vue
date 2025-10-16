<!-- src/components/roles/RolesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Rôles -->
    <div
      class="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:border-indigo-900/30 dark:from-indigo-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Total Rôles</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalRoles }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Rôles enregistrés</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v4m0 0v4m0-4h4m-4 0H8m4 8v4m0 0v-4m0 0h4m-4 0H8" />
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

    <!-- Rôles Actifs -->
    <div
      class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Actifs</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ activeRoles }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Rôles activés</p>
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
          {{ activePercentage }}%
        </span>
      </div>
    </div>

    <!-- Nouveaux ce mois -->
    <div
      class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Nouveaux ce mois</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ rolesThisMonth }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Rôles ajoutés</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v4m0 0v4m0-4h4m-4 0H8m0 8v4m0 0v-4m0 0h4m-4 0H8" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          +{{ monthGrowth }}%
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import { useRoles } from '@/composables/roles/useRoles'

const { rolesList, fetchRoles } = useRoles()

const totalRoles = computed(() => rolesList.value.length)

const totalPrivileges = computed(() => {
  return rolesList.value.reduce((total, role) => {
    return total + (role.privilegeIds?.length || 0)
  }, 0)
})

const avgPrivilegesPerRole = computed(() => {
  if (totalRoles.value === 0) return '0'
  return (totalPrivileges.value / totalRoles.value).toFixed(1)
})

const mostPrivilegedRole = computed(() => {
  if (rolesList.value.length === 0) return 'N/A'

  const sorted = [...rolesList.value].sort((a, b) => {
    const aCount = a.privilegeIds?.length || 0
    const bCount = b.privilegeIds?.length || 0
    return bCount - aCount
  })

  return sorted[0]?.name || 'N/A'
})

const mostPrivilegedCount = computed(() => {
  if (rolesList.value.length === 0) return 0

  const sorted = [...rolesList.value].sort((a, b) => {
    const aCount = a.privilegeIds?.length || 0
    const bCount = b.privilegeIds?.length || 0
    return bCount - aCount
  })

  return sorted[0]?.privilegeIds?.length || 0
})

onMounted(async () => {
  if (rolesList.value.length === 0) {
    await fetchRoles()
  }
})
</script>