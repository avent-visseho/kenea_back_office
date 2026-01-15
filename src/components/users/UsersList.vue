<!-- src/components/users/UsersList.vue -->
<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Gestion des Utilisateurs
        </h3>

        <div class="flex items-center gap-3">
          <!-- Bouton Import CSV -->
          <button @click="showImportModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importer CSV
          </button>

          <!-- Bouton Export CSV -->
          <button @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Exporter CSV
          </button>

          <!-- Bouton Assigner Entités -->
          <button @click="showAssignEntityModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Assigner Entités
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
          <input v-model="searchQuery" type="text" placeholder="Rechercher un utilisateur..."
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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Utilisateur</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Email / Téléphone</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Rôles</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Statut</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date de création</p>
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
          <tr v-else-if="filteredUsers.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="6" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucun utilisateur trouvé
            </td>
          </tr>
          <tr v-else v-for="user in filteredUsers" :key="user.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.person?.firstname }} {{ user.person?.lastname }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ user.username }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div>
                <p class="text-gray-800 text-theme-sm dark:text-white/90">
                  {{ user.person?.email || 'N/A' }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ user.person?.phone || 'N/A' }}
                </p>
              </div>
            </td>
            <td class="py-3">
              <div class="flex flex-wrap gap-1">
                <span v-for="role in user.roles" :key="role.id"
                  class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {{ role.name }}
                </span>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span v-if="user.enabled && !user.locked"
                class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <span class="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                Actif
              </span>
              <span v-else-if="user.locked"
                class="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <span class="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
                Verrouillé
              </span>
              <span v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                <span class="h-1.5 w-1.5 rounded-full bg-gray-600 dark:bg-gray-400"></span>
                Inactif
              </span>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatDate(user.createAt) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button @click="viewUser(user)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  title="Voir détails">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button @click="editUser(user)"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg dark:text-green-400 dark:hover:bg-green-900/20"
                  title="Modifier">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="openAssignRoleModal(user)"
                  class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg dark:text-purple-400 dark:hover:bg-purple-900/20"
                  title="Assigner des rôles">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
                <button @click="openSalaireModal(user)"
                  class="p-2 text-amber-600 hover:bg-amber-50 rounded-lg dark:text-amber-400 dark:hover:bg-amber-900/20"
                  title="Définir le salaire">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button @click="confirmDelete(user)"
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
    <UserModal v-if="showUserModal" :user-data="selectedUser" :is-view-mode="isViewMode" @close="closeUserModal"
      @success="handleUserSuccess" />

    <AssignRoleModal v-if="showAssignRoleModal" :user-data="selectedUser" @close="closeAssignRoleModal"
      @success="handleAssignRoleSuccess" />

    <AssignEntityModal
      v-if="showAssignEntityModal"
      @close="closeAssignEntityModal"
      @success="handleAssignEntitySuccess"
    />

    <SalaireModal v-if="showSalaireModal" :user-data="selectedUser" @close="closeSalaireModal"
      @success="handleSalaireSuccess" />

   <!--  <ImportUserCsvModal v-if="showImportModal" @close="showImportModal = false" @import="handleImportCsv" /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsers } from '@/composables/users/useUsers'
import UserModal from './UserModal.vue'
import AssignRoleModal from './AssignRoleModal.vue'
import AssignEntityModal from './AssignEntityModal.vue'
import SalaireModal from './SalaireModal.vue'
/* import ImportUserCsvModal from './ImportUserCsvModal.vue' */

const {
  usersList,
  isLoading,
  fetchUsers,
  deleteUser,
  /*   importUsersCsv, */
  exportUsersCsv
} = useUsers()

const searchQuery = ref('')
const showUserModal = ref(false)
const showAssignRoleModal = ref(false)
const showImportModal = ref(false)
const showAssignEntityModal = ref(false)
const showSalaireModal = ref(false)
const selectedUser = ref(null)
const isViewMode = ref(false)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return usersList.value

  const query = searchQuery.value.toLowerCase()
  return usersList.value.filter(user => {
    const firstname = (user.person?.firstname || '').toLowerCase()
    const lastname = (user.person?.lastname || '').toLowerCase()
    const email = (user.person?.email || '').toLowerCase()
    const username = (user.username || '').toLowerCase()
    const phone = (user.person?.phone || '').toLowerCase()

    return firstname.includes(query) ||
      lastname.includes(query) ||
      email.includes(query) ||
      username.includes(query) ||
      phone.includes(query)
  })
})

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewUser = (user) => {
  selectedUser.value = user
  isViewMode.value = true
  showUserModal.value = true
}

const editUser = (user) => {
  selectedUser.value = user
  isViewMode.value = false
  showUserModal.value = true
}

const closeUserModal = () => {
  showUserModal.value = false
  selectedUser.value = null
  isViewMode.value = false
}

const handleUserSuccess = async () => {
  closeUserModal()
  await fetchUsers()
}

const openAssignRoleModal = (user) => {
  selectedUser.value = user
  showAssignRoleModal.value = true
}

const closeAssignRoleModal = () => {
  showAssignRoleModal.value = false
  selectedUser.value = null
}

const handleAssignRoleSuccess = async () => {
  closeAssignRoleModal()
  await fetchUsers()
}

const closeAssignEntityModal = () => {
  showAssignEntityModal.value = false
}

const handleAssignEntitySuccess = async () => {
  closeAssignEntityModal()
  await fetchUsers()
}

const openSalaireModal = (user) => {
  selectedUser.value = user
  showSalaireModal.value = true
}

const closeSalaireModal = () => {
  showSalaireModal.value = false
  selectedUser.value = null
}

const handleSalaireSuccess = async () => {
  closeSalaireModal()
  await fetchUsers()
}

const confirmDelete = (user) => {
  const fullName = `${user.person?.firstname} ${user.person?.lastname}`
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${fullName}" ?`)) {
    handleDelete(user)
  }
}

const handleDelete = async (user) => {
  const result = await deleteUser(user.id)

  if (result.success) {
    console.log('✅ Utilisateur supprimé avec succès')
  } else {
    alert(result.error || 'Erreur lors de la suppression')
  }
}


const handleExport = () => {
  try {
    const result = exportUsersCsv()

    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'export')
    }
  } catch (error) {
    console.error('❌ Erreur export:', error)
    alert('Erreur lors de l\'export du fichier')
  }
}

onMounted(async () => {
  if (usersList.value.length === 0) {
    await fetchUsers()
  }
})
</script>