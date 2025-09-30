// src/composables/pays_ville/usePaysVille.js
import { ref } from 'vue'
import { PaysVilleService } from '../../api/services/pays_ville'

export function usePaysVille() {
  const isLoading = ref(false)
  const error = ref(null)

  // ============= PAYS =============
  const paysList = ref([])

  const fetchPaysList = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getPaysList()
      if (response.data.success) {
        paysList.value = response.data.data || response.data.pays || []
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
      if (response.data.success) {
        await fetchPaysList()
        return { success: true, data: response.data.data }
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

  const updatePays = async (code, paysData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updatePays(code, paysData)
      if (response.data.success) {
        await fetchPaysList()
        return { success: true, data: response.data.data }
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

  const deletePays = async (code) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.deletePays(code)
      if (response.data.success) {
        await fetchPaysList()
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

  // ============= CITIES =============
  const citiesList = ref([])

  const fetchCitiesList = async () => {
    isLoading.value = true
    error.value = null

    try {
      // ✅ CORRECTION: CitiesVilleService n'existe pas, utilisation de PaysVilleService
      const response = await PaysVilleService.getCitiesList()
      if (response.data.success) {
        citiesList.value = response.data.data || response.data.cities || []
        return { success: true, data: citiesList.value }
      }
      // ✅ CORRECTION: Message d'erreur cohérent (villes au lieu de cities)
      return { success: false, error: 'Erreur lors du chargement des villes' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des villes'
      // ✅ CORRECTION: Nom de la fonction dans le log
      console.error('Erreur fetchCitiesList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ CORRECTION: Paramètre paysData renommé en citiesData
  const createCities = async (citiesData) => {
    isLoading.value = true
    error.value = null

    try {
      // ✅ CORRECTION: Utilisation de citiesData au lieu de paysData
      const response = await PaysVilleService.addCities(citiesData)
      if (response.data.success) {
        await fetchCitiesList()
        return { success: true, data: response.data.data }
      }
      // ✅ CORRECTION: Message d'erreur cohérent (ville au lieu de cities)
      return { success: false, error: 'Erreur lors de la création de la ville' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création de la ville'
      console.error('Erreur createCities:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateCities = async (code, citiesData) => {
    isLoading.value = true
    error.value = null

    try {
      // ✅ CORRECTION: CitiesVilleService n'existe pas, utilisation de PaysVilleService
      const response = await PaysVilleService.updateCities(code, citiesData)
      if (response.data.success) {
        await fetchCitiesList()
        return { success: true, data: response.data.data }
      }
      // ✅ CORRECTION: Message d'erreur cohérent (ville au lieu de cities)
      return { success: false, error: 'Erreur lors de la modification de la ville' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification de la ville'
      console.error('Erreur updateCities:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteCities = async (code) => {
    isLoading.value = true
    error.value = null

    try {
      // ✅ CORRECTION: CitiesVilleService n'existe pas, utilisation de PaysVilleService
      const response = await PaysVilleService.deleteCities(code)
      if (response.data.success) {
        await fetchCitiesList()
        return { success: true }
      }
      // ✅ CORRECTION: Message d'erreur cohérent (ville au lieu de Cities)
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
    // État
    isLoading,
    error,
    paysList,
    citiesList,

    // Méthodes Pays
    fetchPaysList,
    createPays,
    updatePays,
    deletePays,

    // Méthodes Cities
    fetchCitiesList,
    createCities,
    updateCities,
    deleteCities,
  }
}