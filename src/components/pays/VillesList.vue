//src/components/pays/VillesList.vue
<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      <button
        @click="fetchCitiesList"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Réessayer
      </button>
    </div>

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
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ville in filteredCitiesList"
          :key="ville.id || ville.code"
          class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
        >
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <div class="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span class="text-2xl">🏙️</span>
              </div>
              <div>
                <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ ville.nom || ville.name }}
                </p>
              </div>
            </div>
          </td>
          <td class="py-3 whitespace-nowrap">
            <p class="text-gray-500 text-theme-sm dark:text-gray-400">
              {{ getPaysName(ville.paysId || ville.pays_id) }}
            </p>
          </td>
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <button
                @click="handleEdit(ville)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                title="Modifier"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="handleDelete(ville)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                title="Supprimer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="!isLoading && !error && filteredCitiesList.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      Aucune ville trouvée
    </div>

    <VilleModal
      v-if="showEditModal"
      :ville-data="editingVille"
      @close="closeEditModal"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'
import VilleModal from './VilleModal.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const { isLoading, error, citiesList, paysList, fetchCitiesList, fetchPaysList, deleteCities } = usePaysVille()

const showEditModal = ref(false)
const editingVille = ref(null)

const filteredCitiesList = computed(() => {
  if (!props.searchQuery) return citiesList.value

  const query = props.searchQuery.toLowerCase().trim()
  return citiesList.value.filter(ville => {
    const nom = (ville.nom || ville.name || '').toLowerCase()
    return nom.includes(query)
  })
})

const getPaysName = (paysId) => {
  if (!paysId) return '-'
  const pays = paysList.value.find(p => p.id === paysId)
  return pays ? (pays.nom || pays.name) : '-'
}

onMounted(() => {
  if (citiesList.value.length === 0) {
    fetchCitiesList()
  }
  if (paysList.value.length === 0) {
    fetchPaysList()
  }
})

const handleEdit = (ville) => {
  editingVille.value = ville
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingVille.value = null
}

const handleEditSuccess = () => {
  closeEditModal()
}

const handleDelete = async (ville) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${ville.nom || ville.name} ?`)) {
    const result = await deleteCities(ville.code || ville.id)
    if (result.success) {
      console.log('Ville supprimée avec succès')
    } else {
      alert(result.error || 'Erreur lors de la suppression')
    }
  }
}

defineExpose({ refresh: fetchCitiesList })
</script>