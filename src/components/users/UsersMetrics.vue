<!-- src/components/users/UsersMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Utilisateurs -->
    <div
      class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Utilisateurs</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalUsers }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Utilisateurs enregistrés</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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

    <!-- Utilisateurs Actifs -->
    <div
      class="overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-200 dark:border-green-900/30 dark:from-green-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-green-600 dark:text-green-400">Actifs</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ activeUsers }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Comptes activés</p>
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

    <!-- Nouveaux ce mois -->
    <div
      class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Nouveaux ce mois</p>
          <h4 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ usersThisMonth }}</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Nouvelles inscriptions</p>
        </div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
import { useUsers } from '@/composables/users/useUsers'

const { usersList, fetchUsers } = useUsers()

const totalUsers = computed(() => usersList.value.length)

const activeUsers = computed(() => {
  return usersList.value.filter(user => user.enabled && !user.locked).length
})

const activePercentage = computed(() => {
  if (totalUsers.value === 0) return '0'
  return ((activeUsers.value / totalUsers.value) * 100).toFixed(0)
})

const usersThisMonth = computed(() => {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return usersList.value.filter(user => {
    const createdDate = new Date(user.createAt)
    return createdDate >= firstDayOfMonth
  }).length
})

const monthGrowth = computed(() => {
  if (totalUsers.value === 0) return '0'

  const growth = (usersThisMonth.value / totalUsers.value) * 100
  return growth.toFixed(0)
})

onMounted(async () => {
  if (usersList.value.length === 0) {
    await fetchUsers()
  }
})
</script>