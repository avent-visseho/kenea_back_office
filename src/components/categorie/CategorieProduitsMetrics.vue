<!-- src/components/categorie/CategorieProduitsMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Catégories -->
    <div
      class="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Total Catégories</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ totalCategories }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Catégories enregistrées</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
          Actif
        </span>
      </div>
    </div>

    <!-- Catégories Récentes -->
    <div
      class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Ajoutées ce mois</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ categoriesThisMonth }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Nouvelles catégories</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
          </svg>
          +{{ monthGrowth }}%
        </span>
      </div>
    </div>

    <!-- Catégories avec Description -->
    <div
      class="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Complétude</p>
          <h4 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {{ completionRate }}%
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Avec description</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
          Bon
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'

const { categoriesList, fetchCategories } = useProduitsCategorie()

// Nombre total de catégories
const totalCategories = computed(() => categoriesList.value.length)

const showDeleted = ref(false)


// Catégories ajoutées ce mois
const categoriesThisMonth = computed(() => {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return categoriesList.value.filter(categorie => {
    const createdDate = new Date(categorie.createdAt || categorie.created_at)
    return createdDate >= firstDayOfMonth
  }).length
})

// Taux de croissance mensuel
const monthGrowth = computed(() => {
  if (totalCategories.value === 0) return '0'

  const growth = (categoriesThisMonth.value / totalCategories.value) * 100
  return growth.toFixed(0)
})

// Taux de complétion (catégories avec description)
const completionRate = computed(() => {
  if (totalCategories.value === 0) return '0'

  const withDescription = categoriesList.value.filter(categorie =>
    categorie.description && categorie.description.trim().length > 0
  ).length

  const rate = (withDescription / totalCategories.value) * 100
  return rate.toFixed(0)
})

onMounted(async () => {
  // Charger les données si elles ne sont pas déjà chargées
  if (categoriesList.value.length === 0) {
    await fetchCategories(showDeleted.value)
  }
})
</script>