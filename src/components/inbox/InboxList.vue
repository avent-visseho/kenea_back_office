<template>
  <div class="flex h-[calc(100vh-180px)] gap-4">
    <!-- Sidebar Filters -->
    <div class="w-64 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-lg overflow-y-auto">
      <div class="space-y-3">
        <button @click="activeFilter = 'all'" :class="[
          'w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200',
          activeFilter === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <div>
              <div>Mes Ordonnances</div>
              <div class="text-xs font-normal opacity-75">{{ stats.total }}</div>
            </div>
          </div>
        </button>

        <button @click="activeFilter = 'pending'" :class="[
          'w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200',
          activeFilter === 'pending'
            ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div>En attente</div>
              <div class="text-xs font-normal opacity-75">{{ stats.pending }}</div>
            </div>
          </div>
        </button>

        <button @click="activeFilter = 'resolved'" :class="[
          'w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200',
          activeFilter === 'resolved'
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div>Approuvé</div>
              <div class="text-xs font-normal opacity-75">{{ stats.resolved }}</div>
            </div>
          </div>
        </button>

        <button @click="activeFilter = 'today'" :class="[
          'w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200',
          activeFilter === 'today'
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/30'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div>Aujourd'hui</div>
              <div class="text-xs font-normal opacity-75">{{ stats.today }}</div>
            </div>
          </div>
        </button>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 mb-2">PHARMACIES</div>
          <div class="space-y-1 max-h-64 overflow-y-auto">
            <button v-for="pharma in uniquePharmacies" :key="pharma"
              @click="selectedPharmacie = pharma; activeFilter = 'pharmacie'" :class="[
                'w-full px-4 py-2 rounded-lg text-left text-sm transition-all duration-200',
                activeFilter === 'pharmacie' && selectedPharmacie === pharma
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]">
              {{ pharma }}
            </button>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <input v-model="searchQuery" type="text" placeholder="Rechercher..."
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-lg mb-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Mes Ordonnances</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ filteredInbox.length }} ordonnance{{ filteredInbox.length !== 1 ? 's' : '' }}
            </p>
          </div>
          <button @click="refreshInbox"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
            <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rafraîchir
          </button>
        </div>
      </div>

      <!-- Messages List -->
      <div class="flex-1 overflow-y-auto space-y-3 pr-2">
        <div v-if="isLoading || isInitialLoading" class="flex justify-center items-center py-12">
          <div class="space-y-4 w-full">
            <div v-for="i in 3" :key="i"
              class="h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl animate-pulse">
            </div>
          </div>
        </div>

        <div v-else-if="filteredInbox.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <svg class="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p class="text-gray-500 dark:text-gray-400 font-medium">Aucune ordonnance</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Vous n'avez envoyé aucune ordonnance</p>
        </div>

        <div v-else v-for="message in filteredInbox" :key="message.id" @click="selectedMessage = message" :class="[
          'group rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg hover:scale-[1.01]',
          selectedMessage?.id === message.id
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
        ]">
          <div class="p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <div :class="[
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                    message.statut === 'PENDING'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  ]">
                    <span class="h-2 w-2 rounded-full"
                      :class="message.statut === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'"></span>
                    {{ message.statut === 'PENDING' ? 'En attente' : 'Approuvé' }}
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ message.code }}</span>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {{ message.pharmacieNom }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ message.detail?.length || 0 }} réponse(s)
                </p>
              </div>

              <div class="ml-4 flex-shrink-0 text-right">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ getTotalAmount(message) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ formatTime(message.dateEnvoi) }}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ formatDate(message.dateEnvoi) }}
              <span v-if="message.dateReponse" class="ml-auto text-emerald-600 dark:text-emerald-400">
                ✓ Répondu le {{ formatDate(message.dateReponse) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Panel -->
    <div v-if="selectedMessage"
      class="w-96 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg overflow-y-auto relative">
      <button @click="selectedMessage = null"
        class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Détails de l'ordonnance</h3>

      <div class="space-y-4">
        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Pharmacie</p>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{{ selectedMessage.pharmacieNom }}</p>
        </div>

        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Code Ordonnance</p>
          <p class="text-sm font-mono text-gray-900 dark:text-white">{{ selectedMessage.code }}</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Statut</p>
            <span :class="[
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium',
              selectedMessage.statut === 'PENDING'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
            ]">
              <span class="h-2 w-2 rounded-full"
                :class="selectedMessage.statut === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'"></span>
              {{ selectedMessage.statut }}
            </span>
          </div>

          <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Total</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ getTotalAmount(selectedMessage) }}</p>
          </div>
        </div>

        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Date d'envoi</p>
          <p class="text-sm text-gray-900 dark:text-white">{{ formatDateTime(selectedMessage.dateEnvoi) }}</p>
        </div>

        <!-- ✅ NOUVEAU : Affichage des détails de réponse -->
        <div v-if="selectedMessage.detail && Array.isArray(selectedMessage.detail) && selectedMessage.detail.length > 0"
          class="space-y-4">
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Réponses des pharmacies ({{ selectedMessage.detail.length }})
            </h4>

            <div v-for="detail in selectedMessage.detail" :key="detail.id"
              class="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-200 dark:border-emerald-900/30 mb-3">

              <div class="flex items-center justify-between mb-3">
                <span :class="[
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                  detail.statut === 'APPROVED'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                ]">
                  {{ detail.statut }}
                </span>
                <p class="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  {{ detail.total }} FCFA
                </p>
              </div>

              <div class="text-xs text-emerald-700 dark:text-emerald-400 mb-3">
                <p>✓ Disponible: {{ detail.totalDisponible }} FCFA</p>
                <p v-if="detail.totalNonDisponible > 0">✗ Non disponible: {{ detail.totalNonDisponible }} FCFA</p>
                <p class="mt-1">Répondu le {{ formatDateTime(detail.dateReponse) }}</p>
              </div>

              <!-- Produits -->
              <div v-if="detail.produits && Array.isArray(detail.produits) && detail.produits.length > 0"
                class="space-y-2">
                <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  Produits ({{ detail.produits.length }})
                </p>

                <div v-for="produit in detail.produits" :key="produit.id"
                  class="bg-white dark:bg-gray-800 rounded p-2 text-xs">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <p class="font-medium text-gray-900 dark:text-white">{{ produit.nomProduit }}</p>
                      <p class="text-gray-500 dark:text-gray-400">
                        Qté: {{ produit.quantite }} × {{ produit.prixUnitaire }} FCFA
                      </p>
                    </div>
                    <div class="flex flex-col items-end">
                      <p class="font-bold text-gray-900 dark:text-white">
                        {{ produit.quantite * produit.prixUnitaire }} FCFA
                      </p>
                      <span :class="[
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
                        produit.disponible
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      ]">
                        {{ produit.disponible ? '✓ Disponible' : '✗ Indisponible' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedMessage.dateReponse"
          class="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-200 dark:border-emerald-900/30">
          <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Date de réponse</p>
          <p class="text-sm text-emerald-900 dark:text-emerald-300">{{ formatDateTime(selectedMessage.dateReponse) }}
          </p>
        </div>

        <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button v-if="selectedMessage.statut === 'APPROVED' && getTotalAmount(selectedMessage) !== 'N/A'"
            @click="openPaymentModal(selectedMessage)"
            class="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all">
            💳 Payer {{ getTotalAmount(selectedMessage) }}
          </button>
          <button v-else-if="selectedMessage.statut === 'PENDING'" disabled
            class="w-full rounded-lg bg-gray-300 dark:bg-gray-600 px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed">
            ⏳ En attente de réponse
          </button>
          <button
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            📄 Voir l'ordonnance
          </button>
        </div>
      </div>
    </div>

    <PaymentModal :showModal="showPaymentModal" :paymentData="paymentData" @close="showPaymentModal = false"
      @paymentSuccess="handlePaymentSuccess" @paymentError="(err) => console.error(err)" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInbox } from '@/composables/inbox/useInbox'
import { useAuthStore } from '@/store/auth/auth'
import PaymentModal from './PaymentModal.vue'

const authStore = useAuthStore()
const { inboxList, isLoading, stats, fetchInboxByClientWithDetails } = useInbox()

const activeFilter = ref('all')
const selectedPharmacie = ref(null)
const selectedMessage = ref(null)
const searchQuery = ref('')

const showPaymentModal = ref(false)
const paymentData = ref(null)
const isInitialLoading = ref(true)

const uniquePharmacies = computed(() => {
  if (!Array.isArray(inboxList.value)) return []
  return [...new Set(inboxList.value.map(m => m?.pharmacieNom).filter(Boolean))]
})

const filteredInbox = computed(() => {
  if (!Array.isArray(inboxList.value)) return []

  let filtered = inboxList.value

  // Filter by active filter
  if (activeFilter.value === 'pending') {
    filtered = filtered.filter(m => m?.statut === 'PENDING')
  } else if (activeFilter.value === 'resolved') {
    filtered = filtered.filter(m => m?.statut === 'APPROVED')
  } else if (activeFilter.value === 'today') {
    const today = new Date()
    filtered = filtered.filter(m => {
      if (!m?.dateEnvoi) return false
      const date = new Date(m.dateEnvoi)
      return date.toDateString() === today.toDateString()
    })
  } else if (activeFilter.value === 'pharmacie' && selectedPharmacie.value) {
    filtered = filtered.filter(m => m?.pharmacieNom === selectedPharmacie.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m =>
      m?.code?.toLowerCase().includes(query) ||
      m?.pharmacieNom?.toLowerCase().includes(query) ||
      m?.clientNom?.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => {
    const dateA = a?.dateEnvoi ? new Date(a.dateEnvoi) : new Date(0)
    const dateB = b?.dateEnvoi ? new Date(b.dateEnvoi) : new Date(0)
    return dateB - dateA
  })
})

// ✅ Calculer le montant total de toutes les réponses
const getTotalAmount = (message) => {
  if (!message || !message.detail || !Array.isArray(message.detail) || message.detail.length === 0) {
    return 'N/A'
  }

  const total = message.detail.reduce((sum, detail) => sum + (detail?.total || 0), 0)
  return total > 0 ? `${total} FCFA` : 'N/A'
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
}

const formatTime = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const formatDateTime = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const refreshInbox = async () => {
  const userId = authStore.user?.id
  if (!userId) {
    console.error('❌ User ID not found')
    return
  }

  console.log('🔄 Refreshing inbox for user:', userId)
  await fetchInboxByClientWithDetails(userId)
}

const openPaymentModal = (message) => {
  if (!message || !message.detail || !Array.isArray(message.detail)) {
    console.error('❌ Données de message invalides')
    return
  }

  // Calculer le montant total depuis les détails
  const totalAmount = message.detail.reduce((sum, detail) => sum + (detail?.total || 0), 0)

  if (totalAmount <= 0) {
    console.error('❌ Montant total invalide')
    return
  }

  paymentData.value = {
    amount: totalAmount,
    description: `Paiement Ordonnance ${message.code}`,
    ordonnanceId: message.id,
    pharmacieId: message.pharmacieId
  }
  showPaymentModal.value = true
}

const handlePaymentSuccess = (data) => {
  console.log('✅ Paiement réussi:', data)
  showPaymentModal.value = false
  refreshInbox()
  // TODO: Afficher une notification de succès
}

onMounted(async () => {
  isInitialLoading.value = true

  const userId = authStore.user?.id

  if (!userId) {
    console.error('❌ User ID not found in store')
    console.log('Store user:', authStore.user)
    isInitialLoading.value = false
    return
  }

  console.log('✅ Loading inbox for user:', userId)

  try {
    await fetchInboxByClientWithDetails(userId)
  } catch (error) {
    console.error('❌ Error loading inbox:', error)
  } finally {
    isInitialLoading.value = false
  }
})
</script>