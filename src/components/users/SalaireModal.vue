<!-- src/components/users/SalaireModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Définir le salaire
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {{ userData?.person?.firstname }} {{ userData?.person?.lastname }}
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
        <form @submit.prevent="handleSubmit">
          <!-- Affichage du salaire actuel -->
          <div v-if="userData?.salaire" class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs font-medium text-blue-900 dark:text-blue-300">Salaire actuel</p>
            </div>
            <p class="text-xl font-bold text-blue-700 dark:text-blue-400">
              {{ formatCurrency(userData.salaire) }}
            </p>
          </div>

          <!-- Affichage des erreurs -->
          <div v-if="error" class="mb-4 p-3 text-sm rounded-lg bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {{ error }}
          </div>

          <!-- Affichage du message de succès -->
          <div v-if="successMessage"
            class="mb-4 p-3 text-sm rounded-lg bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {{ successMessage }}
          </div>

          <!-- Champ montant du salaire -->
          <div class="mb-6">
            <label for="salaire" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Montant du salaire <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input v-model.number="salaire" type="number" id="salaire" min="0" step="1000"
                class="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors text-lg font-medium"
                placeholder="Ex: 50000" required />
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">FCFA</span>
              </div>
            </div>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Entrez le montant du salaire mensuel en FCFA
            </p>
          </div>

          <!-- Aperçu du montant -->
          <div v-if="salaire > 0" class="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Nouveau salaire</p>
            <p class="text-2xl font-bold text-green-700 dark:text-green-400">
              {{ formatCurrency(salaire) }}
            </p>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="button" @click="closeModal"
              class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || !salaire"
              class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30 transition-all">
              <span v-if="isLoading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Enregistrement...
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
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

const salaire = ref(0)
const isLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)

// Initialiser avec le salaire existant
watch(() => props.userData, (newData) => {
  if (newData?.salaire) {
    salaire.value = newData.salaire
  }
}, { immediate: true })

const formatCurrency = (amount) => {
  if (!amount) return '0 FCFA'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount).replace('XOF', 'FCFA')
}

const handleSubmit = async () => {
  if (!salaire.value || salaire.value <= 0) {
    error.value = 'Veuillez entrer un montant valide'
    return
  }

  isLoading.value = true
  error.value = null
  successMessage.value = null

  try {
    const response = await UsersServices.updateSalaire(props.userData.id, salaire.value)

    if (response.data?.status === 'SUCCESS') {
      const successMsg = response.data.message || 'Salaire mis à jour avec succès'
      successMessage.value = successMsg
      toast.success(successMsg)

      // Fermer le modal après 1.5 secondes
      setTimeout(() => {
        emit('success')
        closeModal()
      }, 1500)
    } else if (response.data?.status === 'ERROR') {
      // Afficher le message d'erreur clair de l'API
      const errorMsg = response.data.message || 'Erreur lors de la mise à jour du salaire'
      error.value = errorMsg
      toast.error(errorMsg)
    } else {
      error.value = 'Erreur lors de la mise à jour du salaire'
      toast.error('Erreur lors de la mise à jour du salaire')
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Erreur de connexion au serveur'
    error.value = errorMsg
    toast.error(errorMsg)
    console.error('Update salaire error:', err)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  emit('close')
}
</script>
