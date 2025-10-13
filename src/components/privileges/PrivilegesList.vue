<!-- src/components/privileges/PrivilegesList.vue -->
<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Privilèges
        </h3>

        <div class="flex items-center gap-3">
          <!-- Toggle affichage supprimés -->
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input
              v-model="showDeleted"
              type="checkbox"
              class="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
              @change="handleToggleDeleted"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Afficher les supprimés
            </span>
          </label>

          <!-- Bouton Ajouter un privilège -->
          <button
            @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau Privilège
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher un privilège..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nom du privilège</p>
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
            <td colspan="4" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredPrivileges.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="4" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucun privilège trouvé
            </td>
          </tr>
          <tr v-else v-for="privilege in filteredPrivileges" :key="privilege.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            :class="{ 'opacity-60': privilege.deleted }">
            <td class="py-3 whitespace-nowrap">
              <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                #{{ privilege.id }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ privilege.name }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span 
                v-if="!privilege.deleted"
                class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                Actif
              </span>
              <span 
                v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
                Supprimé
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button 
                  v-if="!privilege.deleted"
                  @click="editPrivilege(privilege)"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg dark:text-green-400 dark:hover:bg-green-900/20"
                  title="Modifier">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  v-if="!privilege.deleted"
                  @click="confirmDelete(privilege)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                  title="Supprimer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button 
                  v-if="privilege.deleted"
                  @click="confirmRestore(privilege)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Restaurer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <PrivilegeModal 
      v-if="showPrivilegeModal" 
      :privilege-data="selectedPrivilege"
      @close="closePrivilegeModal"
      @success="handlePrivilegeSuccess" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePrivileges } from '@/composables/privileges/usePrivileges'
import PrivilegeModal from './PrivilegeModal.vue'

const { 
  privilegesList, 
  isLoading, 
  fetchPrivileges, 
  deletePrivilege,
  restorePrivilege,
  exportPrivilegesCsv 
} = usePrivileges()

const searchQuery = ref('')
const showPrivilegeModal = ref(false)
const selectedPrivilege = ref(null)
const showDeleted = ref(false)

const filteredPrivileges = computed(() => {
  let filtered = privilegesList.value

  // Filtrer par statut supprimé
  if (!showDeleted.value) {
    filtered = filtered.filter(privilege => !privilege.deleted)
  }

  // Filtrer par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(privilege => {
      const name = (privilege.name || '').toLowerCase()
      const id = String(privilege.id || '')
      return name.includes(query) || id.includes(query)
    })
  }

  return filtered
})

const handleToggleDeleted = async () => {
  await fetchPrivileges({ supprime: showDeleted.value })
}

const openCreateModal = () => {
  selectedPrivilege.value = null
  showPrivilegeModal.value = true
}

const editPrivilege = (privilege) => {
  selectedPrivilege.value = privilege
  showPrivilegeModal.value = true
}

const closePrivilegeModal = () => {
  showPrivilegeModal.value = false
  selectedPrivilege.value = null
}

const handlePrivilegeSuccess = () => {
  closePrivilegeModal()
}

const confirmDelete = (privilege) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le privilège "${privilege.name}" ?`)) {
    handleDelete(privilege)
  }
}

const handleDelete = async (privilege) => {
  const result = await deletePrivilege(privilege.id)

  if (result.success) {
    console.log('✅ Privilège supprimé avec succès')
    await fetchPrivileges({ supprime: showDeleted.value })
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}

const confirmRestore = (privilege) => {
  if (confirm(`Êtes-vous sûr de vouloir restaurer le privilège "${privilege.name}" ?`)) {
    handleRestore(privilege)
  }
}

const handleRestore = async (privilege) => {
  const result = await restorePrivilege(privilege.id)

  if (result.success) {
    console.log('✅ Privilège restauré avec succès')
    await fetchPrivileges({ supprime: showDeleted.value })
  } else {
    alert(result.error || 'Erreur lors de la restauration')
  }
}

const handleExport = () => {
  try {
    const result = exportPrivilegesCsv()

    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'export')
    }
  } catch (error) {
    console.error('❌ Erreur export:', error)
    alert('Erreur lors de l\'export du fichier')
  }
}

onMounted(async () => {
  if (privilegesList.value.length === 0) {
    await fetchPrivileges({ supprime: false })
  }
})
</script>