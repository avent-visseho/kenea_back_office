<!-- src/components/users/AssignRoleModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Gérer les rôles
          </h3>
          <p v-if="userData" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ userData.person?.firstname }} {{ userData.person?.lastname }}
          </p>
        </div>
        <button @click="closeModal"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Alerte doublons -->
        <div v-if="duplicates.length > 0" class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <div class="flex-1">
              <p class="text-sm font-medium text-amber-800 dark:text-amber-300">
                Rôles en double détectés !
              </p>
              <p class="mt-1 text-xs text-amber-700 dark:text-amber-400">
                {{ duplicates.length }} rôle(s) en double : {{ duplicates.map(d => d.name).join(', ') }}
              </p>
            </div>
            <button @click="cleanupDuplicates" :disabled="isCleaningDuplicates"
              class="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isCleaningDuplicates ? 'Nettoyage...' : 'Nettoyer' }}
            </button>
          </div>
        </div>

        <!-- Rôles actuels -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rôles actuels ({{ uniqueCurrentRoles.length }})
            </label>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              Cliquez sur ✕ pour supprimer un rôle
            </span>
          </div>

          <div v-if="uniqueCurrentRoles.length > 0" class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-2">
              <div v-for="role in uniqueCurrentRoles" :key="role.id"
                class="group inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 transition-all hover:bg-blue-200 dark:hover:bg-blue-900/50">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ role.name }}</span>
                <button type="button" @click="confirmRemoveRole(role)" :disabled="isRemovingRole === role.id"
                  class="rounded-full hover:bg-blue-300 dark:hover:bg-blue-800 p-0.5 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50">
                  <svg v-if="isRemovingRole === role.id" class="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="p-4 text-center text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            Aucun rôle assigné
          </div>
        </div>

        <!-- Ajouter de nouveaux rôles -->
        <form @submit.prevent="handleSubmit">
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ajouter de nouveaux rôles
            </label>

            <!-- Tags des nouveaux rôles sélectionnés -->
            <div v-if="selectedRoles.length > 0" class="mb-3 flex flex-wrap gap-2">
              <div v-for="role in selectedRoles" :key="role.id"
                class="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <span>{{ role.name }}</span>
                <button type="button" @click="removeRole(role.id)"
                  class="rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 p-0.5 transition-colors">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Champ de recherche avec dropdown -->
            <div class="position-relative">
              <input type="text"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                v-model="searchQuery" @input="handleSearch" @focus="showDropdown = true" @blur="handleBlur"
                placeholder="Rechercher un rôle à ajouter..." autocomplete="off" />

              <!-- Dropdown Liste des rôles disponibles -->
              <div v-if="showDropdown && availableRoles.length > 0" class="autocomplete-dropdown">
                <div v-for="role in availableRoles" :key="role.id" class="autocomplete-item"
                  @mousedown.prevent="selectRole(role)"
                  :class="{ 'selected-item': isRoleSelected(role.id) }">
                  <div class="flex items-center gap-3 flex-1">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <svg class="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 dark:text-white">{{ role.name }}</div>
                      <div v-if="role.description" class="text-xs text-gray-500 dark:text-gray-400">
                        {{ role.description }}
                      </div>
                    </div>
                  </div>
                  <div v-if="isRoleSelected(role.id)" class="ml-2">
                    <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Message si aucun résultat -->
              <div v-if="showDropdown && searchQuery && availableRoles.length === 0" class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">Aucun rôle trouvé</span>
                </div>
              </div>

              <!-- Message si chargement -->
              <div v-if="showDropdown && isLoadingRoles" class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">Chargement des rôles...</span>
                </div>
              </div>

              <!-- Message si pas de rôles disponibles -->
              <div v-if="showDropdown && !searchQuery && !isLoadingRoles && availableRoles.length === 0"
                class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">
                    {{ uniqueCurrentRoles.length > 0 ? 'Tous les rôles sont déjà assignés' : 'Aucun rôle disponible' }}
                  </span>
                </div>
              </div>
            </div>

            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ selectedRoles.length }} nouveau(x) rôle(s) à ajouter
            </p>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
            <button type="button" @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700">
              Fermer
            </button>
            <button type="submit" :disabled="isLoading || selectedRoles.length === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? 'Attribution...' : `Ajouter ${selectedRoles.length} rôle(s)` }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoles } from '@/composables/roles/useRoles'
import { UsersServices } from '@/api/services/users'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()

const { rolesList, fetchRoles, isLoading: isLoadingRoles } = useRoles()

const currentRoles = ref([]) // Tous les rôles actuels (peut contenir des doublons)
const selectedRoles = ref([]) // Nouveaux rôles à ajouter
const searchQuery = ref('')
const showDropdown = ref(false)
const isLoading = ref(false)
const isRemovingRole = ref(null) // ID du rôle en cours de suppression
const isCleaningDuplicates = ref(false)

// Rôles uniques (sans doublons)
const uniqueCurrentRoles = computed(() => {
  const uniqueRoles = []
  const seenIds = new Set()

  for (const role of currentRoles.value) {
    if (!seenIds.has(role.id)) {
      seenIds.add(role.id)
      uniqueRoles.push(role)
    }
  }

  return uniqueRoles
})

// Détecter les doublons
const duplicates = computed(() => {
  const roleCount = {}
  const duplicateRoles = []

  // Compter les occurrences
  for (const role of currentRoles.value) {
    roleCount[role.id] = (roleCount[role.id] || 0) + 1
  }

  // Identifier les rôles en double
  for (const [roleId, count] of Object.entries(roleCount)) {
    if (count > 1) {
      const role = currentRoles.value.find(r => r.id === roleId)
      if (role) {
        duplicateRoles.push({ ...role, count })
      }
    }
  }

  return duplicateRoles
})

// Rôles disponibles = tous les rôles - rôles déjà assignés - rôles déjà sélectionnés
const availableRoles = computed(() => {
  // IDs des rôles déjà assignés (uniquement)
  const currentRoleIds = uniqueCurrentRoles.value.map(r => r.id)

  // IDs des rôles déjà sélectionnés pour ajout
  const selectedRoleIds = selectedRoles.value.map(r => r.id)

  // Filtrer les rôles déjà assignés OU déjà sélectionnés
  let filtered = rolesList.value.filter(role => {
    return !currentRoleIds.includes(role.id) && !selectedRoleIds.includes(role.id)
  })

  // Filtrer par recherche si nécessaire
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(role => {
      const name = (role.name || '').toLowerCase()
      const description = (role.description || '').toLowerCase()
      return name.includes(query) || description.includes(query)
    })
  }

  return filtered
})

// Vérifier si un rôle est sélectionné pour ajout
const isRoleSelected = (roleId) => {
  return selectedRoles.value.some(r => r.id === roleId)
}

// Sélectionner un rôle pour l'ajouter
const selectRole = (role) => {
  if (!isRoleSelected(role.id)) {
    selectedRoles.value.push(role)
  }
  searchQuery.value = ''
  showDropdown.value = false
}

// Retirer un rôle de la sélection
const removeRole = (roleId) => {
  selectedRoles.value = selectedRoles.value.filter(r => r.id !== roleId)
}

// Gérer la recherche
const handleSearch = () => {
  showDropdown.value = true
}

// Gérer la perte de focus
const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

// Confirmer la suppression d'un rôle
const confirmRemoveRole = (role) => {
  if (confirm(`Êtes-vous sûr de vouloir retirer le rôle "${role.name}" à cet utilisateur ?`)) {
    handleRemoveRole(role)
  }
}

// Supprimer un rôle existant
const handleRemoveRole = async (role) => {
  isRemovingRole.value = role.id

  try {
    console.log('🗑️ Suppression du rôle:', {
      userId: props.userData.id,
      roleId: role.id,
      roleName: role.name
    })

    const response = await UsersServices.removeRole(props.userData.id, role.id)

    if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
      toast.success(`Rôle "${role.name}" supprimé avec succès`)

      // Retirer le rôle de la liste locale (retire une seule occurrence)
      const index = currentRoles.value.findIndex(r => r.id === role.id)
      if (index !== -1) {
        currentRoles.value.splice(index, 1)
      }

      emit('success')
    } else {
      const errorMsg = response.data.message || 'Erreur lors de la suppression du rôle'
      toast.error(errorMsg)
    }
  } catch (error) {
    console.error('❌ Erreur removeRole:', error)
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de la suppression du rôle'
    toast.error(errorMsg)
  } finally {
    isRemovingRole.value = null
  }
}

// Nettoyer automatiquement les doublons
const cleanupDuplicates = async () => {
  if (duplicates.value.length === 0) return

  isCleaningDuplicates.value = true

  try {
    let successCount = 0
    let errorCount = 0

    for (const duplicate of duplicates.value) {
      // Nombre de fois où il faut supprimer ce rôle (count - 1 pour garder une occurrence)
      const timesToRemove = duplicate.count - 1

      for (let i = 0; i < timesToRemove; i++) {
        try {
          await UsersServices.removeRole(props.userData.id, duplicate.id)

          // Retirer une occurrence de la liste locale
          const index = currentRoles.value.findIndex(r => r.id === duplicate.id)
          if (index !== -1) {
            currentRoles.value.splice(index, 1)
          }

          successCount++
        } catch (error) {
          console.error(`Erreur lors de la suppression du doublon ${duplicate.name}:`, error)
          errorCount++
        }
      }
    }

    if (errorCount === 0) {
      toast.success(`${successCount} doublon(s) supprimé(s) avec succès`)
    } else {
      toast.warning(`${successCount} doublon(s) supprimé(s), ${errorCount} erreur(s)`)
    }

    emit('success')
  } catch (error) {
    console.error('❌ Erreur cleanupDuplicates:', error)
    toast.error('Erreur lors du nettoyage des doublons')
  } finally {
    isCleaningDuplicates.value = false
  }
}

// Soumettre le formulaire pour ajouter de nouveaux rôles
const handleSubmit = async () => {
  if (selectedRoles.value.length === 0) {
    toast.error('Veuillez sélectionner au moins un rôle à ajouter')
    return
  }

  isLoading.value = true

  try {
    // Extraire uniquement les IDs des NOUVEAUX rôles à ajouter
    const roleIds = selectedRoles.value.map(role => role.id)

    console.log('📤 Ajout de nouveaux rôles:', {
      userId: props.userData.id,
      currentRoles: uniqueCurrentRoles.value.map(r => r.name),
      newRoles: selectedRoles.value.map(r => r.name),
      roleIdsToAdd: roleIds
    })

    // Appeler l'API pour ajouter les nouveaux rôles
    const response = await UsersServices.assignRole(props.userData.id, roleIds)

    if (response.data.status === 'SUCCESS' || response.status === 200) {
      toast.success(`${roleIds.length} rôle(s) ajouté(s) avec succès`)

      // Ajouter les nouveaux rôles à la liste locale
      currentRoles.value.push(...selectedRoles.value)
      selectedRoles.value = []

      emit('success')
    } else {
      const errorMsg = response.data.message || 'Erreur lors de l\'ajout des rôles'
      toast.error(errorMsg)
    }
  } catch (error) {
    console.error('❌ Erreur assignRole:', error)
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de l\'ajout des rôles'
    toast.error(errorMsg)
  } finally {
    isLoading.value = false
  }
}

// Fermer le modal
const closeModal = () => {
  emit('close')
}

// Initialiser les rôles actuels de l'utilisateur
const initializeCurrentRoles = () => {
  if (props.userData && props.userData.roles && Array.isArray(props.userData.roles)) {
    // Copier tous les rôles (y compris les doublons éventuels)
    currentRoles.value = [...props.userData.roles]

    console.log('📋 Rôles de l\'utilisateur:', {
      total: currentRoles.value.length,
      unique: uniqueCurrentRoles.value.length,
      duplicates: duplicates.value.length,
      roles: currentRoles.value.map(r => r.name)
    })
  }
}

// Charger les rôles au montage
onMounted(async () => {
  // Initialiser les rôles actuels
  initializeCurrentRoles()

  // Charger tous les rôles disponibles
  if (rolesList.value.length === 0) {
    await fetchRoles()
  }

  console.log('📋 Tous les rôles disponibles:', rolesList.value.length)
})
</script>

<style scoped>
.position-relative {
  position: relative;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1050;
  margin-top: 4px;
}

.dark .autocomplete-dropdown {
  background: #1f2937;
  border-color: #374151;
}

.autocomplete-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
}

.dark .autocomplete-item {
  border-bottom-color: #374151;
}

.autocomplete-item:last-child {
  border-bottom: none;
}

.autocomplete-item:hover {
  background-color: #f9fafb;
}

.dark .autocomplete-item:hover {
  background-color: #374151;
}

.autocomplete-item.selected-item {
  background-color: #f3e8ff;
}

.dark .autocomplete-item.selected-item {
  background-color: #4c1d95;
}

/* Scrollbar personnalisée */
.autocomplete-dropdown::-webkit-scrollbar {
  width: 8px;
}

.autocomplete-dropdown::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 10px;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-track {
  background: #374151;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 10px;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.dark .autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
