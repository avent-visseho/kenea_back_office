// src/composables/pharmacie/usePharmacies.js
import { ref } from 'vue'
import { PharmaciesService } from '../../api/services/pharmacie'

// État partagé entre toutes les instances du composable
const pharmaciesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function usePharmaciesVille() {
  // ============= PHARMACIES =============
  const fetchPharmaciesList = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PharmaciesService.getPharmaciesList()
      console.log(response, 'pharmacies')

      if (response.data.status === 'SUCCESS') {
        pharmaciesList.value = response.data.body || []
        return { success: true, data: pharmaciesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des pharmacies' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des pharmacies'
      console.error('Erreur fetchpharmaciesList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createPharmacies = async (pharmaciesData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PharmaciesService.addPharmacies(pharmaciesData)
      if (response.data.status === 'SUCCESS') {
        // Ajouter directement le nouveau pharmacies à la liste
        if (response.data.body) {
          pharmaciesList.value.push(response.data.body)
        } else {
          // Fallback: recharger si le body n'est pas disponible
          await fetchPharmaciesList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la création du pharmacies' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création du pharmacies'
      console.error('Erreur createpharmacies:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updatePharmacies = async (id, pharmaciesData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PharmaciesService.updatePharmacies(id, pharmaciesData)
      if (response.data.status === 'SUCCESS') {
        // Mettre à jour directement dans la liste
        const index = pharmaciesList.value.findIndex(p => p.id === id || p.code === id)
        if (index !== -1 && response.data.body) {
          pharmaciesList.value[index] = response.data.body
        } else {
          // Fallback: recharger si pas trouvé
          await fetchPharmaciesList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la modification du pharmacies' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification du pharmacies'
      console.error('Erreur updatepharmacies:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deletePharmacies = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PharmaciesService.deletePharmacies(id)
      if (response.data.status === 'SUCCESS') {
        // Supprimer directement de la liste
        pharmaciesList.value = pharmaciesList.value.filter(p => p.id !== id && p.code !== id)
        return { success: true }
      }
      return { success: false, error: 'Erreur lors de la suppression du pharmacies' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression du pharmacies'
      console.error('Erreur deletepharmacies:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // État partagé
    isLoading,
    error,
    pharmaciesList,

    // Méthodes Pharmacies
    fetchPharmaciesList,
    createPharmacies,
    updatePharmacies,
    deletePharmacies,

    
  }
}