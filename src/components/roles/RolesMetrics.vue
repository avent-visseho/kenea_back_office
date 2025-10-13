<!-- src/components/roles/RolesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
    <!-- Total Rôles Card -->
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Total Rôles</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ totalRoles }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Rôles configurés
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
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Tous
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Privilèges Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-200 dark:border-indigo-900/30 dark:from-indigo-950/20 dark:to-gray-900"
    >
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-indigo-900/20"></div>
      
      <div class="relative">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110"
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Total Privilèges</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ totalPrivileges }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Permissions assignées
            </p>
          </div>

          <div
            class="flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 shadow-sm dark:bg-indigo-900/30"
          >
            <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {{ avgPrivilegesPerRole }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rôle le plus utilisé Card -->
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Plus complet</p>
            <h4 class="mt-2 text-xl font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
              {{ mostPrivilegedRole }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ mostPrivilegedCount }} privilèges
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
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