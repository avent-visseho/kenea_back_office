import { ref, computed } from 'vue'
import { InboxServices } from '@/api/services/inboxService'

const inboxList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useInbox() {
  const fetchInboxAll = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await InboxServices.getInboxAll(deleted)

      if (Array.isArray(response.data)) {
        inboxList.value = response.data
        return { success: true, data: inboxList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        inboxList.value = response.data.body
        return { success: true, data: inboxList.value }
      }

      return { success: false, error: 'Erreur lors du chargement' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchInboxAll:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ NOUVEAU : Récupère les ordonnances avec détails pour un client
  const fetchInboxByClientWithDetails = async (clientId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await InboxServices.getInboxByClientWithDetails(clientId)

      if (Array.isArray(response.data)) {
        inboxList.value = response.data
        return { success: true, data: inboxList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        inboxList.value = response.data.body
        return { success: true, data: inboxList.value }
      }

      return { success: false, error: 'Erreur lors du chargement' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchInboxByClientWithDetails:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchInboxByPharmacie = async (pharmacieId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await InboxServices.getInboxByPharmacie(pharmacieId)

      if (Array.isArray(response.data)) {
        inboxList.value = response.data
        return { success: true, data: inboxList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        inboxList.value = response.data.body
        return { success: true, data: inboxList.value }
      }

      return { success: false, error: 'Erreur lors du chargement' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchInboxByPharmacie:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchInboxByClient = async (clientId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await InboxServices.getInboxByClient(clientId)

      if (Array.isArray(response.data)) {
        inboxList.value = response.data
        return { success: true, data: inboxList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        inboxList.value = response.data.body
        return { success: true, data: inboxList.value }
      }

      return { success: false, error: 'Erreur lors du chargement' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchInboxByClient:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchInboxGlobal = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await InboxServices.getInboxGlobal()

      if (Array.isArray(response.data)) {
        inboxList.value = response.data
        return { success: true, data: inboxList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        inboxList.value = response.data.body
        return { success: true, data: inboxList.value }
      }

      return { success: false, error: 'Erreur lors du chargement' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchInboxGlobal:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Statistiques calculées
  const stats = computed(() => ({
    total: inboxList.value.length,
    pending: inboxList.value.filter((m) => m.statut === 'PENDING').length,
    resolved: inboxList.value.filter((m) => m.statut !== 'PENDING').length,
    today: inboxList.value.filter((m) => {
      const date = new Date(m.dateEnvoi)
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }).length,
  }))

  return {
    isLoading,
    error,
    inboxList,
    stats,
    fetchInboxAll,
    fetchInboxByPharmacie,
    fetchInboxByClient,
    fetchInboxByClientWithDetails, // ✅ NOUVEAU
    fetchInboxGlobal,
  }
}
