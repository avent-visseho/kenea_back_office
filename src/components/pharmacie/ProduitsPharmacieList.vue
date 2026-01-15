<!-- src/components/pharmacie/ProduitsPharmacieList.vue -->
<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Mes Produits
        </h3>

        <div class="flex items-center gap-3">
          <!-- Import -->
          <button
            @click="showImportModal = true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Importer
          </button>

          <!-- Export -->
          <button
            @click="handleExport"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Exporter
          </button>

          <!-- Nouveau produit -->
          <button
            @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau produit
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un produit..."
            class="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
      {{ error }}
    </div>

    <!-- Table -->
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Produit</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Prix</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Stock</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Promotion</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Expiration</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Fournisseur</p>
            </th>
            <th class="py-3 text-left">
              <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading -->
          <tr v-if="loading" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="7" class="py-8 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-else-if="filteredProduits.length === 0" class="border-t border-gray-100 dark:border-gray-800">
            <td colspan="7" class="py-8 text-center text-gray-500 dark:text-gray-400">
              Aucun produit trouvé
            </td>
          </tr>

          <!-- Products list -->
          <tr
            v-else
            v-for="produit in filteredProduits"
            :key="produit.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
          >
            <!-- Produit -->
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div v-if="produit.image" class="flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img :src="produit.image" :alt="produit.productName" class="h-full w-full object-cover" />
                </div>
                <div v-else class="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
                  <svg class="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-sm dark:text-white/90">
                    {{ produit.productName || 'N/A' }}
                  </p>
                  <p class="text-gray-500 text-xs dark:text-gray-400 mt-0.5">
                    ID: {{ produit.produitId }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Prix -->
            <td class="py-3 whitespace-nowrap">
              <p class="font-medium text-gray-800 text-sm dark:text-white/90">
                {{ produit.prix }} FCFA
              </p>
            </td>

            <!-- Stock -->
            <td class="py-3 whitespace-nowrap">
              <span
                class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                :class="produit.stock > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'"
              >
                {{ produit.stock }}
              </span>
            </td>

            <!-- Promotion -->
            <td class="py-3 whitespace-nowrap">
              <div v-if="produit.promotion" class="flex flex-col">
                <span class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Oui
                </span>
                <p class="text-xs text-gray-500 mt-1">{{ produit.prixPromotion }} FCFA</p>
              </div>
              <span v-else class="text-gray-400 text-sm">Non</span>
            </td>

            <!-- Date expiration -->
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-800 text-sm dark:text-white/90">
                {{ produit.dateExpiration || 'N/A' }}
              </p>
            </td>

            <!-- Fournisseur -->
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-800 text-sm dark:text-white/90">
                {{ produit.fournisseur || 'N/A' }}
              </p>
            </td>

            <!-- Actions -->
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <button
                  @click="openEditModal(produit)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/30"
                  title="Modifier"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(produit)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/30"
                  title="Supprimer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Create/Edit -->
  <ProduitPharmacieModal
    :show="showModal"
    :produit="selectedProduit"
    @close="closeModal"
    @saved="handleSaved"
  />

  <!-- Modal Import -->
  <ImportProduitModal
    :show="showImportModal"
    @close="showImportModal = false"
    @imported="handleImported"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduitsPharmacie } from '@/composables/pharmacie/useProduitsPharmacie'
import { useAuthStore } from '@/store/auth/auth'
import ProduitPharmacieModal from './ProduitPharmacieModal.vue'
import ImportProduitModal from './ImportProduitModal.vue'

const authStore = useAuthStore()
const { produitsPharmacie, loading, error, fetchProduitsPharmacie, deleteProduitPharmacie } = useProduitsPharmacie()

// État local
const searchQuery = ref('')
const showModal = ref(false)
const showImportModal = ref(false)
const selectedProduit = ref(null)

// Filtrage des produits
const filteredProduits = computed(() => {
  if (!searchQuery.value) {
    return produitsPharmacie.value
  }

  const query = searchQuery.value.toLowerCase()
  return produitsPharmacie.value.filter(produit =>
    produit.productName?.toLowerCase().includes(query) ||
    produit.produitId?.toLowerCase().includes(query) ||
    produit.fournisseur?.toLowerCase().includes(query)
  )
})

// Charger les produits au montage
onMounted(async () => {
  await fetchProduitsPharmacie()
})

// Ouvrir le modal de création
const openCreateModal = () => {
  selectedProduit.value = null
  showModal.value = true
}

// Ouvrir le modal d'édition
const openEditModal = (produit) => {
  selectedProduit.value = { ...produit }
  showModal.value = true
}

// Fermer le modal
const closeModal = () => {
  showModal.value = false
  selectedProduit.value = null
}

// Gérer la sauvegarde
const handleSaved = async () => {
  closeModal()
  await fetchProduitsPharmacie()
}

// Gérer l'import
const handleImported = async () => {
  showImportModal.value = false
  await fetchProduitsPharmacie()
}

// Confirmer la suppression
const confirmDelete = async (produit) => {
  if (confirm(`Voulez-vous vraiment supprimer le produit "${produit.productName}" ?`)) {
    const result = await deleteProduitPharmacie(produit.id)

    if (result.success) {
      alert('Produit supprimé avec succès')
    } else {
      alert(`Erreur: ${result.error}`)
    }
  }
}

// Gérer l'export
const handleExport = async () => {
  alert('Fonctionnalité d\'export en cours de développement')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
