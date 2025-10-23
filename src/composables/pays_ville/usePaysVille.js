// src/composables/pays_ville/usePaysVille.js
import { ref } from 'vue'
import { PaysVilleService } from '../../api/services/pays_ville'

// État partagé entre toutes les instances du composable
const paysList = ref([])
const citiesList = ref([])
const regionsList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function usePaysVille() {
  // ============= PAYS =============
  const fetchPaysList = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getPaysList({ deleted })

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
        if (response.data.body) {
          paysList.value.push(response.data.body)
        } else {
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

  const importPaysCsv = async (file) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await PaysVilleService.importPaysCsv(formData)
      if (response.data.status === 'SUCCESS') {
        await fetchPaysList()
        return { success: true, data: response.data.body }
      }
      return { success: false, error: "Erreur lors de l'import du fichier CSV" }
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur lors de l'import du fichier CSV"
      console.error('Erreur importPaysCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const exportPaysCsv = () => {
    try {
      const headers = ['Nom', 'Code', 'Indicatif']

      const rows = paysList.value.map((pays) => [
        pays.nom || pays.name || '',
        pays.code || '',
        pays.indicatif || '',
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `pays_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('Erreur exportPaysCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  const updatePays = async (id, paysData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updatePays(id, paysData)
      if (response.data.status === 'SUCCESS') {
        const index = paysList.value.findIndex((p) => p.id === id || p.code === id)
        if (index !== -1 && response.data.body) {
          paysList.value[index] = response.data.body
        } else {
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
        paysList.value = paysList.value.filter((p) => p.id !== id && p.code !== id)
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
  const fetchCitiesList = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getCitiesList({ deleted })
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

  const importCitiesCsv = async (file, paysId) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await PaysVilleService.importCitiesCsv(formData, paysId)
      if (response.data.status === 'SUCCESS') {
        await fetchCitiesList()
        return { success: true, data: response.data.body }
      }
      return { success: false, error: "Erreur lors de l'import du fichier CSV" }
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur lors de l'import du fichier CSV"
      console.error('Erreur importCitiesCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const exportCitiesCsv = () => {
    try {
      const headers = ['Nom', 'Pays']

      const rows = citiesList.value.map((ville) => {
        const paysNom =
          paysList.value.find((p) => p.id === (ville.paysId || ville.pays_id))?.nom || '-'
        return [ville.nom || ville.name || '', paysNom]
      })

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `villes_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('Erreur exportCitiesCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  const updateCities = async (id, citiesData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updateCities(id, citiesData)
      if (response.data.status === 'SUCCESS') {
        const index = citiesList.value.findIndex((c) => c.id === id || c.code === id)
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
        citiesList.value = citiesList.value.filter((c) => c.id !== id && c.code !== id)
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

  // ============= REGIONS =============
  const fetchRegionsList = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.getRegionsList({ deleted })
      if (response.data.status === 'SUCCESS') {
        regionsList.value = response.data.body || []
        console.log('regionsList.value', regionsList.value)
        return { success: true, data: regionsList.value }
      }
      return { success: false, error: 'Erreur lors du chargement des régions' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des régions'
      console.error('Erreur fetchRegionsList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ FIX: Utiliser addRegions au lieu de addCities
  const createRegions = async (regionsData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.addRegions(regionsData)
      if (response.data.status === 'SUCCESS') {
        if (response.data.body) {
          regionsList.value.push(response.data.body)
        } else {
          await fetchRegionsList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la création de la région' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création de la région'
      console.error('Erreur createRegions:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const importRegionsCsv = async (file, paysId) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await PaysVilleService.importRegionsCsv(formData, paysId)
      if (response.data.status === 'SUCCESS') {
        await fetchRegionsList()
        return { success: true, data: response.data.body }
      }
      return { success: false, error: "Erreur lors de l'import du fichier CSV" }
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur lors de l'import du fichier CSV"
      console.error('Erreur importRegionsCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const exportRegionsCsv = () => {
    try {
      const headers = ['Nom', 'Pays']

      const rows = regionsList.value.map((region) => {
        const paysNom =
          paysList.value.find((p) => p.id === (region.paysId || region.pays_id))?.nom || '-'
        return [region.nom || region.name || '', paysNom]
      })

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `regions_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('Erreur exportRegionsCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  const updateRegions = async (id, regionsData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.updateRegions(id, regionsData)
      if (response.data.status === 'SUCCESS') {
        const index = regionsList.value.findIndex((p) => p.id === id || p.code === id)
        if (index !== -1 && response.data.body) {
          regionsList.value[index] = response.data.body
        } else {
          await fetchRegionsList()
        }
        return { success: true, data: response.data.body }
      }
      return { success: false, error: 'Erreur lors de la modification de la Region' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification de la Region'
      console.error('Erreur updateRegions:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const deleteRegions = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PaysVilleService.deleteRegions(id)
      if (response.data.status === 'SUCCESS') {
        regionsList.value = regionsList.value.filter((r) => r.id !== id && r.code !== id)
        return { success: true }
      }
      return { success: false, error: 'Erreur lors de la suppression de la région' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression de la région'
      console.error('Erreur deleteRegions:', err)
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
    regionsList,

    // Méthodes Pays
    fetchPaysList,
    createPays,
    importPaysCsv,
    exportPaysCsv,
    updatePays,
    deletePays,

    // Méthodes Villes
    fetchCitiesList,
    createCities,
    importCitiesCsv,
    exportCitiesCsv,
    updateCities,
    deleteCities,

    // Méthodes Régions
    fetchRegionsList,
    createRegions,
    importRegionsCsv,
    exportRegionsCsv,
    updateRegions,
    deleteRegions,
  }
}

// Correction RegionsList.vue - getPaysName
// Ligne 49 : remplacer
// {{ getPaysName(region.name || region.name) }}
// par
// {{ getPaysName(region.paysId || region.pays_id) }}
