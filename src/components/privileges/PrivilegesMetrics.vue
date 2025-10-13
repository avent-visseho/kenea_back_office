<!-- src/components/privileges/PrivilegesMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
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
              Permissions définies
            </p>
          </div>

          <div
            class="flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 shadow-sm dark:bg-indigo-900/30"
          >
            <svg
              class="h-4 w-4 text-indigo-600 dark:text-indigo-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Tous
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Privilèges Actifs Card -->
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
            <p class="text-sm font-medium text-green-600 dark:text-green-400">Privilèges Actifs</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ activePrivileges }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Permissions utilisables
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

    <!-- Privilèges Supprimés Card -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200 dark:border-red-900/30 dark:from-red-950/20 dark:to-gray-900"
    >
      <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-100/50 blur-2xl transition-all duration-300 group-hover:scale-150 dark:bg-red-900/20"></div>
      
      <div class="relative">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-110"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <div class="mt-5 flex items-end justify-between">
          <div>
            <p class="text-sm font-medium text-red-600 dark:text-red-400">Privilèges Supprimés</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {{ deletedPrivileges }}
            </h4>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Permissions archivées
            </p>
          </div>

          <div
            class="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 shadow-sm dark:bg-red-900/30"
          >
            <svg
              class="h-4 w-4 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
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