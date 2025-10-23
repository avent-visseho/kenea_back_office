//src/composables/ordannance/useOrdonnanceProgressions.js

// src/composables/ordannance/useOrdonnanceProgressions.js

import { ref } from 'vue'
import { OrdonnanceProgressionServices } from '@/api/services/ordonnanceProgression'

const progressionsList = ref([])
const ordonnancesList = ref([]) // ✅ Ajout pour les ordonnances
const currentProgression = ref(null)
const isLoading = ref(false)
const error = ref(null)

export function useOrdonnanceProgressions() {
  const fetchAllProgressions = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.getAllProgressions(deleted)

      if (Array.isArray(response.data)) {
        progressionsList.value = response.data
        return { success: true, data: progressionsList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        progressionsList.value = response.data.body
        return { success: true, data: progressionsList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des progressions' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des progressions'
      console.error('❌ Erreur fetchAllProgressions:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ NOUVELLE FONCTION: Récupérer les ordonnances par pharmacie
  const fetchOrdonnancesByPharmacie = async (pharmacieId, params = {}) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('🔍 Chargement des ordonnances pour la pharmacie:', pharmacieId)

      const response = await OrdonnanceProgressionServices.getOrdonnancesByPharmacie(
        pharmacieId,
        params,
      )

      console.log('📦 Réponse API:', response.data)

      // Gérer le format de réponse avec status: "SUCCESS"
      if (response.data.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        ordonnancesList.value = response.data.body
        console.log('✅ Ordonnances chargées:', ordonnancesList.value.length)
        return { success: true, data: ordonnancesList.value }
      }

      // Format alternatif
      if (Array.isArray(response.data)) {
        ordonnancesList.value = response.data
        return { success: true, data: ordonnancesList.value }
      }

      return { success: false, error: 'Format de réponse invalide' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des ordonnances'
      console.error('❌ Erreur fetchOrdonnancesByPharmacie:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchProgressionById = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.getProgressionById(id)
      currentProgression.value = response.data.body || response.data
      return { success: true, data: currentProgression.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement de la progression'
      console.error('❌ Erreur fetchProgressionById:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchProgressionsByPharmacie = async (pharmacieId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.getProgressionsByPharmacie(pharmacieId)

      if (Array.isArray(response.data)) {
        progressionsList.value = response.data
      } else if (response.data.body && Array.isArray(response.data.body)) {
        progressionsList.value = response.data.body
      }

      return { success: true, data: progressionsList.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement'
      console.error('❌ Erreur fetchProgressionsByPharmacie:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteProgression = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.deleteProgression(id)

      if (
        response.data.status === 'SUCCESS' ||
        response.status === 200 ||
        response.status === 204
      ) {
        progressionsList.value = progressionsList.value.filter((p) => p.id !== id)
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      console.error('❌ Erreur deleteProgression:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const restoreProgression = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.restoreProgression(id)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const index = progressionsList.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          progressionsList.value[index].deleted = false
        }
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la restauration' }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || 'Erreur lors de la restauration'
      error.value = errorMsg
      console.error('❌ Erreur restoreProgression:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateProgressionStatus = async (id, statut) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.updateProgressionStatus(id, statut)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const index = progressionsList.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          progressionsList.value[index].statut = statut
          progressionsList.value[index].updateAt = new Date().toISOString()
        }
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la mise à jour' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour'
      error.value = errorMsg
      console.error('❌ Erreur updateProgressionStatus:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const traiterProgression = async (ordonnanceId, items, userId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await OrdonnanceProgressionServices.traiterProgression(
        ordonnanceId,
        items,
        userId,
      )

      if (
        response.data.status === 'SUCCESS' ||
        response.status === 200 ||
        response.status === 201
      ) {
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: response.data.message || 'Erreur lors du traitement' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors du traitement'
      error.value = errorMsg
      console.error('❌ Erreur traiterProgression:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    progressionsList,
    ordonnancesList, // ✅ Export de la nouvelle liste
    currentProgression,
    fetchAllProgressions,
    fetchProgressionById,
    fetchProgressionsByPharmacie,
    fetchOrdonnancesByPharmacie, // ✅ Export de la nouvelle fonction
    deleteProgression,
    restoreProgression,
    updateProgressionStatus,
    traiterProgression,
  }
}
