<template>
  <div class="space-y-6">
    <!-- Barre de recherche et filtres -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Recherche -->
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un produit..."
              class="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
            />
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Filtre par catégorie -->
        <div class="w-full md:w-64">
          <select
            v-model="selectedCategory"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Toutes les catégories</option>
            <option v-for="category in availableCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Filtre ordonnance -->
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="showOnlyWithoutPrescription"
              type="checkbox"
              class="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Sans ordonnance uniquement</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Résumé -->
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</span>
        produit(s) trouvé(s)
      </div>
      <div v-if="selectedProducts.length > 0" class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ selectedProducts.length }} produit(s) sélectionné(s)
        </span>
        <button
          @click="clearSelection"
          class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
        >
          Tout désélectionner
        </button>
      </div>
    </div>

    <!-- Grille de produits -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :selected-products="selectedProducts"
        @toggle-selection="toggleProductSelection"
      />
    </div>

    <!-- Message si aucun produit -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
      <svg
        class="w-16 h-16 mx-auto text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Aucun produit trouvé
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Essayez de modifier vos critères de recherche
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  selectedProducts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle-selection', 'clear-selection'])

const searchQuery = ref('')
const selectedCategory = ref('')
const showOnlyWithoutPrescription = ref(false)

// Catégories disponibles dans les produits
const availableCategories = computed(() => {
  const categories = [...new Set(props.products.map(p => p.categorie))]
  return categories.sort()
})

// Produits filtrés
const filteredProducts = computed(() => {
  let filtered = props.products

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.nom.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.categorie.toLowerCase().includes(query)
    )
  }

  // Filtre par catégorie
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.categorie === selectedCategory.value)
  }

  // Filtre sans ordonnance
  if (showOnlyWithoutPrescription.value) {
    filtered = filtered.filter(p => !p.ordonnanceRequise)
  }

  return filtered
})

const toggleProductSelection = (productId) => {
  emit('toggle-selection', productId)
}

const clearSelection = () => {
  emit('clear-selection')
}
</script>
