<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Pharmacies
        </h3>

        <div class="flex items-center gap-3">
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
            Nouvelle pharmacie
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher une pharmacie..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Ville</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Adresse</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Téléphone</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
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
          <tr v-else-if="filteredPharmacies.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="6" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucune pharmacie trouvée
            </td>
          </tr>
          <tr v-else v-for="pharmacie in filteredPharmacies" :key="pharmacie.id || pharmacie.uuid"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                  <svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ pharmacie.nom || pharmacie.name || 'N/A' }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ getVilleName(pharmacie.ville_id || pharmacie.city_id) }}
              </p>
            </td>
            <td class="py-3">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400 max-w-xs truncate">
                {{ pharmacie.adresse || pharmacie.address || 'N/A' }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ pharmacie.telephone || pharmacie.phone || 'N/A' }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span :class="[
                'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                pharmacie.active || pharmacie.statut === 'actif'
                  ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              ]">
                {{ pharmacie.active || pharmacie.statut === 'actif' ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="editPharmacie(pharmacie)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Modifier">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="confirmDelete(pharmacie)"
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
    <PharmacieModal v-if="showPharmacieModal" :pharmacie-data="editingPharmacie" @close="closePharmacieModal"
      @success="handlePharmacieSuccess" />

    <!-- <FilterModal v-if="showFilterModal" @close="showFilterModal = false" @apply="applyFilters" /> -->

    <!-- Delete Confirmation Modal -->
    <!-- <ConfirmDeleteModal v-if="showDeleteModal" :item-name="pharmacieToDelete?.nom || pharmacieToDelete?.name"
      @close="showDeleteModal = false" @confirm="handleDelete" /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'
import PharmacieModal from './PharmacieModal.vue'
/* import FilterModal from './FilterModal.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue' */

const { pharmaciesList, isLoading, fetchPharmaciesList, deletePharmacies } = usePharmaciesVille()
const { citiesList, fetchCitiesList } = usePaysVille()

const searchQuery = ref('')
const showPharmacieModal = ref(false)
const showFilterModal = ref(false)
const showDeleteModal = ref(false)
const editingPharmacie = ref(null)
const pharmacieToDelete = ref(null)

const filteredPharmacies = computed(() => {
  if (!searchQuery.value) return pharmaciesList.value

  const query = searchQuery.value.toLowerCase()
  return pharmaciesList.value.filter(pharmacie => {
    const nom = (pharmacie.nom || pharmacie.name || '').toLowerCase()
    const adresse = (pharmacie.adresse || pharmacie.address || '').toLowerCase()
    const telephone = (pharmacie.telephone || pharmacie.phone || '').toLowerCase()
    const ville = getVilleName(pharmacie.ville_id || pharmacie.city_id).toLowerCase()

    return nom.includes(query) || adresse.includes(query) || telephone.includes(query) || ville.includes(query)
  })
})

const getVilleName = (villeId) => {
  if (!villeId) return 'N/A'
  const ville = citiesList.value.find(v => v.id === villeId || v.code === villeId)
  return ville?.nom || ville?.name || 'N/A'
}

const openCreateModal = () => {
  editingPharmacie.value = null
  showPharmacieModal.value = true
}

const editPharmacie = (pharmacie) => {
  editingPharmacie.value = pharmacie
  showPharmacieModal.value = true
}

const closePharmacieModal = () => {
  showPharmacieModal.value = false
  editingPharmacie.value = null
}

const handlePharmacieSuccess = () => {
  closePharmacieModal()
}

const confirmDelete = (pharmacie) => {
  pharmacieToDelete.value = pharmacie
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!pharmacieToDelete.value) return

  const id = pharmacieToDelete.value.id || pharmacieToDelete.value.uuid
  const result = await deletePharmacies(id)

  if (result.success) {
    showDeleteModal.value = false
    pharmacieToDelete.value = null
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const applyFilters = (filters) => {
  console.log('Filtres appliqués:', filters)
  showFilterModal.value = false
}

onMounted(async () => {
  if (pharmaciesList.value.length === 0) {
    await fetchPharmaciesList()
  }
  if (citiesList.value.length === 0) {
    await fetchCitiesList()
  }
})
</script>