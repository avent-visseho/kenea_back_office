<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-3xl transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 pb-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Traiter l'ordonnance
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Code: {{ progression.code }} • ID: {{ progression.id }}
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

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Info Box -->
          <div class="rounded-lg bg-blue-50 p-4 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30">
            <div class="flex gap-3">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm text-blue-800 dark:text-blue-300">
                <p class="font-medium mb-1">Instructions</p>
                <ul class="list-disc list-inside space-y-0.5 text-xs">
                  <li>Ajoutez les médicaments disponibles</li>
                  <li>Indiquez les quantités et prix unitaires</li>
                  <li>Cochez "Disponible" pour les produits en stock</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Articles List -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Médicaments à traiter
              </label>
              <button type="button" @click="addItem"
                class="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Ajouter médicament
              </button>
            </div>

            <div v-if="items.length === 0"
              class="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-sm text-gray-500 dark:text-gray-400">Aucun médicament ajouté</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Cliquez sur "Ajouter médicament" pour commencer
              </p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="(item, index) in items" :key="index"
                class="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white">Médicament {{ index + 1 }}</h4>
                  <button type="button" @click="removeItem(index)"
                    class="p-1 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Nom du médicament *
                    </label>
                    <input v-model="item.nomProduit" type="text" placeholder="Ex: Amoxicilline" required
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Quantité *
                    </label>
                    <input v-model.number="item.quantite" type="number" min="1" placeholder="0" required
                      @input="calculateSubtotal(index)"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Prix unitaire (FCFA) *
                    </label>
                    <input v-model.number="item.prixUnitaire" type="number" min="0" step="1" placeholder="0" required
                      @input="calculateSubtotal(index)"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Sous-total (FCFA)
                    </label>
                    <div
                      class="px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                      {{ item.sousTotal.toLocaleString('fr-FR') }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input v-model="item.disponible" type="checkbox"
                      class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span
                      class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Médicament disponible en stock
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Section -->
          <div v-if="items.length > 0"
            class="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-900/30">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Montant total</span>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{{ items.length }} médicament(s)</p>
              </div>
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalAmount.toLocaleString('fr-FR')
                }} FCFA</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error"
            class="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <div class="flex gap-2">
              <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage"
            class="rounded-lg bg-green-50 p-4 text-sm text-green-600 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
            <div class="flex gap-2">
              <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ successMessage }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button type="button" @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || items.length === 0"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
              <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ isLoading ? 'Traitement en cours...' : 'Valider le traitement' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrdonnanceProgressions } from '@/composables/ordannance/useOrdonnanceProgressions'
import { useAuthStore } from '@/store/auth/auth'

const props = defineProps({
  progression: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()
const { traiterProgression, isLoading } = useOrdonnanceProgressions()

const items = ref([])
const error = ref(null)
const successMessage = ref(null)

// ✅ Récupérer l'ID utilisateur depuis le store
const userId = computed(() => authStore.user?.id || null)

const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.sousTotal || 0), 0)
})

const addItem = () => {
  items.value.push({
    nomProduit: '',
    quantite: 1,
    prixUnitaire: 0,
    sousTotal: 0,
    disponible: true
  })
}

const removeItem = (index) => {
  if (confirm('Voulez-vous vraiment supprimer ce médicament ?')) {
    items.value.splice(index, 1)
  }
}

const calculateSubtotal = (index) => {
  const item = items.value[index]
  if (item) {
    item.sousTotal = (item.quantite || 0) * (item.prixUnitaire || 0)
  }
}

const handleSubmit = async () => {
  error.value = null
  successMessage.value = null

  // ✅ Vérifier l'ID utilisateur
  if (!userId.value) {
    error.value = 'Utilisateur non connecté. Veuillez vous reconnecter.'
    console.error('❌ User ID non trouvé dans le store')
    return
  }

  // Validation
  const isValid = items.value.every(item =>
    item.nomProduit?.trim() &&
    item.quantite > 0 &&
    item.prixUnitaire >= 0
  )

  if (!isValid) {
    error.value = 'Veuillez remplir tous les champs correctement'
    return
  }

  // ✅ Formater les données selon le format attendu par l'API
  // Enlever id et sousTotal, garder seulement: nomProduit, quantite, prixUnitaire, disponible
  const payload = items.value.map(item => ({
    nomProduit: item.nomProduit.trim(),
    quantite: item.quantite,
    prixUnitaire: item.prixUnitaire,
    disponible: item.disponible
  }))

  console.log('📤 Envoi du traitement:', {
    ordonnanceId: props.progression.id,
    userId: userId.value,
    items: payload
  })

  const result = await traiterProgression(props.progression.id, payload, userId.value)

  if (result.success) {
    successMessage.value = 'Ordonnance traitée avec succès !'
    console.log('✅ Traitement réussi:', result.data)

    // Fermer le modal après 1 seconde
    setTimeout(() => {
      emit('success')
    }, 1000)
  } else {
    error.value = result.error || 'Erreur lors du traitement de l\'ordonnance'
    console.error('❌ Erreur traitement:', result.error)
  }
}

onMounted(() => {
  // ✅ Vérifier que l'utilisateur est bien connecté
  if (!userId.value) {
    console.error('❌ Utilisateur non connecté')
    error.value = 'Vous devez être connecté pour traiter une ordonnance'
  } else {
    console.log('✅ User ID récupéré:', userId.value)
  }

  // Ajouter un premier item par défaut
  addItem()
})
</script>