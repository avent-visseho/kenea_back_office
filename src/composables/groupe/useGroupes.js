import { ref } from 'vue'
import { GroupesServices } from '@/api/services/groupesService'

const groupesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useGroupes() {
  const fetchAllGroupes = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.getAllGroupes()

      if (Array.isArray(response.data)) {
        groupesList.value = response.data
        return { success: true, data: groupesList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        groupesList.value = response.data.body
        return { success: true, data: groupesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des groupes' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des groupes'
      console.error('❌ Erreur fetchAllGroupes:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createGroupe = async (nom) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.createGroupe(nom)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        const newGroupe = response.data.body || response.data

        if (newGroupe && typeof newGroupe === 'object') {
          groupesList.value.push(newGroupe)
        }

        return { success: true, data: newGroupe }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg
      console.error('❌ Erreur createGroupe:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteGroupe = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.deleteGroupe(id)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        groupesList.value = groupesList.value.filter(g => g.id !== id)
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      console.error('❌ Erreur deleteGroupe:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const getSousGroupesByGroupe = async (groupeId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.getSousGroupesByGroupe(groupeId)

      if (Array.isArray(response.data)) {
        return { success: true, data: response.data }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        return { success: true, data: response.data.body }
      }

      return { success: false, error: 'Erreur lors du chargement des sous-groupes' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des sous-groupes'
      console.error('❌ Erreur getSousGroupesByGroupe:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createSousGroupe = async (groupeId, nom) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.createSousGroupe(groupeId, nom)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg
      console.error('❌ Erreur createSousGroupe:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteSousGroupe = async (sousGroupeId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await GroupesServices.deleteSousGroupe(sousGroupeId)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      console.error('❌ Erreur deleteSousGroupe:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    groupesList,
    fetchAllGroupes,
    createGroupe,
    deleteGroupe,
    getSousGroupesByGroupe,
    createSousGroupe,
    deleteSousGroupe
  }
}