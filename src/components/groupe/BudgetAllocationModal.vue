<!-- src/components/groupe/BudgetAllocationModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Gestion du budget
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
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
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Budget mensuel -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget mensuel total (XOF)
          </label>
          <input v-model.number="monthlyBudget" type="number" min="0" step="1000"
            placeholder="Ex: 500000"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500" />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Budget total: {{ formatCurrency(monthlyBudget) }}
          </p>
        </div>

        <!-- Répartition automatique -->
        <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-300">Répartition automatique</h4>
            <button @click="distributeEqually" type="button"
              class="px-3 py-1.5 text-xs font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors">
              Répartir équitablement
            </button>
          </div>
          <p class="text-xs text-blue-800 dark:text-blue-400">
            Cliquez sur "Répartir équitablement" pour distribuer le budget total de manière égale entre tous les membres
          </p>
        </div>

        <!-- Liste des allocations -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Allocations par membre ({{ members.length }})
          </h4>

          <div v-if="isLoading" class="space-y-2">
            <div v-for="i in 3" :key="i" class="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          <div v-else-if="members.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucun membre dans ce groupe
          </div>

          <div v-else class="space-y-2">
            <div v-for="member in members" :key="member.userId"
              class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {{ member.username ? member.username.charAt(0).toUpperCase() : '?' }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ member.username }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ member.role === 'ADMIN' ? 'Admin' : 'Membre' }}
                </p>
              </div>
              <div class="flex-1 max-w-xs">
                <input v-model.number="allocations[member.userId]" type="number" min="0" step="1000"
                  placeholder="Montant"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
              </div>
              <div class="text-sm font-medium text-gray-900 dark:text-white min-w-[120px] text-right">
                {{ formatCurrency(allocations[member.userId] || 0) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé -->
        <div class="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400">Budget total</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">
                {{ formatCurrency(monthlyBudget) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400">Total alloué</p>
              <p class="text-lg font-bold" :class="totalAllocated > monthlyBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
                {{ formatCurrency(totalAllocated) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400">Reste</p>
              <p class="text-lg font-bold" :class="remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'">
                {{ formatCurrency(remaining) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Warning si dépassement -->
        <div v-if="totalAllocated > monthlyBudget" class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30">
          <div class="flex gap-2">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-red-800 dark:text-red-400">
              Le total alloué dépasse le budget mensuel de {{ formatCurrency(totalAllocated - monthlyBudget) }}
            </p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30">
          <p class="text-sm text-red-800 dark:text-red-400">{{ error }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
        <button type="button" @click="closeModal"
          class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
          Annuler
        </button>
        <button @click="handleSubmit" :disabled="isSaving || totalAllocated > monthlyBudget"
          class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transition-all">
          <span v-if="isSaving" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enregistrement...
          </span>
          <span v-else>Enregistrer le budget</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GroupesServices } from '@/api/services/groupesService'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  groupe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()

const monthlyBudget = ref(props.groupe.monthlyBudget || 0)
const allocations = ref({})
const members = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

const totalAllocated = computed(() => {
  return Object.values(allocations.value).reduce((sum, amount) => sum + (Number(amount) || 0), 0)
})

const remaining = computed(() => {
  return monthlyBudget.value - totalAllocated.value
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount || 0)
}

const loadMembers = async () => {
  isLoading.value = true
  try {
    const response = await GroupesServices.getGroupeById(props.groupe.id)

    if (response.data?.status === 'SUCCESS' && response.data.body) {
      members.value = Array.isArray(response.data.body.membres) ? response.data.body.membres : []
    } else if (response.data?.membres && Array.isArray(response.data.membres)) {
      members.value = response.data.membres
    } else {
      members.value = []
    }

    // Initialiser les allocations avec les montants actuels
    members.value.forEach(member => {
      allocations.value[member.userId] = member.allocatedAmount || 0
    })
  } catch (err) {
    console.error('Erreur lors du chargement des membres:', err)
    toast.error('Erreur lors du chargement des membres')
    members.value = []
  } finally {
    isLoading.value = false
  }
}

const distributeEqually = () => {
  if (members.value.length === 0) return

  const amountPerMember = Math.floor(monthlyBudget.value / members.value.length)
  members.value.forEach(member => {
    allocations.value[member.userId] = amountPerMember
  })
}

const handleSubmit = async () => {
  if (totalAllocated.value > monthlyBudget.value) {
    error.value = 'Le total alloué ne peut pas dépasser le budget mensuel'
    return
  }

  isSaving.value = true
  error.value = null

  try {
    // Préparer les données pour l'API
    const budgetData = {
      amount: monthlyBudget.value,
      allocations: members.value.map(member => ({
        userId: member.userId,
        amount: allocations.value[member.userId] || 0
      }))
    }

    const response = await GroupesServices.setBudget(props.groupe.id, budgetData)

    if (response.data?.status === 'SUCCESS') {
      toast.success('Budget mis à jour avec succès')
      emit('success')
      closeModal()
    } else if (response.data?.status === 'ERROR') {
      error.value = response.data.message || 'Erreur lors de la mise à jour du budget'
      toast.error(error.value)
    } else {
      error.value = 'Erreur lors de la mise à jour du budget'
      toast.error(error.value)
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour du budget'
    error.value = errorMsg
    toast.error(errorMsg)
    console.error('Erreur:', err)
  } finally {
    isSaving.value = false
  }
}

const closeModal = () => {
  emit('close')
}

onMounted(() => {
  loadMembers()
})
</script>
