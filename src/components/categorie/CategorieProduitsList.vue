<!-- src/components/categorie/CategoriesProduitsList.vue -->
<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Catégories de Produits
        </h3>

        <div class="flex items-center gap-3">
          <!-- Bouton Import CSV -->
          <button
            @click="showImportModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importer CSV
          </button>

          <!-- Bouton Export CSV -->
          <button
            @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Exporter CSV
          </button>

          <!-- Bouton Nouvelle Catégorie -->
          <button @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 shadow-theme-xs">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle catégorie
          </button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Rechercher une catégorie..."
            class="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nom</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Description</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date de création</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="4" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredCategories.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="4" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucune catégorie trouvée
            </td>
          </tr>
          <tr v-else v-for="categorie in filteredCategories" :key="categorie.id || categorie.uuid || categorie.code"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ categorie.nom || categorie.name || 'N/A' }}
                  </p>
                  <p v-if="categorie.code" class="text-xs text-gray-500 dark:text-gray-400">
                    {{ categorie.code }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400 max-w-md truncate">
                {{ categorie.description || 'Aucune description' }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(categorie.createdAt || categorie.created_at) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="editCategorie(categorie)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Modifier">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(categorie)"
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
    <CategorieProduitModal 
      v-if="showCategorieModal" 
      :categorie-data="editingCategorie" 
      @close="closeCategorieModal"
      @success="handleCategorieSuccess" 
    />


    <ImportCategorieProduitCsvModal 
      v-if="showImportModal" 
      @close="showImportModal = false"
      @import="handleImportCsv" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'
import CategorieProduitModal from './CategorieProduitModal.vue'
import ImportCategorieProduitCsvModal from './ImportCategorieProduitCsvModal.vue'

const { 
  categoriesList, 
  isLoading, 
  fetchCategories, 
  deleteCategorie,
  importCategoriesCsv,
  exportCategoriesCsv 
} = useProduitsCategorie()

const searchQuery = ref('')
const showCategorieModal = ref(false)
const showImportModal = ref(false)
const editingCategorie = ref(null)

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categoriesList.value

  const query = searchQuery.value.toLowerCase()
  return categoriesList.value.filter(categorie => {
    const nom = (categorie.nom || categorie.name || '').toLowerCase()
    const description = (categorie.description || '').toLowerCase()
    const code = (categorie.code || '').toLowerCase()

    return nom.includes(query) || description.includes(query) || code.includes(query)
  })
})

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const openCreateModal = () => {
  editingCategorie.value = null
  showCategorieModal.value = true
}

const editCategorie = (categorie) => {
  editingCategorie.value = categorie
  showCategorieModal.value = true
}

const closeCategorieModal = () => {
  showCategorieModal.value = false
  editingCategorie.value = null
}

const handleCategorieSuccess = () => {
  closeCategorieModal()
}

const confirmDelete = (categorie) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categorie.nom || categorie.name}" ?`)) {
    handleDelete(categorie)
  }
}

const handleDelete = async (categorie) => {
  const id = categorie.id || categorie.uuid || categorie.code
  const result = await deleteCategorie(id)

  if (result.success) {
    console.log('✅ Catégorie supprimée avec succès')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const handleImportCsv = async ({ file }) => {
  try {
    console.log('📤 Import catégories, fichier:', file.name)
    
    const result = await importCategoriesCsv(file)

    if (result.success) {
      alert('Import réussi ! Catégories importées avec succès.')
      showImportModal.value = false
    } else {
      alert(result.error || 'Erreur lors de l\'import')
    }
  } catch (error) {
    console.error('❌ Erreur import catégories:', error)
    alert('Erreur lors de l\'import du fichier')
  }
}

const handleExport = () => {
  try {
    const result = exportCategoriesCsv()

    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'export')
    }
  } catch (error) {
    console.error('❌ Erreur export:', error)
    alert('Erreur lors de l\'export du fichier')
  }
}

onMounted(async () => {
  if (categoriesList.value.length === 0) {
    await fetchCategories()
  }
})
</script>