<!-- src/components/users/UserModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ isViewMode ? 'Détails de l\'utilisateur' : 'Modifier l\'utilisateur' }}
        </h3>
        <button @click="closeModal" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Informations personnelles -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations personnelles</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prénom
                </label>
                <input
                  v-model="formData.person.firstname"
                  type="text"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom
                </label>
                <input
                  v-model="formData.person.lastname"
                  type="text"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  v-model="formData.person.email"
                  type="email"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone
                </label>
                <input
                  v-model="formData.person.phone"
                  type="tel"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse
                </label>
                <input
                  v-model="formData.person.address"
                  type="text"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Localisation
                </label>
                <input
                  v-model="formData.person.location"
                  type="text"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>
            </div>
          </div>

          <!-- Informations du compte -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations du compte</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  v-model="formData.username"
                  type="text"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                  required
                />
              </div>

              <div v-if="!isViewMode" class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formData.enabled"
                    type="checkbox"
                    class="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Compte activé</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formData.locked"
                    type="checkbox"
                    class="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Verrouillé</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Coordonnées GPS -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Coordonnées GPS</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Latitude
                </label>
                <input
                  v-model.number="formData.person.latitude"
                  type="number"
                  step="any"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Longitude
                </label>
                <input
                  v-model.number="formData.person.longitude"
                  type="number"
                  step="any"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Altitude
                </label>
                <input
                  v-model.number="formData.person.altitude"
                  type="number"
                  step="any"
                  :disabled="isViewMode"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                />
              </div>
            </div>
          </div>

          <!-- Rôles -->
          <div v-if="isViewMode" class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Rôles</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="role in userData.roles" 
                :key="role.id"
                class="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
              >
                {{ role.name }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {{ isViewMode ? 'Fermer' : 'Annuler' }}
            </button>
            <button
              v-if="!isViewMode"
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUsers } from '@/composables/users/useUsers'

const props = defineProps({
  userData: {
    type: Object,
    default: null
  },
  isViewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const { updateUser, isLoading } = useUsers()

const formData = ref({
  id: '',
  username: '',
  enabled: true,
  locked: false,
  person: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    latitude: null,
    longitude: null,
    altitude: null
  }
})

watch(() => props.userData, (newData) => {
  if (newData) {
    formData.value = {
      id: newData.id || '',
      username: newData.username || '',
      enabled: newData.enabled ?? true,
      locked: newData.locked ?? false,
      person: {
        id: newData.person?.id || '',
        firstname: newData.person?.firstname || '',
        lastname: newData.person?.lastname || '',
        email: newData.person?.email || '',
        phone: newData.person?.phone || '',
        address: newData.person?.address || '',
        location: newData.person?.location || '',
        latitude: newData.person?.latitude,
        longitude: newData.person?.longitude,
        altitude: newData.person?.altitude
      }
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (props.isViewMode) return

  try {
    const result = await updateUser(formData.value.id, formData.value)

    if (result.success) {
      emit('success')
      alert('Utilisateur modifié avec succès !')
    } else {
      alert(result.error || 'Erreur lors de la modification')
    }
  } catch (error) {
    console.error('❌ Erreur lors de la soumission:', error)
    alert('Une erreur est survenue')
  }
}

const closeModal = () => {
  emit('close')
}
</script>