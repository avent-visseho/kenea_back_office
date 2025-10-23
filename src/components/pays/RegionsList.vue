<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      <button @click="fetchRegionsList" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Réessayer
      </button>
    </div>

    <!-- Tableau -->
    <table v-else class="min-w-full">
      <thead>
        <tr class="border-t border-gray-100 dark:border-gray-800">
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nom</p>
          </th>
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Pays</p>
          </th>
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Code Pays</p>
          </th>
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="region in filteredRegionsList" :key="region.id || region.code"
          class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <div
                class="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span class="text-2xl">🗺️</span>
              </div>
              <div>
                <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ region.name || "N/A" }}
                </p>
              </div>
            </div>
          </td>

          <td class="py-3 whitespace-nowrap">
            <p class="text-gray-500 text-theme-sm dark:text-gray-400">
              {{ region.pays.name || "N/A" }}
            </p>
          </td>

          <td class="py-3 whitespace-nowrap">
            <p class="text-gray-500 text-theme-sm dark:text-gray-400">
              {{ region.pays.code || "N/A" }}
            </p>
          </td>

          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <button @click="handleEdit(region)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                title="Modifier">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                    a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button @click="handleDelete(region)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                title="Supprimer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                    a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                    m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1
                    1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Aucun résultat -->
    <div v-if="!isLoading && !error && filteredRegionsList.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400">
      Aucune région trouvée
    </div>

    <RegionModal v-if="showEditModal" :region-data="editingRegion" @close="closeEditModal"
      @success="handleEditSuccess" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'
import RegionModal from './RegionModal.vue'

const props = defineProps({
  searchQuery: { type: String, default: '' },
})

const {
  isLoading,
  error,
  regionsList,
  paysList,
  fetchRegionsList,
  fetchPaysList,
  deleteRegions,
} = usePaysVille()

const showEditModal = ref(false)
const editingRegion = ref(null)
const showDeleted = ref(false)

const filteredRegionsList = computed(() => {
  if (!props.searchQuery) return regionsList.value

  const query = props.searchQuery.toLowerCase().trim()
  return regionsList.value.filter(region => {
    const nom = (region.nom || region.name || '').toLowerCase()
    return nom.includes(query)
  })
})

// ✅ FIX: Correction de getPaysName - utilise paysId au lieu de name
const getPaysName = paysId => {
  if (!paysId) return '-'
  const pays = paysList.value.find(p => p.id === paysId)
  return pays ? (pays.nom || pays.name) : '-'
}

onMounted(() => {
  if (regionsList.value.length === 0) fetchRegionsList(showDeleted.value)
  if (paysList.value.length === 0) fetchPaysList(showDeleted.value)
})

const handleEdit = region => {
  editingRegion.value = region
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingRegion.value = null
}

const handleEditSuccess = () => {
  closeEditModal()
  fetchRegionsList(showDeleted.value)
}

const handleDelete = async region => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${region.nom || region.name} ?`)) {
    const result = await deleteRegions(region.code || region.id)
    if (result.success) {
      alert('Région supprimée avec succès')
      fetchRegionsList(showDeleted.value)
    } else {
      alert(result.error || 'Erreur lors de la suppression')
    }
  }
}

defineExpose({ refresh: fetchRegionsList })
</script>