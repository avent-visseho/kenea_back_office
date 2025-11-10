<!-- src/components/ordonnances/ViewOrdonnanceModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-4xl transform rounded-2xl bg-white shadow-2xl transition-all dark:bg-gray-900">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Ordonnance {{ ordonnance?.code }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ ordonnance?.id }}
              </p>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 transition-colors"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Informations -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Informations de l'ordonnance
              </h4>

              <!-- Statut -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                    <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Statut</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ getStatusLabel(ordonnance?.etat) }}
                    </p>
                  </div>
                </div>
                <span
                  :class="getStatusClass(ordonnance?.etat)"
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="getStatFCFAotClass(ordonnance?.etat)"></span>
                  {{ getStatusLabel(ordonnance?.etat) }}
                </span>
              </div>

              <!-- Code -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                    <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Code</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white font-mono">
                      {{ ordonnance?.code }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Utilisateur -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                    <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Utilisateur</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ ordonnance?.utilisateurId }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Pharmacie -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-900 shadow-sm">
                    <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Pharmacie</p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ ordonnance?.pharmacieId }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-2 gap-3">
                <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Créée le</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(ordonnance?.createAt) }}
                  </p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Mise à jour</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ formatDate(ordonnance?.updateAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Image Preview -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Aperçu de l'ordonnance
              </h4>

              <div class="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div v-if="ordonnance?.data" class="aspect-[3/4] w-full">
                  <img
                    :src="`data:image/png;base64,${ordonnance.data}`"
                    alt="Ordonnance"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div v-else class="aspect-[3/4] w-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Aucun aperçu disponible
                    </p>
                  </div>
                </div>

                <!-- Download Button Overlay -->
                <div v-if="ordonnance?.data" class="absolute top-3 right-3">
                  <button
                    @click="downloadImage"
                    class="flex items-center gap-2 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">
              ID: {{ ordonnance?.id }}
            </span>
          </div>
          <div class="flex gap-3">
            <button
              @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ordonnance: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'VALIDATED': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'APPROVED': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'REJECTED': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'CANCELLED': 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatFCFAotClass = (status) => {
  const classes = {
    'PENDING': 'bg-amber-500',
    'VALIDATED': 'bg-emerald-500',
    'APPROVED': 'bg-blue-500',
    'REJECTED': 'bg-red-500',
    'CANCELLED': 'bg-gray-500'
  }
  return classes[status] || 'bg-gray-500'
}

const getStatusLabel = (status) => {
  const labels = {
    'PENDING': 'En attente',
    'VALIDATED': 'Validée',
    'APPROVED': 'Approuvée',
    'REJECTED': 'Rejetée',
    'CANCELLED': 'Annulée'
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
    minute: '2-digit'
  })
}

const downloadImage = () => {
  if (!props.ordonnance?.data) return

  const link = document.createElement('a')
  link.href = `data:image/png;base64,${props.ordonnance.data}`
  link.download = `ordonnance-${props.ordonnance.code}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>