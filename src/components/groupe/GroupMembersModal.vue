<!-- src/components/groupe/GroupMembersModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Membres du groupe
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
        <!-- Actions Header -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{{ members.length }}</span>
              membre(s) dans ce groupe
            </div>
          </div>
          <button @click="showAddMemberModal = true"
            class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:shadow-lg shadow-green-500/30 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un membre
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="space-y-4 w-full">
            <div v-for="i in 3" :key="i" class="h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="members.length === 0" class="text-center py-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400 font-medium">Aucun membre dans ce groupe</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Ajoutez des membres pour commencer</p>
        </div>

        <!-- Members List -->
        <div v-else class="space-y-3">
          <div v-for="member in members" :key="member.id"
            class="group relative flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all">

            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-md">
              {{ member.username ? member.username.charAt(0).toUpperCase() : '?' }}
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <p class="text-base font-semibold text-gray-900 dark:text-white">
                  {{ member.username }}
                </p>
                <!-- Role Badge -->
                <span v-if="member.role === 'ADMIN'"
                  class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd" />
                  </svg>
                  Admin
                </span>
                <span v-else
                  class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Membre
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span class="truncate">{{ member.username }}</span>
                <span v-if="member.allocatedAmount !== undefined" class="whitespace-nowrap">
                  • Allocation: {{ formatCurrency(member.allocatedAmount) }}
                </span>
                <span v-if="member.currentBalance !== undefined" class="whitespace-nowrap">
                  • Solde: {{ formatCurrency(member.currentBalance) }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <!-- Promote Button -->
              <button v-if="member.role !== 'ADMIN'" @click="handlePromote(member)"
                class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg dark:text-purple-400 dark:hover:bg-purple-900/20 transition-colors"
                title="Promouvoir en Admin">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>

              <!-- Demote Button -->
              <button v-if="member.role === 'ADMIN'" @click="handleDemote(member)"
                class="p-2 text-orange-600 hover:bg-orange-50 rounded-lg dark:text-orange-400 dark:hover:bg-orange-900/20 transition-colors"
                title="Rétrograder en Membre">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <!-- Remove Button -->
              <button @click="confirmRemove(member)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                title="Retirer du groupe">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end p-6 border-t border-gray-200 dark:border-gray-800">
        <button @click="closeModal"
          class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30 transition-all">
          Fermer
        </button>
      </div>
    </div>

    <!-- Add Member Modal -->
    <AddMemberModal v-if="showAddMemberModal" :groupe="groupe" @close="showAddMemberModal = false"
      @success="handleAddMemberSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GroupesServices } from '@/api/services/groupesService'
import { useToast } from '@/composables/useToast'
import AddMemberModal from './AddMemberModal.vue'

const props = defineProps({
  groupe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'refresh'])
const toast = useToast()

const members = ref([])
const isLoading = ref(false)
const showAddMemberModal = ref(false)

const getInitials = (firstname, lastname) => {
  const first = firstname ? firstname.charAt(0).toUpperCase() : ''
  const last = lastname ? lastname.charAt(0).toUpperCase() : ''
  return `${first}${last}` || '?'
}

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
    // Récupérer les informations du groupe depuis l'API
    const response = await GroupesServices.getGroupeById(props.groupe.id)

    if (response.data?.status === 'SUCCESS' && response.data.body) {
      // Les membres sont dans response.data.body.membres
      members.value = Array.isArray(response.data.body.membres) ? response.data.body.membres : []
    } else if (response.data?.membres && Array.isArray(response.data.membres)) {
      members.value = response.data.membres
    } else {
      members.value = []
    }
  } catch (error) {
    console.error('Erreur lors du chargement des membres:', error)
    toast.error('Erreur lors du chargement des membres')
    members.value = []
  } finally {
    isLoading.value = false
  }
}

const handlePromote = async (member) => {
  try {
    const response = await GroupesServices.promoteMember(props.groupe.id, member.userId)

    if (response.data?.status === 'SUCCESS') {
      toast.success(`${member.username} a été promu Admin`)
      await loadMembers()
      emit('refresh')
    } else if (response.data?.status === 'ERROR') {
      const errorMsg = response.data.message || 'Erreur lors de la promotion'
      toast.error(errorMsg)
    } else {
      toast.error('Erreur lors de la promotion')
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de la promotion'
    toast.error(errorMsg)
  }
}

const handleDemote = async (member) => {
  try {
    const response = await GroupesServices.demoteMember(props.groupe.id, member.userId)

    if (response.data?.status === 'SUCCESS') {
      toast.success(`${member.username} a été rétrogradé en Membre`)
      await loadMembers()
      emit('refresh')
    } else if (response.data?.status === 'ERROR') {
      const errorMsg = response.data.message || 'Erreur lors de la rétrogradation'
      toast.error(errorMsg)
    } else {
      toast.error('Erreur lors de la rétrogradation')
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de la rétrogradation'
    toast.error(errorMsg)
  }
}

const confirmRemove = (member) => {
  if (confirm(`Êtes-vous sûr de vouloir retirer "${member.username}" de ce groupe ?`)) {
    handleRemove(member)
  }
}

const handleRemove = async (member) => {
  try {
    const response = await GroupesServices.removeMemberFromGroupe(props.groupe.id, member.userId)

    if (response.data?.status === 'SUCCESS') {
      toast.success(`${member.username} a été retiré du groupe`)
      await loadMembers()
      emit('refresh')
    } else if (response.data?.status === 'ERROR') {
      const errorMsg = response.data.message || 'Erreur lors de la suppression'
      toast.error(errorMsg)
    } else {
      toast.error('Erreur lors de la suppression')
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de la suppression'
    toast.error(errorMsg)
  }
}

const handleAddMemberSuccess = async () => {
  showAddMemberModal.value = false
  await loadMembers()
  emit('refresh')
}

const closeModal = () => {
  emit('close')
}

onMounted(() => {
  loadMembers()
})
</script>
