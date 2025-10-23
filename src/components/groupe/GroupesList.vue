<template>
  <div class="space-y-4">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Gestion des groupes d’affiliation</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Organisez vos groupes et sous-groupes
        </p>
      </div>
      <button @click="showCreateModal = true"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter un groupe
      </button>
    </div>

    <!-- Grid of Groupes -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="space-y-4 w-full max-w-2xl">
        <div v-for="i in 3" :key="i" class="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl animate-pulse"></div>
      </div>
    </div>

    <div v-else-if="groupesList.length === 0" class="text-center py-12">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">g-600 
        <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Aucun groupe créé</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Créez votre premier groupe pour commencer</p>
    </div>

    <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="groupe in groupesList" :key="groupe.id"
        class="group relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/20 overflow-hidden">
        
        <!-- Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent dark:from-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div class="relative p-6">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 mb-3">
                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{{ groupe.nom }}</h3>
            </div>

            <!-- Menu Button -->
            <div class="relative">
              <button @click="toggleMenu(groupe.id)"
                class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="activeMenu === groupe.id"
                class="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-20">
                <button @click="editGroupe(groupe)"
                  class="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <button @click="loadSousGroupes(groupe)"
                  class="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Sous-groupes
                </button>
                <hr class="border-gray-200 dark:border-gray-600" />
                <button @click="confirmDelete(groupe)"
                  class="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                ID: {{ groupe.id }}
              </span>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              Groupe créé et prêt à gérer vos sous-groupes
            </p>
          </div>

          <!-- Footer Action -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button @click="loadSousGroupes(groupe)"
              class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 px-4 py-2.5 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Gérer sous-groupes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CreateGroupeModal v-if="showCreateModal" @close="showCreateModal = false" @success="handleCreateSuccess" />
    <SousGroupesModal v-if="showSousGroupesModal" :groupe="selectedGroupe" @close="showSousGroupesModal = false" @refresh="refreshGroupes" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGroupes } from '@/composables/groupe/useGroupes'
import CreateGroupeModal from './CreateGroupeModal.vue'
import SousGroupesModal from './SousGroupesModal.vue'

const { groupesList, isLoading, fetchAllGroupes, deleteGroupe } = useGroupes()

const showCreateModal = ref(false)
const showSousGroupesModal = ref(false)
const selectedGroupe = ref(null)
const activeMenu = ref(null)

const toggleMenu = (id) => {
  activeMenu.value = activeMenu.value === id ? null : id
}

const editGroupe = (groupe) => {
  console.log('Edit groupe:', groupe)
  activeMenu.value = null
}

const loadSousGroupes = (groupe) => {
  selectedGroupe.value = groupe
  showSousGroupesModal.value = true
  activeMenu.value = null
}

const confirmDelete = (groupe) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le groupe "${groupe.nom}" ?`)) {
    handleDelete(groupe)
  }
  activeMenu.value = null
}

const handleDelete = async (groupe) => {
  const result = await deleteGroupe(groupe.id)
  if (result.success) {
    console.log('Groupe supprimé avec succès')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const handleCreateSuccess = () => {
  showCreateModal.value = false
  refreshGroupes()
}

const refreshGroupes = async () => {
  await fetchAllGroupes()
}

onMounted(async () => {
  await fetchAllGroupes()
})
</script>