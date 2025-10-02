// src/composables/pays_ville/usePaysVille.js
import { ref } from 'vue'
import { PaysVilleService } from '../../api/services/pays_ville'

// État partagé entre toutes les instances du composable
const paysList = ref([])
const citiesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function usePaysVille() {
  // ============= PAYS =============
  const fetchPaysList = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getPaysList()
      console.log(response, 'pays')

      if (response.data.status === 'SUCCESS') {
        paysList.value = response.data.body || []
        return { success: true, data: paysList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des pays' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des pays'
      console.error('Erreur fetchPaysList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createPays = async (paysData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.addPays(paysData)
      if (response.data.status === 'SUCCESS') {
        // Ajouter directement le nouveau pays à la liste
        if (response.data.body) {
          paysList.value.push(response.data.body)
        } else {
          // Fallback: recharger si le body n'est pas disponible
          await fetchPaysList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la création du pays' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création du pays'
      console.error('Erreur createPays:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updatePays = async (id, paysData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updatePays(id, paysData)
      if (response.data.status === 'SUCCESS') {
        // Mettre à jour directement dans la liste
        const index = paysList.value.findIndex(p => p.id === id || p.code === id)
        if (index !== -1 && response.data.body) {
          paysList.value[index] = response.data.body
        } else {
          // Fallback: recharger si pas trouvé
          await fetchPaysList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la modification du pays' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification du pays'
      console.error('Erreur updatePays:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deletePays = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.deletePays(id)
      if (response.data.status === 'SUCCESS') {
        // Supprimer directement de la liste
        paysList.value = paysList.value.filter(p => p.id !== id && p.code !== id)
        return { success: true }
      }
      return { success: false, error: 'Erreur lors de la suppression du pays' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression du pays'
      console.error('Erreur deletePays:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ============= VILLES =============
  const fetchCitiesList = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getCitiesList()
      if (response.data.status === 'SUCCESS') {
        citiesList.value = response.data.body || []
        return { success: true, data: citiesList.value }
      }
      return { success: false, error: 'Erreur lors du chargement des villes' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des villes'
      console.error('Erreur fetchCitiesList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createCities = async (citiesData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.addCities(citiesData)
      if (response.data.status === 'SUCCESS') {
        // Ajouter directement la nouvelle ville à la liste
        if (response.data.body) {
          citiesList.value.push(response.data.body)
        } else {
          await fetchCitiesList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la création de la ville' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création de la ville'
      console.error('Erreur createCities:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateCities = async (id, citiesData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updateCities(id, citiesData)
      if (response.data.status === 'SUCCESS') {
        // Mettre à jour directement dans la liste
        const index = citiesList.value.findIndex(c => c.id === id || c.code === id)
        if (index !== -1 && response.data.body) {
          citiesList.value[index] = response.data.body
        } else {
          await fetchCitiesList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la modification de la ville' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification de la ville'
      console.error('Erreur updateCities:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteCities = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.deleteCities(id)
      if (response.data.status === 'SUCCESS') {
        // Supprimer directement de la liste
        citiesList.value = citiesList.value.filter(c => c.id !== id && c.code !== id)
        return { success: true }
      }
      return { success: false, error: 'Erreur lors de la suppression de la ville' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression de la ville'
      console.error('Erreur deleteCities:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // État partagé
    isLoading,
    error,
    paysList,
    citiesList,

    // Méthodes Pays
    fetchPaysList,
    createPays,
    updatePays,
    deletePays,

    // Méthodes Villes
    fetchCitiesList,
    createCities,
    updateCities,
    deleteCities,
  }
}