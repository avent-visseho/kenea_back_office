<!-- src/components/groupe/AddMemberModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Ajouter un membre
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {{ groupe.nom }}
            </p>
          </div>
        </div>
        <button @click="closeModal"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Role Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rôle par défaut
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="relative flex cursor-pointer">
              <input type="radio" v-model="selectedRole" value="MEMBER" class="peer sr-only" />
              <div class="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-sm font-medium transition-all peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:peer-checked:bg-green-900/20 dark:peer-checked:text-green-400">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Membre
                </div>
              </div>
            </label>
            <label class="relative flex cursor-pointer">
              <input type="radio" v-model="selectedRole" value="ADMIN" class="peer sr-only" />
              <div class="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-sm font-medium transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:peer-checked:bg-purple-900/20 dark:peer-checked:text-purple-400">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                  </svg>
                  Admin
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Search -->
        <div class="mb-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Rechercher un utilisateur..."
              class="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-300 focus:outline-none focus:ring-3 focus:ring-green-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-white/30" />
          </div>
        </div>

        <!-- Affichage des erreurs -->
        <div v-if="error" class="mb-4 p-3 text-sm rounded-lg bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {{ error }}
        </div>

        <!-- User List -->
        <div class="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <div v-if="isLoadingUsers" class="p-6 text-center text-gray-500 dark:text-gray-400">
            <svg class="animate-spin h-8 w-8 mx-auto mb-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement des utilisateurs...
          </div>

          <div v-else-if="filteredUsers.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400">
            Aucun utilisateur trouvé
          </div>

          <div v-else class="max-h-96 overflow-y-auto">
            <label v-for="user in filteredUsers" :key="user.id"
              class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors">
              <input type="checkbox" :value="user.id" v-model="selectedUsers"
                class="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 dark:border-gray-600 transition-all" />
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {{ getInitials(user.person?.firstname, user.person?.lastname) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ user.person?.firstname }} {{ user.person?.lastname }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ user.person?.email || user.username }}
                </p>
              </div>
              <div v-if="user.roles && user.roles.length > 0" class="flex flex-wrap gap-1">
                <span v-for="role in user.roles.slice(0, 2)" :key="role.id"
                  class="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {{ role.name }}
                </span>
              </div>
            </label>
          </div>
        </div>

        <!-- Selected count -->
        <div v-if="selectedUsers.length > 0" class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p class="text-sm font-medium text-green-900 dark:text-green-300">
            {{ selectedUsers.length }} utilisateur(s) sélectionné(s)
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
        <button type="button" @click="closeModal"
          class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          Annuler
        </button>
        <button @click="handleAddMembers" :disabled="isLoading || selectedUsers.length === 0"
          class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 transition-all">
          <span v-if="isLoading" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Ajout en cours...
          </span>
          <span v-else class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter {{ selectedUsers.length }} membre(s)
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GroupesServices } from '@/api/services/groupesService'
import { useUsers } from '@/composables/users/useUsers'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  groupe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()

const { usersList, fetchUsers } = useUsers()

const searchQuery = ref('')
const selectedUsers = ref([])
const selectedRole = ref('MEMBER')
const isLoading = ref(false)
const isLoadingUsers = ref(false)
const error = ref(null)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return usersList.value

  const query = searchQuery.value.toLowerCase()
  return usersList.value.filter(user => {
    const firstname = (user.person?.firstname || '').toLowerCase()
    const lastname = (user.person?.lastname || '').toLowerCase()
    const email = (user.person?.email || '').toLowerCase()
    const username = (user.username || '').toLowerCase()

    return firstname.includes(query) ||
      lastname.includes(query) ||
      email.includes(query) ||
      username.includes(query)
  })
})

const getInitials = (firstname, lastname) => {
  const first = firstname ? firstname.charAt(0).toUpperCase() : ''
  const last = lastname ? lastname.charAt(0).toUpperCase() : ''
  return `${first}${last}` || '?'
}

const handleAddMembers = async () => {
  if (selectedUsers.value.length === 0) return

  isLoading.value = true
  error.value = null

  try {
    let successCount = 0
    let errorCount = 0
    let lastErrorMessage = ''

    // Ajouter chaque utilisateur sélectionné avec le rôle choisi
    for (const userId of selectedUsers.value) {
      try {
        const response = await GroupesServices.addMemberToGroupe(
          props.groupe.id,
          userId,
          selectedRole.value
        )

        console.log('Response pour utilisateur', userId, ':', response.data)

        // Gérer le cas où l'API retourne 200 mais avec status ERROR dans le body
        if (response.data?.status === 'SUCCESS') {
          successCount++
        } else if (response.data?.status === 'ERROR') {
          errorCount++
          // Capturer le message d'erreur clair de l'API
          lastErrorMessage = response.data.message || 'Erreur inconnue'
        } else {
          errorCount++
        }
      } catch (err) {
        console.error(`Erreur pour l'utilisateur ${userId}:`, err)
        errorCount++
        // Capturer le message d'erreur de l'exception
        lastErrorMessage = err.response?.data?.message || err.message || 'Erreur inconnue'
      }
    }

    // Afficher les résultats
    if (successCount > 0 && errorCount === 0) {
      // Tous les ajouts ont réussi
      const message = `${successCount} membre(s) ajouté(s) avec succès`
      toast.success(message)
      emit('success')
      closeModal()
    } else if (successCount > 0 && errorCount > 0) {
      // Succès partiel
      const message = `${successCount} membre(s) ajouté(s), ${errorCount} erreur(s)`
      toast.warning(message)
      if (lastErrorMessage) {
        error.value = lastErrorMessage
      }
      emit('success')
    } else if (errorCount > 0) {
      // Tous les ajouts ont échoué
      // Afficher le message d'erreur clair de l'API
      error.value = lastErrorMessage || `${errorCount} erreur(s) lors de l'ajout`
      toast.error(lastErrorMessage || 'Erreur lors de l\'ajout des membres')
    }
  } catch (err) {
    // Erreur générale
    const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de l\'ajout des membres'
    error.value = errorMsg
    toast.error(errorMsg)
    console.error('Erreur générale:', err)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  emit('close')
}

onMounted(async () => {
  isLoadingUsers.value = true
  try {
    if (usersList.value.length === 0) {
      await fetchUsers()
    }
  } finally {
    isLoadingUsers.value = false
  }
})
</script>
