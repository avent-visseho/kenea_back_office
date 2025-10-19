<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- Header Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
      <!-- Total Groupes -->
      <div
        class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total Groupes</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ totalGroupes }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-6">Groupes créés</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Sous-Groupes (placeholder) -->
      <div
        class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Gestion</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Groupes</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-7">et sous-groupes</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Status Badge -->
      <div
        class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Système</p>
            <h4 class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Actif</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-7">Prêt à l'emploi</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>


    <!-- Main Content -->
    <div class="col-span-12">
      <GroupesList />
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import GroupesList from '@/components/groupe/GroupesList.vue'
import { useGroupes } from '@/composables/groupe/useGroupes'

const currentPageTitle = ref('Gestion des Groupes')
const { groupesList, fetchAllGroupes } = useGroupes()

const totalGroupes = computed(() => groupesList.value.length)

onMounted(async () => {
  await fetchAllGroupes()
})
</script>