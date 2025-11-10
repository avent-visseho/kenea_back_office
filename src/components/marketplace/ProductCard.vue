<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-2"
    :class="isSelected ? 'border-brand-500' : 'border-transparent'"
  >
    <!-- Image du produit -->
    <div class="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        :src="product.image"
        :alt="product.nom"
        class="w-full h-full object-cover"
      />
      <!-- Badge ordonnance requise -->
      <div
        v-if="product.ordonnanceRequise"
        class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md"
      >
        Ordonnance requise
      </div>
      <!-- Badge stock faible -->
      <div
        v-if="product.stock < 20"
        class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-md"
      >
        Stock limité
      </div>
    </div>

    <!-- Contenu du produit -->
    <div class="p-4">
      <!-- Catégorie -->
      <div class="text-xs text-brand-600 dark:text-brand-400 font-medium mb-1">
        {{ product.categorie }}
      </div>

      <!-- Nom du produit -->
      <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-12">
        {{ product.nom }}
      </h4>

      <!-- Description -->
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 h-8">
        {{ product.description }}
      </p>

      <!-- Informations -->
      <div class="space-y-1 mb-3">
        <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Dosage:</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ product.dosage }}</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Format:</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ product.format }}</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Stock:</span>
          <span class="font-medium" :class="product.stock < 20 ? 'text-orange-600' : 'text-green-600'">
            {{ product.stock }} disponible(s)
          </span>
        </div>
      </div>

      <!-- Prix et action -->
      <div class="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div class="text-2xl font-bold text-brand-600 dark:text-brand-400">
            {{ product.prix }} <span class="text-sm">{{ product.devise }}</span>
          </div>
        </div>

        <!-- Bouton sélection -->
        <button
          @click="toggleSelection"
          class="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
          :class="
            isSelected
              ? 'bg-brand-500 text-white hover:bg-brand-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          "
        >
          <svg
            v-if="isSelected"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  selectedProducts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-selection'])

const isSelected = computed(() => {
  return props.selectedProducts.includes(props.product.id)
})

const toggleSelection = () => {
  emit('toggle-selection', props.product.id)
}
</script>
