<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Progressions
        </h3>

        <div class="flex items-center gap-3">
          <!-- Filter par statut -->
          <select v-model="selectedStatus" @change="handleStatusChange"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
            <option value="">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="COMPLETED">Complétée</option>
            <option value="IN_PROGRESS">En cours</option>
          </select>

          <!-- Toggle Afficher supprimées -->
          <button @click="showDeleted = !showDeleted"
            class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-theme-sm font-medium"
            :class="showDeleted 
              ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white' 
              : 'bg-white text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ showDeleted ? 'Masquer' : 'Afficher' }} supprimées
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher par ID..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ID</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date création</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date mise à jour</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">État</p>
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
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredProgressions.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="6" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucune progression trouvée
            </td>
          </tr>
          <tr v-else v-for="progression in filteredProgressions" :key="progression.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            :class="{ 'opacity-60': progression.deleted }">
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ progression.id }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span :class="getStatusClass(progression.statut)"
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(progression.statut)"></span>
                {{ getStatusLabel(progression.statut) }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(progression.createAt) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(progression.updateAt) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span v-if="progression.deleted"
                class="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-medium dark:bg-red-900/30 dark:text-red-400">
                <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                Supprimée
              </span>
              <span v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium dark:bg-emerald-900/30 dark:text-emerald-400">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Active
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="viewProgression(progression)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Voir">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button v-if="!progression.deleted && progression.statut === 'PENDING'" @click="changeStatus(progression, 'COMPLETED')"
                  class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  title="Marquer comme complétée">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button v-if="progression.deleted" @click="restoreItem(progression)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Restaurer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 15L3 9m0 0l6-6m-6 6h18a9 9 0 010 18H9" />
                  </svg>
                </button>
                <button v-else @click="confirmDelete(progression)"
                  class="p-2 text-gray-600 hover:bg-gray-50 rounded-lg dark:text-gray-400 dark:hover:bg-gray-900/20"
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

    <!-- View Modal -->
    <ViewProgressionModal v-if="showViewModal" :progression="selectedProgression" @close="closeViewModal" />

    <!-- Traiter Modal -->
    <TraiterProgressionModal v-if="showTraiterModal" :progression="selectedProgression" @close="showTraiterModal = false" @success="handleTraitementSuccess" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrdonnanceProgressions } from '@/composables/ordannance/useOrdonnanceProgressions'
import ViewProgressionModal from './ViewProgressionModal.vue'
import TraiterProgressionModal from './TraiterProgressionModal.vue'

const props = defineProps({
  progressions: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh', 'filter-change'])

const { deleteProgression, restoreProgression, updateProgressionStatus } = useOrdonnanceProgressions()

const searchQuery = ref('')
const selectedStatus = ref('')
const showDeleted = ref(false)
const showViewModal = ref(false)
const showTraiterModal = ref(false)
const selectedProgression = ref(null)

const handleStatusChange = () => {
  emit('filter-change', selectedStatus.value)
}

const filteredProgressions = computed(() => {
  let filtered = props.progressions

  if (!showDeleted.value) {
    filtered = filtered.filter(p => !p.deleted)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.id?.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'COMPLETED': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'IN_PROGRESS': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusDotClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-500',
    'COMPLETED': 'bg-emerald-500',
    'IN_PROGRESS': 'bg-blue-500'
  }
  return classes[status] || 'bg-gray-500'
}

const getStatusLabel = (status) => {
  const labels = {
    'PENDING': 'En attente',
    'COMPLETED': 'Complétée',
    'IN_PROGRESS': 'En cours'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const viewProgression = (progression) => {
  selectedProgression.value = progression
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedProgression.value = null
}

const changeStatus = async (progression, newStatus) => {
  if (confirm(`Êtes-vous sûr de vouloir marquer cette progression comme ${newStatus === 'COMPLETED' ? 'complétée' : 'en attente'} ?`)) {
    const result = await updateProgressionStatus(progression.id, newStatus)
    if (result.success) {
      emit('refresh')
    } else {
      alert(result.error || 'Erreur lors de la mise à jour du statut')
    }
  }
}

const confirmDelete = (progression) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer cette progression ?`)) {
    handleDelete(progression)
  }
}

const handleDelete = async (progression) => {
  const result = await deleteProgression(progression.id)
  if (result.success) {
    emit('refresh')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const restoreItem = async (progression) => {
  const result = await restoreProgression(progression.id)
  if (result.success) {
    emit('refresh')
  } else {
    alert(result.error || 'Erreur lors de la restauration')
  }
}

const handleTraitementSuccess = () => {
  showTraiterModal.value = false
  emit('refresh')
}
</script>