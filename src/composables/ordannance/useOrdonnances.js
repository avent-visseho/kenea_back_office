// src/composables/useOrdonnances.js
import { ref } from 'vue'
import { OrdonnanceServices } from '@/api/services/ordonnance'

const ordonnancesList = ref([])
const currentOrdonnance = ref(null)
const isLoading = ref(false)
const error = ref(null)

export function useOrdonnances() {
  const fetchAllOrdonnances = async () => { //deleted = false
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.getAllOrdonnances() //{ deleted }

      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
        return { success: true, data: ordonnancesList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
        return { success: true, data: ordonnancesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des ordonnances' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des ordonnances'
      console.error('❌ Erreur fetchAllOrdonnances:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrdonnanceById = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.getOrdonnanceById(id)
      currentOrdonnance.value = response.data.body || response.data
      return { success: true, data: currentOrdonnance.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement de l\'ordonnance'
      console.error('❌ Erreur fetchOrdonnanceById:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrdonnancesByUtilisateur = async (utilisateurId, statut = null) => {
    isLoading.value = true
    error.value = null

    try {
      const params = statut ? { statut } : {}
      const response = await OrdonnanceServices.getOrdonnancesByUtilisateur(utilisateurId, params)

      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
      } else if (response.data.body && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
      }

      return { success: true, data: ordonnancesList.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchOrdonnancesByUtilisateur:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllOrdonnancesByUtilisateur = async (utilisateurId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.getAllOrdonnancesByUtilisateur(utilisateurId)

      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
      } else if (response.data.body && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
      }

      return { success: true, data: ordonnancesList.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchAllOrdonnancesByUtilisateur:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrdonnancesByPharmacie = async (pharmacieId, statut = null) => {
    isLoading.value = true
    error.value = null

    try {
      const params = statut ? { statut } : {}
      const response = await OrdonnanceServices.getOrdonnancesByPharmacie(pharmacieId, params)

      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
      } else if (response.data.body && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
      }

      return { success: true, data: ordonnancesList.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchOrdonnancesByPharmacie:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllOrdonnancesByPharmacie = async (pharmacieId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.getAllOrdonnancesByPharmacie(pharmacieId)

      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
      } else if (response.data.body && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
      }

      return { success: true, data: ordonnancesList.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchAllOrdonnancesByPharmacie:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const uploadOrdonnance = async (pharmacieIds, file) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.uploadOrdonnance(pharmacieIds, file)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        const newOrdonnance = response.data.body || response.data

        if (newOrdonnance && typeof newOrdonnance === 'object') {
          // Si c'est un tableau (plusieurs ordonnances créées)
          if (Array.isArray(newOrdonnance)) {
            ordonnancesList.value.unshift(...newOrdonnance)
          } else {
            ordonnancesList.value.unshift(newOrdonnance)
          }
        }

        return { success: true, data: newOrdonnance }
      }

      return { success: false, error: response.data.message || 'Erreur lors de l\'upload' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de l\'upload'
      error.value = errorMsg
      console.error('❌ Erreur uploadOrdonnance:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const fetchOrdonnancesByEtat = async (etat) => {
  isLoading.value = true
  error.value = null

  try {
    const response = await OrdonnanceServices.getByEtat(etat)

    if (Array.isArray(response.data)) {
      ordonnancesList.value = response.data
    } else if (response.data.body && Array.isArray(response.data.body)) {
      ordonnancesList.value = response.data.body
    }

    return { success: true, data: ordonnancesList.value }
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors du chargement des ordonnances'
    console.error('❌ Erreur fetchOrdonnancesByEtat:', err)
    return { success: false, error: error.value }
  } finally {
    isLoading.value = false
  }
}

  const deleteOrdonnance = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.deleteOrdonnance(id)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        ordonnancesList.value = ordonnancesList.value.filter(o => o.id !== id)
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      console.error('❌ Erreur deleteOrdonnance:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateStatus = async (id, etat) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceServices.updateOrdonnanceStatus(id, etat)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const index = ordonnancesList.value.findIndex(o => o.id === id)
        if (index !== -1) {
          ordonnancesList.value[index].etat = etat
          ordonnancesList.value[index].updateAt = new Date().toISOString()
        }

        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la mise à jour' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour'
      error.value = errorMsg
      console.error('❌ Erreur updateStatus:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    ordonnancesList,
    currentOrdonnance,
    fetchAllOrdonnances,
    fetchOrdonnanceById,
    fetchOrdonnancesByUtilisateur,
    fetchAllOrdonnancesByUtilisateur,
    fetchOrdonnancesByPharmacie,
    fetchAllOrdonnancesByPharmacie,
    fetchOrdonnancesByEtat,
    uploadOrdonnance,
    deleteOrdonnance,
    updateStatus
  }
}