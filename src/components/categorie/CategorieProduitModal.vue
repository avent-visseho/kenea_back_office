<!-- src/components/categorie/CategorieProduitsModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ isEditMode ? 'Modifier la catégorie' : 'Nouvelle catégorie' }}
            </h3>
          </div>
          <button @click="$emit('close')"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Nom de la catégorie -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom de la catégorie <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.nom" 
              type="text" 
              required
              placeholder="Ex: Analgésiques, Antibiotiques, Vitamines..."
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            />
            <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              Le nom doit être unique et descriptif
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea 
              v-model="form.description" 
              rows="4"
              placeholder="Décrivez brièvement cette catégorie de produits..."
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 resize-none"
            ></textarea>
            <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              Une bonne description aide à mieux organiser vos produits
            </p>
          </div>

          <!-- Info box -->
          <div class="rounded-lg bg-purple-50 p-4 border border-purple-100 dark:bg-purple-900/20 dark:border-purple-900/30">
            <div class="flex gap-3">
              <svg class="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm">
                <p class="font-medium text-purple-900 dark:text-purple-300 mb-1">
                  Conseils pour créer une catégorie
                </p>
                <ul class="list-disc list-inside space-y-1 text-purple-800 dark:text-purple-400">
                  <li>Utilisez des noms clairs et compréhensibles</li>
                  <li>Évitez les doublons avec les catégories existantes</li>
                  <li>La description facilite la recherche et le filtrage</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Erreur -->
          <div v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <div class="flex gap-2">
              <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button 
              type="button" 
              @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              :disabled="isLoading || !form.nom"
              class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isLoading ? 'Enregistrement...' : (isEditMode ? 'Modifier' : 'Créer') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'

const props = defineProps({
  categorieData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'success'])

const { createCategorie, updateCategorie, isLoading } = useProduitsCategorie()

const error = ref(null)
const isEditMode = computed(() => !!props.categorieData)

const form = ref({
  nom: '',
  description: ''
})

const handleSubmit = async () => {
  error.value = null

  // Validation
  if (!form.value.nom || form.value.nom.trim().length === 0) {
    error.value = 'Le nom de la catégorie est obligatoire'
    return
  }

  const data = {
    nom: form.value.nom.trim(),
    description: form.value.description?.trim() || ''
  }

  let result
  if (isEditMode.value) {
    const id = props.categorieData.id || props.categorieData.uuid || props.categorieData.code
    result = await updateCategorie(id, data)
  } else {
    result = await createCategorie(data)
  }

  if (result.success) {
    emit('success')
  } else {
    error.value = result.error || 'Une erreur est survenue'
  }
}

onMounted(() => {
  if (isEditMode.value && props.categorieData) {
    form.value = {
      nom: props.categorieData.nom || props.categorieData.name || '',
      description: props.categorieData.description || ''
    }
  }
})
</script>