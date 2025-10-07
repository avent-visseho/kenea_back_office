<!-- src/components/produit/ProduitModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ isEditMode ? 'Modifier le produit' : 'Nouveau produit' }}
          </h3>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 space-y-4">
        <!-- Nom -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom du produit <span class="text-red-500">*</span>
          </label>
          <input v-model="formData.nom" type="text" placeholder="Ex: Paracétamol 500mg"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            :class="{ 'border-red-500': errors.nom }" />
          <p v-if="errors.nom" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.nom }}</p>
        </div>

        <!-- Prix -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prix (FCFA) <span class="text-red-500">*</span>
          </label>
          <input v-model.number="formData.prix" type="number" step="0.01" placeholder="Ex: 2500"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            :class="{ 'border-red-500': errors.prix }" />
          <p v-if="errors.prix" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.prix }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description <span class="text-red-500">*</span>
          </label>
          <textarea v-model="formData.description" rows="3" placeholder="Description du produit..."
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 resize-none"
            :class="{ 'border-red-500': errors.description }"></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.description }}</p>
        </div>

        <!-- Pharmacie -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pharmacie <span class="text-red-500">*</span>
          </label>
          <select v-model="formData.pharmacieId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            :class="{ 'border-red-500': errors.pharmacieId }">
            <option value="">-- Sélectionner une pharmacie --</option>
            <option v-for="pharmacie in pharmaciesList" :key="pharmacie.id" :value="pharmacie.id">
              {{ pharmacie.nom || pharmacie.name }}
            </option>
          </select>
          <p v-if="errors.pharmacieId" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.pharmacieId }}</p>
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie <span class="text-red-500">*</span>
          </label>
          <select v-model="formData.categorieId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            :class="{ 'border-red-500': errors.categorieId }">
            <option value="">-- Sélectionner une catégorie --</option>
            <option v-for="categorie in categoriesList" :key="categorie.id" :value="categorie.id">
              {{ categorie.nom || categorie.name }}
            </option>
          </select>
          <p v-if="errors.categorieId" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.categorieId }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <button @click="$emit('close')" :disabled="isSubmitting"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
          Annuler
        </button>
        <button @click="handleSubmit" :disabled="isSubmitting"
          class="px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <span v-if="!isSubmitting">{{ isEditMode ? 'Modifier' : 'Créer' }}</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isEditMode ? 'Modification...' : 'Création...' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduits } from '@/composables/pharmacie/useProduits'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { useProduitsCategorie } from '@/composables/pharmacie/useCategories'

const props = defineProps({
  produitData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'success'])

const { createProduit, updateProduit } = useProduits()
const { pharmaciesList, fetchPharmaciesList } = usePharmaciesVille()
const { categoriesList, fetchCategories } = useProduitsCategorie()

const isEditMode = computed(() => !!props.produitData)
const isSubmitting = ref(false)
const errors = ref({})

const formData = ref({
  nom: '',
  prix: null,
  description: '',
  pharmacieId: '',
  categorieId: ''
})

const initForm = () => {
  if (props.produitData) {
    formData.value = {
      nom: props.produitData.nom || '',
      prix: props.produitData.prix || null,
      description: props.produitData.description || '',
      pharmacieId: props.produitData.pharmacieNameId || props.produitData.pharmacieId || '',
      categorieId: props.produitData.categorieId || ''
    }
  }
}

const validateForm = () => {
  errors.value = {}

  if (!formData.value.nom?.trim()) {
    errors.value.nom = 'Le nom est requis'
  }

  if (!formData.value.prix || formData.value.prix <= 0) {
    errors.value.prix = 'Le prix doit être supérieur à 0'
  }

  if (!formData.value.description?.trim()) {
    errors.value.description = 'La description est requise'
  }

  if (!formData.value.pharmacieId) {
    errors.value.pharmacieId = 'La pharmacie est requise'
  }

  if (!formData.value.categorieId) {
    errors.value.categorieId = 'La catégorie est requise'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    let result
    
    if (isEditMode.value) {
      result = await updateProduit(props.produitData.id, formData.value)
    } else {
      result = await createProduit(formData.value)
    }

    if (result.success) {
      emit('success')
    } else {
      alert(result.error || 'Une erreur est survenue')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  initForm()
  
  if (pharmaciesList.value.length === 0) {
    await fetchPharmaciesList()
  }
  
  if (categoriesList.value.length === 0) {
    await fetchCategories()
  }
})
</script>