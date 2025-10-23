<!-- src/components/users/AssignEntityModal.vue -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Assigner des entités
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionnez les utilisateurs et leurs entités associées
                    </p>
                </div>
                <button @click="closeModal"
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6">
                <form @submit.prevent="handleSubmit">
                    <!-- Section: Sélection des utilisateurs -->
                    <div class="mb-6">
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Utilisateurs <span class="text-red-500">*</span>
                        </label>

                        <!-- Tags des utilisateurs sélectionnés -->
                        <div v-if="selectedUsers.length > 0" class="mb-3 flex flex-wrap gap-2">
                            <div v-for="user in selectedUsers" :key="user.id"
                                class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                <span>{{ user.person?.firstname }} {{ user.person?.lastname }}</span>
                                <button type="button" @click="removeUser(user.id)"
                                    class="rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 p-0.5 transition-colors">
                                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Champ de recherche utilisateurs -->
                        <div class="position-relative">
                            <input type="text"
                                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                :class="{ 'border-red-300 dark:border-red-700': formError && selectedUsers.length === 0 }"
                                v-model="userSearchQuery" @input="handleUserSearch" @focus="showUserDropdown = true"
                                @blur="handleUserBlur" placeholder="Rechercher un utilisateur..." autocomplete="off" />

                            <!-- Dropdown Liste des utilisateurs -->
                            <div v-if="showUserDropdown && filteredUsers.length > 0" class="autocomplete-dropdown">
                                <div v-for="user in filteredUsers" :key="user.id" class="autocomplete-item"
                                    @mousedown.prevent="selectUser(user)"
                                    :class="{ 'selected-item': isUserSelected(user.id) }">
                                    <div class="flex items-center gap-3 flex-1">
                                        <div
                                            class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <svg class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div class="flex-1">
                                            <div class="font-medium text-gray-900 dark:text-white">
                                                {{ user.person?.firstname }} {{ user.person?.lastname }}
                                            </div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                                {{ user.person?.email || user.username }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isUserSelected(user.id)" class="ml-2">
                                        <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div v-if="showUserDropdown && userSearchQuery && filteredUsers.length === 0"
                                class="autocomplete-dropdown">
                                <div class="autocomplete-item text-center">
                                    <span class="text-gray-500 dark:text-gray-400">Aucun utilisateur trouvé</span>
                                </div>
                            </div>
                        </div>

                        <p v-if="formError && selectedUsers.length === 0"
                            class="mt-1 text-xs text-red-500 dark:text-red-400">
                            Veuillez sélectionner au moins un utilisateur
                        </p>
                    </div>

                    <!-- Section: Sélection des entités par type -->
                    <div class="mb-6">
                        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Entités par type <span class="text-red-500">*</span>
                        </label>

                        <!-- Pharmacies -->
                        <div class="mb-4">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Pharmacies</h4>
                            </div>

                            <!-- Tags des pharmacies sélectionnées -->
                            <div v-if="selectedPharmacies.length > 0" class="mb-3 flex flex-wrap gap-2">
                                <div v-for="pharmacy in selectedPharmacies" :key="pharmacy.id"
                                    class="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    <span>{{ pharmacy.name }}</span>
                                    <button type="button" @click="removePharmacy(pharmacy.id)"
                                        class="rounded-full hover:bg-green-200 dark:hover:bg-green-800 p-0.5 transition-colors">
                                        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Champ de recherche pharmacies -->
                            <div class="position-relative">
                                <input type="text"
                                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    v-model="pharmacySearchQuery" @input="handlePharmacySearch"
                                    @focus="showPharmacyDropdown = true" @blur="handlePharmacyBlur"
                                    placeholder="Rechercher une pharmacie..." autocomplete="off" />

                                <!-- Dropdown Liste des pharmacies -->
                                <div v-if="showPharmacyDropdown && filteredPharmacies.length > 0"
                                    class="autocomplete-dropdown">
                                    <div v-for="pharmacy in filteredPharmacies" :key="pharmacy.id"
                                        class="autocomplete-item" @mousedown.prevent="selectPharmacy(pharmacy)"
                                        :class="{ 'selected-item': isPharmacySelected(pharmacy.id) }">
                                        <div class="flex items-center gap-3 flex-1">
                                            <div
                                                class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                                <svg class="h-4 w-4 text-green-600 dark:text-green-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div class="flex-1">
                                                <div class="font-medium text-gray-900 dark:text-white">{{ pharmacy.name
                                                    }}</div>
                                                <div v-if="pharmacy.code"
                                                    class="text-xs text-gray-500 dark:text-gray-400">
                                                    {{ pharmacy.code }}
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="isPharmacySelected(pharmacy.id)" class="ml-2">
                                            <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="showPharmacyDropdown && pharmacySearchQuery && filteredPharmacies.length === 0"
                                    class="autocomplete-dropdown">
                                    <div class="autocomplete-item text-center">
                                        <span class="text-gray-500 dark:text-gray-400">Aucune pharmacie trouvée</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p v-if="formError && selectedPharmacies.length === 0"
                            class="mt-1 text-xs text-red-500 dark:text-red-400">
                            Veuillez sélectionner au moins une entité
                        </p>
                    </div>

                    <!-- Résumé -->
                    <div v-if="selectedUsers.length > 0 || selectedPharmacies.length > 0"
                        class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Résumé de l'assignation
                        </h4>
                        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• {{ selectedUsers.length }} utilisateur(s) sélectionné(s)</li>
                            <li>• {{ selectedPharmacies.length }} pharmacie(s) sélectionnée(s)</li>
                        </ul>
                    </div>

                    <!-- Footer -->
                    <div class="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <button type="button" @click="closeModal"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700">
                            Annuler
                        </button>
                        <button type="submit"
                            :disabled="isLoading || selectedUsers.length === 0 || selectedPharmacies.length === 0"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isLoading ? 'Attribution...' : 'Assigner les entités' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsers } from '@/composables/users/useUsers'
import { UsersServices } from '@/api/services/users'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'

const emit = defineEmits(['close', 'success'])

const { usersList, fetchUsers, isLoading: isLoadingUsers } = useUsers()
const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()
// États pour les utilisateurs
const selectedUsers = ref([])
const userSearchQuery = ref('')
const showUserDropdown = ref(false)

// États pour les pharmacies (à remplacer par votre composable de pharmacies)

const selectedPharmacies = ref([])
const pharmacySearchQuery = ref('')
const showPharmacyDropdown = ref(false)

const isLoading = ref(false)
const formError = ref(false)

// Filtrer les utilisateurs selon la recherche
const filteredUsers = computed(() => {
    if (!userSearchQuery.value) return usersList.value

    const query = userSearchQuery.value.toLowerCase()
    return usersList.value.filter(user => {
        const firstname = (user.person?.firstname || '').toLowerCase()
        const lastname = (user.person?.lastname || '').toLowerCase()
        const email = (user.person?.email || '').toLowerCase()
        const username = (user.username || '').toLowerCase()
        return firstname.includes(query) || lastname.includes(query) || email.includes(query) || username.includes(query)
    })
})

// Filtrer les pharmacies selon la recherche
const filteredPharmacies = computed(() => {
    if (!pharmacySearchQuery.value) return pharmaciesList.value

    const query = pharmacySearchQuery.value.toLowerCase()
    return pharmaciesList.value.filter(pharmacy => {
        const name = (pharmacy.name || '').toLowerCase()
        const code = (pharmacy.code || '').toLowerCase()
        return name.includes(query) || code.includes(query)
    })
})

// Fonctions pour les utilisateurs
const isUserSelected = (userId) => {
    return selectedUsers.value.some(u => u.id === userId)
}

const selectUser = (user) => {
    if (!isUserSelected(user.id)) {
        selectedUsers.value.push(user)
    }
    userSearchQuery.value = ''
    showUserDropdown.value = false
}

const removeUser = (userId) => {
    selectedUsers.value = selectedUsers.value.filter(u => u.id !== userId)
}

const handleUserSearch = () => {
    showUserDropdown.value = true
}

const handleUserBlur = () => {
    setTimeout(() => {
        showUserDropdown.value = false
    }, 200)
}

// Fonctions pour les pharmacies
const isPharmacySelected = (pharmacyId) => {
    return selectedPharmacies.value.some(p => p.id === pharmacyId)
}

const selectPharmacy = (pharmacy) => {
    if (!isPharmacySelected(pharmacy.id)) {
        selectedPharmacies.value.push(pharmacy)
    }
    pharmacySearchQuery.value = ''
    showPharmacyDropdown.value = false
}

const removePharmacy = (pharmacyId) => {
    selectedPharmacies.value = selectedPharmacies.value.filter(p => p.id !== pharmacyId)
}

const handlePharmacySearch = () => {
    showPharmacyDropdown.value = true
}

const handlePharmacyBlur = () => {
    setTimeout(() => {
        showPharmacyDropdown.value = false
    }, 200)
}

// Charger les pharmacies (remplacez par votre API)
/* const fetchPharmacies = async () => {
    isLoadingPharmacies.value = true
    try {
        // TODO: Remplacer par votre service de pharmacies
        // const response = await PharmaciesServices.getPharmacies()
        // pharmaciesList.value = response.data

        // Exemple de données fictives pour le développement
        pharmaciesList.value = [
            { id: 'PHA-1760968506496-355', name: 'Pharmacie Centrale', code: 'PC001' },
            { id: 'PHA-1760968506496-356', name: 'Pharmacie du Nord', code: 'PN002' },
            { id: 'PHA-1760968506496-357', name: 'Pharmacie de la Place', code: 'PP003' }
        ]
    } catch (error) {
        console.error('❌ Erreur lors du chargement des pharmacies:', error)
    } finally {
        isLoadingPharmacies.value = false
    }
} */

// Soumettre le formulaire
const handleSubmit = async () => {
    formError.value = false

    if (selectedUsers.length === 0) {
        formError.value = true
        alert('Veuillez sélectionner au moins un utilisateur')
        return
    }

    if (selectedPharmacies.length === 0) {
        formError.value = true
        alert('Veuillez sélectionner au moins une entité')
        return
    }

    isLoading.value = true

    try {
        // Préparer les données selon le format de l'API
        const payload = {
            utilisateurIds: selectedUsers.value.map(user => user.id),
            assignments: {
                PHARMACIE: selectedPharmacies.value.map(pharmacy => pharmacy.id)
            }
        }

        console.log('📤 Attribution des entités:', payload)

        const response = await UsersServices.assignEntity(payload)

        if (response.data.status === 'SUCCESS' || response.status === 200) {
            alert('Entités assignées avec succès !')
            emit('success')
            closeModal()
        } else {
            alert(response.data.message || 'Erreur lors de l\'attribution des entités')
        }
    } catch (error) {
        console.error('❌ Erreur assignEntity:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de l\'attribution des entités'
        alert(errorMsg)
    } finally {
        isLoading.value = false
    }
}

// Fermer le modal
const closeModal = () => {
    emit('close')
}

// Charger les données au montage
onMounted(async () => {
    if (usersList.value.length === 0) {
        await fetchUsers()
    }
    await fetchPharmaciesList()
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
    background-color: #dbeafe;
}

.dark .autocomplete-item.selected-item {
    background-color: #1e3a8a;
}

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