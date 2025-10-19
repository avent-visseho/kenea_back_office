<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 pb-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Sous-groupes
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ groupe.nom }}
              </p>
            </div>
          </div>
          <button @click="$emit('close')"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="space-y-4">
          <!-- Add Form -->
          <div class="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 border border-green-200 dark:border-green-900/30">
            <form @submit.prevent="handleAddSousGroupe" class="flex gap-2">
              <input v-model="form.nom" type="text" placeholder="Nom du sous-groupe..."
                class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                @keyup.enter="handleAddSousGroupe" />
              <button type="submit" :disabled="isLoading || !form.nom.trim()"
                class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Ajouter
              </button>
            </form>
          </div>

          <!-- Error Message -->
          <div v-if="error"
            class="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <div class="flex gap-2">
              <svg class="h-4 w-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- List -->
          <div v-if="loadingList" class="space-y-2">
            <div v-for="i in 3" :key="i" class="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          <div v-else-if="sousGroupes.length === 0" class="text-center py-8">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-3">
              <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400 font-medium">Aucun sous-groupe</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">Créez votre premier sous-groupe</p>
          </div>

          <div v-else class="space-y-2">
            <div v-for="sousGroupe in sousGroupes" :key="sousGroupe.id"
              class="group flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-200">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <div
                  class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/50">
                  <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 13l3 3L22 4" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-gray-900 dark:text-white truncate">{{ sousGroupe.nom }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">ID: {{ sousGroupe.id }}</p>
                </div>
              </div>

              <button @click="confirmDeleteSousGroupe(sousGroupe)"
                class="flex-shrink-0 ml-2 p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button @click="$emit('close')"
            class="w-full rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGroupes } from '@/composables/groupe/useGroupes'

const props = defineProps({
  groupe: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'refresh'])

const { getSousGroupesByGroupe, createSousGroupe, deleteSousGroupe, isLoading } = useGroupes()

const form = ref({ nom: '' })
const error = ref(null)
const sousGroupes = ref([])
const loadingList = ref(false)

const loadSousGroupes = async () => {
  loadingList.value = true
  const result = await getSousGroupesByGroupe(props.groupe.id)
  if (result.success) {
    sousGroupes.value = result.data
  } else {
    error.value = result.error
  }
  loadingList.value = false
}

const handleAddSousGroupe = async () => {
  error.value = null

  if (!form.value.nom.trim()) {
    error.value = 'Veuillez entrer un nom'
    return
  }

  const result = await createSousGroupe(props.groupe.id, form.value.nom)

  if (result.success) {
    form.value.nom = ''
    await loadSousGroupes()
    emit('refresh')
  } else {
    error.value = result.error
  }
}

const confirmDeleteSousGroupe = (sousGroupe) => {
  if (confirm(`Supprimer "${sousGroupe.nom}" ?`)) {
    handleDeleteSousGroupe(sousGroupe)
  }
}

const handleDeleteSousGroupe = async (sousGroupe) => {
  const result = await deleteSousGroupe(sousGroupe.id)
  if (result.success) {
    await loadSousGroupes()
    emit('refresh')
  } else {
    error.value = result.error
  }
}

onMounted(async () => {
  await loadSousGroupes()
})
</script>