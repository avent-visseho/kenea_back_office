//src/components/pays/PaysVilleList.vue
<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header avec tabs -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Pays et villes
        </h3>

        <div class="flex items-center gap-3">
          <!-- ✅ Import pour PAYS : input file direct -->
          <input v-if="activeTab === 'pays'" ref="fileInputPays" type="file" accept=".csv" class="hidden"
            @change="handlePaysFileSelect" />

          <button @click="handleImportClick"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importer CSV
          </button>

          <button @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Exporter CSV
          </button>

          <button @click="showFilterModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.29004 5.90393H17.7067" stroke="" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M17.7075 14.0961H2.29085" stroke="" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill="" stroke="" stroke-width="1.5" />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill="" stroke="" stroke-width="1.5" />
            </svg>
            Filtrer
          </button>

          <button @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 shadow-theme-xs">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ activeTab === 'pays' ? 'Nouveau pays' : 'Nouvelle ville' }}
          </button>
        </div>
      </div>

      <!-- Search and Tabs -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text"
            :placeholder="activeTab === 'pays' ? 'Rechercher un pays...' : 'Rechercher une ville...'"
            class="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
        </div>

        <div class="border-b border-gray-200 dark:border-gray-800 sm:border-0">
          <nav class="flex gap-8" aria-label="Tabs">
            <button @click="activeTab = 'pays'" :class="[
              'pb-3 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'pays'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
            ]">
              Pays
            </button>
            <button @click="activeTab = 'villes'" :class="[
              'pb-3 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'villes'
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
            ]">
              Villes
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <PaysList v-if="activeTab === 'pays'" :search-query="searchQuery" />
      <VillesList v-else-if="activeTab === 'villes'" :search-query="searchQuery" />
    </div>

    <!-- Modals -->
    <FilterModal v-if="showFilterModal" :active-tab="activeTab" @close="showFilterModal = false"
      @apply="applyFilters" />

    <PaysModal v-if="showPaysModal" :pays-data="editingPays" @close="closePaysModal" @success="handlePaysSuccess" />

    <VilleModal v-if="showVilleModal" :ville-data="editingVille" @close="closeVilleModal"
      @success="handleVilleSuccess" />

    <!-- ✅ NOUVEAU: Modal d'import CSV pour les villes -->
    <ImportCsvModal v-if="showImportCsvModal" :pays-list="paysList" @close="showImportCsvModal = false"
      @import="handleVilleImport" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'
import PaysList from './PaysList.vue'
import VillesList from './VillesList.vue'
import FilterModal from './FilterModal.vue'
import PaysModal from './PaysModal.vue'
import VilleModal from './VilleModal.vue'
import ImportCsvModal from './ImportCsvModal.vue'

const activeTab = ref('pays')
const searchQuery = ref('')
const showFilterModal = ref(false)
const showPaysModal = ref(false)
const showVilleModal = ref(false)
const showImportCsvModal = ref(false) // ✅ NOUVEAU
const editingPays = ref(null)
const editingVille = ref(null)

const fileInputPays = ref(null)

const {
  paysList,
  importPaysCsv,
  exportPaysCsv,
  importCitiesCsv,
  exportCitiesCsv
} = usePaysVille()

const openCreateModal = () => {
  if (activeTab.value === 'pays') {
    editingPays.value = null
    showPaysModal.value = true
  } else {
    editingVille.value = null
    showVilleModal.value = true
  }
}

const closePaysModal = () => {
  showPaysModal.value = false
  editingPays.value = null
}

const closeVilleModal = () => {
  showVilleModal.value = false
  editingVille.value = null
}

const handlePaysSuccess = () => {
  closePaysModal()
}

const handleVilleSuccess = () => {
  closeVilleModal()
}

const applyFilters = (filters) => {
  console.log('Filtres appliqués:', filters)
  showFilterModal.value = false
}

// ✅ NOUVEAU: Gestion du clic sur Import
const handleImportClick = () => {
  if (activeTab.value === 'pays') {
    // Pour les pays : sélection directe du fichier
    fileInputPays.value?.click()
  } else {
    // Pour les villes : ouvrir le modal
    showImportCsvModal.value = true
  }
}

// ✅ Import PAYS (direct)
const handlePaysFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.name.endsWith('.csv')) {
    alert('Veuillez sélectionner un fichier CSV')
    return
  }

  try {
    const result = await importPaysCsv(file)

    if (result.success) {
      alert('Import réussi ! Pays importés avec succès.')
    } else {
      alert(result.error || 'Erreur lors de l\'import')
    }
  } catch (error) {
    console.error('Erreur import pays:', error)
    alert('Erreur lors de l\'import du fichier')
  } finally {
    if (fileInputPays.value) {
      fileInputPays.value.value = ''
    }
  }
}

// ✅ NOUVEAU: Import VILLES (avec modal)
const handleVilleImport = async ({ paysId, file }) => {
  try {
    console.log('Import villes pour pays:', paysId, 'fichier:', file.name)

    const result = await importCitiesCsv(file, paysId)

    if (result.success) {
      alert('Import réussi ! Villes importées avec succès.')
      showImportCsvModal.value = false
    } else {
      alert(result.error || 'Erreur lors de l\'import')
    }
  } catch (error) {
    console.error('Erreur import villes:', error)
    alert('Erreur lors de l\'import du fichier')
  }
}

// Export (inchangé)
const handleExport = () => {
  try {
    let result
    if (activeTab.value === 'pays') {
      result = exportPaysCsv()
    } else {
      result = exportCitiesCsv()
    }

    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'export')
    }
  } catch (error) {
    console.error('Erreur export:', error)
    alert('Erreur lors de l\'export du fichier')
  }
}
</script>