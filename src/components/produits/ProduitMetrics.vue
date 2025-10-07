<!-- src/components/produit/ProduitMetrics.vue -->
<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Produits -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="p-5">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Produits</p>
            <div class="mt-2 flex items-baseline gap-2">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalProduits }}
              </h3>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
            <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-500/15 dark:text-purple-400">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Produits actifs
          </span>
        </div>
      </div>
    </div>

    <!-- Valeur Totale Stock -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="p-5">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Valeur Stock</p>
            <div class="mt-2 flex items-baseline gap-2">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ formatPrice(valeurTotaleStock) }}
              </h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">FCFA</span>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
            <svg class="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Inventaire total
          </span>
        </div>
      </div>
    </div>

    <!-- Pharmacies Partenaires -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="p-5">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pharmacies</p>
            <div class="mt-2 flex items-baseline gap-2">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalPharmacies }}
              </h3>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
            <svg class="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Partenaires actifs
          </span>
        </div>
      </div>
    </div>

    <!-- Catégories -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="p-5">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Catégories</p>
            <div class="mt-2 flex items-baseline gap-2">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ totalCategories }}
              </h3>
            </div>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Classifications
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProduits } from '@/composables/pharmacie/useProduits'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'

const { produitsList, fetchProduitsList } = useProduits()
const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()
const { categoriesList, fetchCategories } = useProduitsCategorie()

const totalProduits = computed(() => {
  return produitsList.value.length
})

const valeurTotaleStock = computed(() => {
  return produitsList.value.reduce((total, produit) => {
    return total + (produit.prix || 0)
  }, 0)
})

const totalPharmacies = computed(() => {
  // Compter les pharmacies uniques dans les produits
  const pharmaciesUniques = new Set(
    produitsList.value
      .map(p => p.pharmacieNameId || p.pharmacieId)
      .filter(Boolean)
  )
  return pharmaciesUniques.size
})

const totalCategories = computed(() => {
  // Compter les catégories uniques dans les produits
  const categoriesUniques = new Set(
    produitsList.value
      .map(p => p.categorieId)
      .filter(Boolean)
  )
  return categoriesUniques.size
})

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('fr-FR').format(price)
}

onMounted(async () => {
  if (produitsList.value.length === 0) {
    await fetchProduitsList()
  }
  if (pharmaciesList.value.length === 0) {
    await fetchPharmaciesList()
  }
  if (categoriesList.value.length === 0) {
    await fetchCategories()
  }
})
</script>