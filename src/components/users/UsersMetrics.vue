<!-- src/components/users/UsersMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
    <!-- Total Utilisateurs Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900"
    >
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-blue-900/20"></div>
      
      <div class="relative">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Utilisateurs</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ totalUsers }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Utilisateurs enregistrés
            </p>
          </div>

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
              Tous
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Utilisateurs Actifs Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-green-200 dark:border-green-900/30 dark:from-green-950/20 dark:to-gray-900"
    >
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-green-900/20"></div>
      
      <div class="relative">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 transition-transform duration-300 group-hover:scale-110"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Utilisateurs Actifs</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ activeUsers }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Comptes activés
            </p>
          </div>

          <div
            class="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 shadow-sm dark:bg-green-900/30"
          >
            <span class="text-sm font-semibold text-green-600 dark:text-green-400">
              {{ activePercentage }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Nouveaux ce mois Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900"
    >
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-purple-900/20"></div>
      
      <div class="relative">
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Nouveaux ce mois</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ usersThisMonth }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Nouvelles inscriptions
            </p>
          </div>

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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">
              +{{ monthGrowth }}%
            </span>
          </div>
        </div>
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