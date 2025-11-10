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
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Détails de la progression
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                ID: {{ progression.id }}
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
        <div class="space-y-6">
          <!-- Status Section -->
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Statut</p>
              <div class="flex items-center gap-2">
                <span :class="getStatusClass(progression.statut)"
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                  <span class="h-2 w-2 rounded-full" :class="getStatFCFAotClass(progression.statut)"></span>
                  {{ getStatusLabel(progression.statut) }}
                </span>
              </div>
            </div>

            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">État</p>
              <span v-if="progression.deleted"
                class="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-medium dark:bg-red-900/30 dark:text-red-400">
                <span class="h-2 w-2 rounded-full bg-red-500"></span>
                Supprimée
              </span>
              <span v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-medium dark:bg-emerald-900/30 dark:text-emerald-400">
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                Active
              </span>
            </div>
          </div>

          <!-- Dates Section -->
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Date création</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(progression.createAt) }}
              </p>
            </div>

            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Date mise à jour</p>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(progression.updateAt) }}
              </p>
            </div>
          </div>

          <!-- Additional Info if available -->
          <div v-if="progression.ordonnanceId" class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
            <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">Ordonnance associée</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ progression.ordonnanceId }}
            </p>
          </div>

          <!-- Items List if available -->
          <div v-if="progression.items && progression.items.length > 0" class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Articles</p>
            <div class="space-y-2">
              <div v-for="(item, index) in progression.items" :key="index" class="flex justify-between items-center text-sm">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ item.nomProduit }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Qté: {{ item.quantite }} | Prix unitaire: {{ item.prixUnitaire }}€
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900 dark:text-white">{{ item.sousTotal }}€</p>
                  <span v-if="item.disponible" class="text-xs text-emerald-600 dark:text-emerald-400">Disponible</span>
                  <span v-else class="text-xs text-red-600 dark:text-red-400">Non disponible</span>
                </div>
              </div>
            </div>
          </div>

          <!-- JSON Data for Debug -->
          <details class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <summary class="cursor-pointer text-xs font-medium text-gray-500 dark:text-gray-400">Données complètes</summary>
            <pre class="mt-2 overflow-auto text-xs text-gray-700 dark:text-gray-300">{{ JSON.stringify(progression, null, 2) }}</pre>
          </details>
        </div>

        <!-- Footer -->
        <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button @click="$emit('close')"
            class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progression: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'COMPLETED': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'IN_PROGRESS': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatFCFAotClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-500',
    'COMPLETED': 'bg-emerald-500',
    'IN_PROGRESS': 'bg-blue-500'
  }
  return classes[status] || 'bg-gray-500'
}

const getStatusLabel = (status) => {
  const labels = {
    'PENDING': 'En attente',
    'COMPLETED': 'Complétée',
    'IN_PROGRESS': 'En cours'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>