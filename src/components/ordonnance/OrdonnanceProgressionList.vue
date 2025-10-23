//src/components/ordonnance/OrdonnanceProgressionList.vue

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Boîte de réception des Ordonnances
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher par code ou client..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Client</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date d'envoi</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date de réponse</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="7" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="error" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="7" class="py-8 text-center text-red-500 dark:text-red-400">
              {{ error }}
            </td>
          </tr>
          <tr v-else-if="filteredOrdonnances.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="7" class="py-8 text-center text-gray-500 dark:text-gray-400">
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
              <p class="text-gray-700 text-theme-sm dark:text-gray-300">
                {{ ordonnance.clientNom }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span :class="getStatusClass(ordonnance.statut)"
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                <span class="h-1.5 w-1.5 rounded-full" :class="getStatusDotClass(ordonnance.statut)"></span>
                {{ getStatusLabel(ordonnance.statut) }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-700 text-theme-sm dark:text-gray-300">
                {{ ordonnance.total ? `${ordonnance.total} FCFA` : 'N/A' }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(ordonnance.dateEnvoi) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(ordonnance.dateReponse) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="viewOrdonnance(ordonnance)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Voir les détails">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button v-if="ordonnance.statut === 'PENDING'" @click="traiterOrdonnance(ordonnance)"
                  class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  title="Traiter l'ordonnance">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    <TraiterProgressionModal v-if="showTraiterModal" :progression="selectedProgression"
      @close="showTraiterModal = false" @success="handleTraitementSuccess" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrdonnanceProgressions } from '@/composables/ordannance/useOrdonnanceProgressions'
import { useAuthStore } from '@/store/auth/auth'
import ViewProgressionModal from './ViewProgressionModal.vue'
import TraiterProgressionModal from './TraiterProgressionModal.vue'

const emit = defineEmits(['refresh', 'filter-change'])

const authStore = useAuthStore()
const {
  ordonnancesList,
  isLoading,
  error,
  fetchOrdonnancesByPharmacie
} = useOrdonnanceProgressions()

const searchQuery = ref('')
const selectedStatus = ref('')
const showViewModal = ref(false)
const showTraiterModal = ref(false)
const selectedProgression = ref(null)

// Récupérer l'ID de la pharmacie depuis le store
const pharmacieId = computed(() => authStore.pharmacieId)

// Charger les ordonnances au montage du composant
onMounted(async () => {
  if (!pharmacieId.value) {
    error.value = 'Aucune pharmacie assignée à cet utilisateur'
    console.error('❌ Aucune pharmacie trouvée dans les assignments')
    return
  }

  console.log('✅ Chargement des ordonnances pour la pharmacie:', pharmacieId.value)
  await loadOrdonnances()
})

const loadOrdonnances = async () => {
  if (!pharmacieId.value) {
    error.value = 'Aucune pharmacie assignée'
    return
  }

  const params = {}
  if (selectedStatus.value) {
    params.statut = selectedStatus.value
  }

  const result = await fetchOrdonnancesByPharmacie(pharmacieId.value, params)
  if (!result.success) {
    console.error('❌ Erreur lors du chargement:', result.error)
  } else {
    console.log('✅ Ordonnances chargées:', result.data.length)
  }
}

const handleStatusChange = async () => {
  await loadOrdonnances()
  emit('filter-change', selectedStatus.value)
}

const filteredOrdonnances = computed(() => {
  let filtered = ordonnancesList.value || []

  // Filtrer par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(o =>
      o.code?.toLowerCase().includes(query) ||
      o.clientNom?.toLowerCase().includes(query) ||
      o.id?.toLowerCase().includes(query)
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

const viewOrdonnance = (ordonnance) => {
  selectedProgression.value = ordonnance
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedProgression.value = null
}

const traiterOrdonnance = (ordonnance) => {
  selectedProgression.value = ordonnance
  showTraiterModal.value = true
}

const handleTraitementSuccess = async () => {
  showTraiterModal.value = false
  await loadOrdonnances()
  emit('refresh')
}

// Exposer la méthode de rechargement pour les composants parents
defineExpose({
  loadOrdonnances
})
</script>