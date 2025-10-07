<!-- src/components/produit/ProduitsList.vue -->
<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Produits
        </h3>

        <div class="flex items-center gap-3">
          <!-- Import -->
          <button @click="showImportModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importer CSV
          </button>

          <!-- Export -->
          <button @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Exporter CSV
          </button>

          <!-- Nouveau -->
          <button @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-purple-700 shadow-theme-xs">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau produit
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un produit..."
            class="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:border-purple-300 focus:outline-none focus:ring-3 focus:ring-purple-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Produit</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prix</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Pharmacie</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Catégorie</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Code barre</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="6" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredProduits.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="6" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucun produit trouvé
            </td>
          </tr>
          <tr v-else v-for="produit in filteredProduits" :key="produit.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
            <!-- Produit -->
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ produit.nom }}
                  </p>
                  <p class="text-gray-500 text-theme-xs dark:text-gray-400 mt-0.5">
                    {{ produit.code }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Prix -->
            <td class="py-3 whitespace-nowrap">
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-theme-xs font-medium text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-500">
                {{ formatPrice(produit.prix) }} FCFA
              </span>
            </td>

            <!-- Pharmacie -->
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ produit.pharmacieName || 'N/A' }}
              </p>
            </td>

            <!-- Catégorie -->
            <td class="py-3 whitespace-nowrap">
              <span class="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-theme-xs font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-500">
                {{ produit.categorieName || 'N/A' }}
              </span>
            </td>

            <!-- Code barre -->
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-xs dark:text-gray-400 font-mono">
                {{ produit.codeBarre || 'N/A' }}
              </p>
            </td>

            <!-- Actions -->
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="editProduit(produit)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Modifier">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(produit)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                  title="Supprimer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <ProduitModal v-if="showProduitModal" :produit-data="editingProduit" @close="closeProduitModal" @success="handleProduitSuccess" />

    <ImportProduitsCsvModal v-if="showImportModal" :pharmacies-list="pharmaciesList" :categories-list="categoriesList"
      @close="showImportModal = false" @import="handleImportCsv" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduits } from '@/composables/pharmacie/useProduits'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'
import ProduitModal from './ProduitModal.vue'
import ImportProduitsCsvModal from './ImportProduitsCsvModal.vue'

const { produitsList, isLoading, fetchProduitsList, deleteProduit, importProduitsCsv, exportProduitsCsv } = useProduits()
const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()
const { categoriesList, fetchCategories } = useProduitsCategorie()

const searchQuery = ref('')
const showProduitModal = ref(false)
const showImportModal = ref(false)
const editingProduit = ref(null)

const filteredProduits = computed(() => {
  if (!searchQuery.value) return produitsList.value

  const query = searchQuery.value.toLowerCase()
  return produitsList.value.filter(produit => {
    const nom = (produit.nom || '').toLowerCase()
    const code = (produit.code || '').toLowerCase()
    const pharmacie = (produit.pharmacieName || '').toLowerCase()
    const categorie = (produit.categorieName || '').toLowerCase()

    return nom.includes(query) || code.includes(query) || pharmacie.includes(query) || categorie.includes(query)
  })
})

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('fr-FR').format(price)
}

const openCreateModal = () => {
  editingProduit.value = null
  showProduitModal.value = true
}

const editProduit = (produit) => {
  editingProduit.value = produit
  showProduitModal.value = true
}

const closeProduitModal = () => {
  showProduitModal.value = false
  editingProduit.value = null
}

const handleProduitSuccess = () => {
  closeProduitModal()
}

const confirmDelete = (produit) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${produit.nom} ?`)) {
    handleDelete(produit)
  }
}

const handleDelete = async (produit) => {
  const result = await deleteProduit(produit.id)

  if (result.success) {
    console.log('✅ Produit supprimé avec succès')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const handleImportCsv = async ({ pharmacieId, categorieId, file }) => {
  try {
    console.log('📤 Import produits:', { pharmacieId, categorieId, file: file.name })
    
    const result = await importProduitsCsv(file, pharmacieId, categorieId)

    if (result.success) {
      alert('Import réussi ! Produits importés avec succès.')
      showImportModal.value = false
    } else {
      alert(result.error || 'Erreur lors de l\'import')
    }
  } catch (error) {
    console.error('❌ Erreur import produits:', error)
    alert('Erreur lors de l\'import du fichier')
  }
}

const handleExport = () => {
  try {
    const result = exportProduitsCsv()

    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'export')
    }
  } catch (error) {
    console.error('❌ Erreur export:', error)
    alert('Erreur lors de l\'export du fichier')
  }
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