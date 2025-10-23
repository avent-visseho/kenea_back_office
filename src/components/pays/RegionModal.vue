<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm"
        @click.self="handleClose">
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="isOpen" class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
              @click.stop>
              <div class="mb-6 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ isEditMode ? 'Modifier la région' : 'Nouvelle région' }}
                </h3>
                <button @click="handleClose"
                  class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Nom -->
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom de la région <span class="text-red-500">*</span>
                  </label>
                  <input v-model="formData.name" type="text" required placeholder="Ex: Atlantique" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500" />
                </div>

                <!-- Pays -->
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pays <span class="text-red-500">*</span>
                  </label>
                  <select v-model="formData.paysId" required class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                    <option value="">Sélectionner un pays</option>
                    <option v-for="pays in paysList" :key="pays.id" :value="pays.id">
                      {{ pays.name || pays.nom }}
                    </option>
                  </select>
                </div>

                <div v-if="errorMessage"
                  class="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {{ errorMessage }}
                </div>

                <div class="flex gap-3 pt-4">
                  <button type="button" @click="handleClose"
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium
                    text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Annuler
                  </button>

                  <button type="submit" :disabled="isSubmitting" class="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white
                    hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                    <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                      <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0
                          0 5.373 0 12h4zm2 5.291A7.962
                          7.962 0 014 12H0c0 3.042 1.135
                          5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </span>
                    <span v-else>{{ isEditMode ? 'Modifier' : 'Créer' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const props = defineProps({
  regionData: { type: Object, default: null }
})

const emit = defineEmits(['close', 'success'])
const { createRegions, updateRegions, paysList, fetchPaysList } = usePaysVille()

const isOpen = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')
const showDeleted = ref(false)

const isEditMode = computed(() => !!props.regionData)

const formData = ref({
  name: '',
  paysId: ''
})

onMounted(() => {
  if (paysList.value.length === 0) fetchPaysList(showDeleted.value)
})

watch(
  () => props.regionData,
  newData => {
    if (newData) {
      formData.value = {
        name: newData.name || newData.nom || '',
        paysId: newData.paysId || newData.pays_id || ''
      }
    }
  },
  { immediate: true }
)

const handleClose = () => {
  isOpen.value = false
  setTimeout(() => emit('close'), 200)
}

const handleSubmit = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    let result
    if (isEditMode.value) {
      result = await updateRegions(props.regionData.id, formData.value)
    } else {
      result = await createRegions(formData.value)
    }

    if (result.success) {
      emit('success')
      handleClose()
    } else {
      errorMessage.value = result.error || 'Une erreur est survenue'
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Erreur lors de l’enregistrement'
  } finally {
    isSubmitting.value = false
  }
}
</script>
