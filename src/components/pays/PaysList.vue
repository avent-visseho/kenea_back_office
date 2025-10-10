//src/components/pays/PaysList.vue
<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      <button @click="fetchPaysList" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Code</p>
          </th>
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Indicatif</p>
          </th>
          <th class="py-3 text-left">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pays in filteredPaysList" :key="pays.code"
          class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <div
                class="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FlagIcon v-if="FlagIcon" />
                <span v-else class="text-2xl">🌍</span>
              </div>
              <div>
                <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {{ pays.nom || pays.name }}
                </p>
                <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ pays.code }}
                </span>
              </div>
            </div>
          </td>

          <!-- Code with Icon -->
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ pays.code }}</p>
            </div>
          </td>

          <!-- Indicatif with Icon -->
          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m10-10H2" />
              </svg>
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ pays.indicatif }}</p>
            </div>
          </td>

          <td class="py-3 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <button @click="handleEdit(pays)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                title="Modifier">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button @click="handleDelete(pays)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
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

    <div v-if="!isLoading && !error && filteredPaysList.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="mt-2">
        {{ searchQuery ? 'Aucun pays trouvé pour cette recherche' : 'Aucun pays trouvé' }}
      </p>
    </div>

    <PaysModal v-if="showEditModal" :pays-data="editingPays" @close="closeEditModal" @success="handleEditSuccess" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'
import FlagIcon from '@/icons/FlagIcon.vue'
import PaysModal from './PaysModal.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const { isLoading, error, paysList, fetchPaysList, deletePays } = usePaysVille()

const showEditModal = ref(false)
const editingPays = ref(null)
const showDeleted = ref(false)


const filteredPaysList = computed(() => {
  if (!props.searchQuery) return paysList.value

  const query = props.searchQuery.toLowerCase().trim()
  return paysList.value.filter(pays => {
    const nom = (pays.nom || pays.name || '').toLowerCase()
    const code = (pays.code || '').toLowerCase()
    const indicatif = (pays.indicatif || '').toLowerCase()

    return nom.includes(query) || code.includes(query) || indicatif.includes(query)
  })
})

onMounted(() => {
  if (paysList.value.length === 0) {
    fetchPaysList(showDeleted.value)
  }
})

const handleEdit = (pays) => {
  editingPays.value = pays
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingPays.value = null
}

const handleEditSuccess = () => {
  closeEditModal()
}

const handleDelete = async (pays) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${pays.nom || pays.name} ?`)) {
    const result = await deletePays(pays.id)
    if (result.success) {
      console.log('Pays supprimé avec succès')
    } else {
      alert(result.error || 'Erreur lors de la suppression')
    }
  }
}

defineExpose({ refresh: fetchPaysList })
</script>