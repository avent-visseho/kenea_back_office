<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isOpen"
              class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
              @click.stop
            >
              <!-- Header -->
              <div class="mb-6 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ isEditMode ? 'Modifier le pays' : 'Nouveau pays' }}
                </h3>
                <button
                  @click="handleClose"
                  class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom du pays <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="Ex: France"
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Code pays <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.code"
                    type="text"
                    required
                    :disabled="isEditMode"
                    placeholder="Ex: FR"
                    maxlength="2"
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 uppercase placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-gray-700"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Code ISO à 2 lettres (non modifiable après création)
                  </p>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Indicatif téléphonique <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+</span>
                    <input
                      v-model="formData.indicatif"
                      type="text"
                      required
                      placeholder="33"
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-8 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div v-if="errorMessage" class="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {{ errorMessage }}
                </div>

                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    @click="handleClose"
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                      <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </span>
                    <span v-else>
                      {{ isEditMode ? 'Modifier' : 'Créer' }}
                    </span>
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
import { ref, computed, watch } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const props = defineProps({
  paysData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'success'])

const { createPays, updatePays } = usePaysVille()

const isOpen = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => !!props.paysData)

const formData = ref({
  name: '',
  code: '',
  indicatif: ''
})

watch(() => props.paysData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name || newData.nom || '',
      code: newData.code || '',
      indicatif: newData.indicatif || ''
    }
  }
}, { immediate: true })

const handleClose = () => {
  isOpen.value = false
  setTimeout(() => {
    emit('close')
  }, 200)
}

const handleSubmit = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    let result

    if (isEditMode.value) {
      result = await updatePays(props.paysData.id || props.paysData.code, formData.value)
    } else {
      result = await createPays(formData.value)
    }

    if (result.success) {
      emit('success')
      handleClose()
    } else {
      errorMessage.value = result.error || 'Une erreur est survenue'
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de l\'enregistrement'
    console.error('Erreur:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>