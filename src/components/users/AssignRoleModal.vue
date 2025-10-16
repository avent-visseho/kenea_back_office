<!-- src/components/users/AssignRoleModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Assigner des rôles
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
        <form @submit.prevent="handleSubmit">
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rôles <span class="text-red-500">*</span>
            </label>

            <!-- Tags des rôles sélectionnés -->
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
                :class="{ 'border-red-300 dark:border-red-700': formError && selectedRoles.length === 0 }"
                v-model="searchQuery" @input="handleSearch" @focus="showDropdown = true" @blur="handleBlur"
                placeholder="Rechercher un rôle..." autocomplete="off" />

              <!-- Dropdown Liste des rôles -->
              <div v-if="showDropdown && filteredRoles.length > 0" class="autocomplete-dropdown">
                <div v-for="role in filteredRoles" :key="role.id" class="autocomplete-item"
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
              <div v-if="showDropdown && searchQuery && filteredRoles.length === 0" class="autocomplete-dropdown">
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
              <div v-if="showDropdown && !searchQuery && !isLoadingRoles && rolesList.length === 0"
                class="autocomplete-dropdown">
                <div class="autocomplete-item text-center">
                  <span class="text-gray-500 dark:text-gray-400">Aucun rôle disponible</span>
                </div>
              </div>
            </div>

            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ selectedRoles.length }} rôle(s) sélectionné(s)
            </p>

            <p v-if="formError && selectedRoles.length === 0" class="mt-1 text-xs text-red-500 dark:text-red-400">
              Veuillez sélectionner au moins un rôle
            </p>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
            <button type="button" @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || selectedRoles.length === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? 'Attribution...' : 'Assigner les rôles' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoles } from '@/composables/roles/useRoles'
import { UsersServices } from '@/api/services/users'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const { rolesList, fetchRoles, isLoading: isLoadingRoles } = useRoles()

const selectedRoles = ref([])
const searchQuery = ref('')
const showDropdown = ref(false)
const isLoading = ref(false)
const formError = ref(false)

// Filtrer les rôles selon la recherche
const filteredRoles = computed(() => {
  if (!searchQuery.value) return rolesList.value

  const query = searchQuery.value.toLowerCase()
  return rolesList.value.filter(role => {
    const name = (role.name || '').toLowerCase()
    const description = (role.description || '').toLowerCase()
    return name.includes(query) || description.includes(query)
  })
})

// Vérifier si un rôle est sélectionné
const isRoleSelected = (roleId) => {
  return selectedRoles.value.some(r => r.id === roleId)
}

// Sélectionner un rôle
const selectRole = (role) => {
  if (!isRoleSelected(role.id)) {
    selectedRoles.value.push(role)
  }
  searchQuery.value = ''
  showDropdown.value = false
}

// Retirer un rôle
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

// Soumettre le formulaire
const handleSubmit = async () => {
  formError.value = false

  if (selectedRoles.value.length === 0) {
    formError.value = true
    return
  }

  isLoading.value = true

  try {
    // Extraire les IDs des rôles sélectionnés
    const roleIds = selectedRoles.value.map(role => role.id)

    console.log('📤 Attribution des rôles:', {
      userId: props.userData.id,
      roleIds
    })

    // Appeler l'API pour assigner les rôles
    const response = await UsersServices.assignRole(props.userData.id, roleIds)

    if (response.data.status === 'SUCCESS' || response.status === 200) {
      alert('Rôles assignés avec succès !')
      emit('success')
      closeModal()
    } else {
      alert(response.data.message || 'Erreur lors de l\'attribution des rôles')
    }
  } catch (error) {
    console.error('❌ Erreur assignRole:', error)
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de l\'attribution des rôles'
    alert(errorMsg)
  } finally {
    isLoading.value = false
  }
}

// Fermer le modal
const closeModal = () => {
  emit('close')
}

// Initialiser les rôles déjà assignés
watch(() => props.userData, (newData) => {
  if (newData && newData.roles && Array.isArray(newData.roles)) {
    selectedRoles.value = [...newData.roles]
  }
}, { immediate: true })

// Charger les rôles au montage
onMounted(async () => {
  if (rolesList.value.length === 0) {
    await fetchRoles()
  }
  console.log('📋 Rôles disponibles:', rolesList.value)
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