<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Ordonnances
        </h3>

        <div class="flex items-center gap-3">
          <!-- Filter par statut -->
          <select v-model="selectedStatus" @change="handleStatusChange"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
            <option value="">Tous les statuts</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
          </select>

          <!-- Bouton Upload -->
          <button @click="showUploadModal = true"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 shadow-theme-xs">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Uploader une ordonnance
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher par code..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Code</p>
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="5" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredOrdonnances.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="5" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucune ordonnance trouvée
            </td>
          </tr>
          <tr v-else v-for="ordonnance in filteredOrdonnances" :key="ordonnance.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ ordonnance.code }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ ordonnance.id }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span :class="getStatusClass(ordonnance.etat)"
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                <span class="h-1.5 w-1.5 rounded-full" :class="getStatFCFAotClass(ordonnance.etat)"></span>
                {{ getStatusLabel(ordonnance.etat) }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(ordonnance.createAt) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(ordonnance.updateAt) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="viewOrdonnance(ordonnance)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Voir">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <!-- <button v-if="ordonnance.etat === 'PENDING'" @click="changeStatus(ordonnance, 'COMPLETED')"
                  class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  title="Valider">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button v-if="ordonnance.etat === 'PENDING'" @click="changeStatus(ordonnance, 'REJECTED')"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                  title="Rejeter">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button> -->
                <button @click="confirmDelete(ordonnance)"
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

    <!-- Modals -->
    <UploadOrdonnanceModal v-if="showUploadModal" @close="showUploadModal = false" @success="handleUploadSuccess" />

    <ViewOrdonnanceModal v-if="showViewModal" :ordonnance="selectedOrdonnance" @close="closeViewModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrdonnances } from '@/composables/ordannance/useOrdonnances.js'
import UploadOrdonnanceModal from './UploadOrdonnanceModal.vue'
import ViewOrdonnanceModal from './ViewOrdonnanceModal.vue'

const props = defineProps({
  ordonnances: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh', 'filter-change'])

const { deleteOrdonnance, updateStatus } = useOrdonnances()

const searchQuery = ref('')
const selectedStatus = ref('')
const showUploadModal = ref(false)
const showViewModal = ref(false)
const selectedOrdonnance = ref(null)

// Gestion du changement de filtre
const handleStatusChange = () => {
  emit('filter-change', selectedStatus.value)
}

const filteredOrdonnances = computed(() => {
  let filtered = props.ordonnances

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(o =>
      o.code?.toLowerCase().includes(query) ||
      o.id?.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'COMPLETED': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'APPROVED': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'REJECTED': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'IN_PROGRESS': 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatFCFAotClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-500',
    'COMPLETED': 'bg-emerald-500',
    'APPROVED': 'bg-blue-500',
    'REJECTED': 'bg-red-500',
    'IN_PROGRESS': 'bg-gray-500'
  }
  return classes[status] || 'bg-gray-500'
}

const getStatusLabel = (status) => {
  const labels = {
    'PENDING': 'En attente',
    'COMPLETED': 'Validée',
    'APPROVED': 'Approuvée',
    'REJECTED': 'Rejetée',
    'IN_PROGRESS': 'Annulée'
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

const viewOrdonnance = (ordonnance) => {
  selectedOrdonnance.value = ordonnance
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedOrdonnance.value = null
}

/* const changeStatus = async (ordonnance, newStatus) => {
  if (confirm(`Êtes-vous sûr de vouloir ${newStatus === 'COMPLETED' ? 'valider' : 'rejeter'} cette ordonnance ?`)) {
    const result = await updateStatus(ordonnance.id, newStatus)

    if (result.success) {
      emit('refresh')
    } else {
      alert(result.error || 'Erreur lors de la mise à jour du statut')
    }
  }
}
 */
const confirmDelete = (ordonnance) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'ordonnance ${ordonnance.code} ?`)) {
    handleDelete(ordonnance)
  }
}

const handleDelete = async (ordonnance) => {
  const result = await deleteOrdonnance(ordonnance.id)

  if (result.success) {
    emit('refresh')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const handleUploadSuccess = () => {
  showUploadModal.value = false
  emit('refresh')
}
</script>