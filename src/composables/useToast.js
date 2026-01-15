// src/composables/useToast.js
import { ref } from 'vue'

// État global pour les toasts
const toasts = ref([])
let toastId = 0

export const useToast = () => {
  /**
   * Affiche un toast
   * @param {Object} options - Options du toast
   * @param {string} options.message - Message à afficher
   * @param {string} options.type - Type: 'success' | 'error' | 'warning' | 'info'
   * @param {number} options.duration - Durée en ms (0 = permanent)
   */
  const showToast = ({ message, type = 'info', duration = 5000 }) => {
    const id = ++toastId
    const toast = {
      id,
      message,
      type,
      visible: true,
    }

    toasts.value.push(toast)

    // Auto-fermeture après la durée spécifiée
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  /**
   * Retire un toast
   * @param {number} id - ID du toast à retirer
   */
  const removeToast = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Affiche un toast de succès
   * @param {string} message - Message de succès
   * @param {number} duration - Durée en ms
   */
  const success = (message, duration = 5000) => {
    return showToast({ message, type: 'success', duration })
  }

  /**
   * Affiche un toast d'erreur
   * @param {string} message - Message d'erreur
   * @param {number} duration - Durée en ms
   */
  const error = (message, duration = 6000) => {
    return showToast({ message, type: 'error', duration })
  }

  /**
   * Affiche un toast d'avertissement
   * @param {string} message - Message d'avertissement
   * @param {number} duration - Durée en ms
   */
  const warning = (message, duration = 5000) => {
    return showToast({ message, type: 'warning', duration })
  }

  /**
   * Affiche un toast d'information
   * @param {string} message - Message d'information
   * @param {number} duration - Durée en ms
   */
  const info = (message, duration = 5000) => {
    return showToast({ message, type: 'info', duration })
  }

  /**
   * Retire tous les toasts
   */
  const clearAll = () => {
    toasts.value = []
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  }
}
