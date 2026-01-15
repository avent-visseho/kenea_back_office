<!-- src/components/common/ToastContainer.vue -->
<script setup>
import { useToast } from '@/composables/useToast'
import { computed } from 'vue'

const { toasts, removeToast } = useToast()

// Icônes pour chaque type de toast
const getIcon = (type) => {
  switch (type) {
    case 'success':
      return `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      `
    case 'error':
      return `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
      `
    case 'warning':
      return `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      `
    case 'info':
    default:
      return `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      `
  }
}

// Classes CSS pour chaque type de toast
const getToastClasses = (type) => {
  const baseClasses =
    'flex items-center gap-3 w-full max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out'

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200`
    case 'error':
      return `${baseClasses} bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200`
    case 'warning':
      return `${baseClasses} bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200`
    case 'info':
    default:
      return `${baseClasses} bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200`
  }
}

// Classes pour l'icône
const getIconClasses = (type) => {
  switch (type) {
    case 'success':
      return 'text-green-600 dark:text-green-400'
    case 'error':
      return 'text-red-600 dark:text-red-400'
    case 'warning':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'info':
    default:
      return 'text-blue-600 dark:text-blue-400'
  }
}
</script>

<template>
  <!-- Container des toasts - Position fixe en haut à droite -->
  <div
    aria-live="polite"
    aria-atomic="true"
    class="fixed top-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none"
  >
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getToastClasses(toast.type)"
        class="pointer-events-auto"
        role="alert"
      >
        <!-- Icône -->
        <div :class="getIconClasses(toast.type)" v-html="getIcon(toast.type)"></div>

        <!-- Message -->
        <div class="flex-1 text-sm font-medium">
          {{ toast.message }}
        </div>

        <!-- Bouton de fermeture -->
        <button
          @click="removeToast(toast.id)"
          class="inline-flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          :aria-label="`Fermer la notification ${toast.type}`"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
/* Animations d'entrée/sortie des toasts */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
