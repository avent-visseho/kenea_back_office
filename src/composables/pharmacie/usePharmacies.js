// src/composables/pharmacie/usePharmacies.js
import { ref } from 'vue'
import { PharmaciesService } from '../../api/services/pharmacie'

const pharmaciesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function usePharmaciesVille() {
  const fetchPharmaciesList = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PharmaciesService.getPharmaciesList({ deleted })

      if (Array.isArray(response.data)) {
        pharmaciesList.value = response.data
        return { success: true, data: pharmaciesList.value }
      }

      // Si les données sont dans response.data.body
      if (response.data.body && Array.isArray(response.data.body)) {
        pharmaciesList.value = response.data.body
        return { success: true, data: pharmaciesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des pharmacies' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des pharmacies'
      console.error('❌ Erreur fetchPharmaciesList:', err)
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

      // ✅ Gérer différents formats de réponse
      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        const newPharmacie = response.data.body || response.data
        
        if (newPharmacie && typeof newPharmacie === 'object') {
          pharmaciesList.value.push(newPharmacie)
        } else {
          await fetchPharmaciesList()
        }
        
        return { success: true, data: newPharmacie }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg
      
      console.error('❌ Erreur createPharmacies:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updatePharmacies = async (id, pharmaciesData) => {
    isLoading.value = true
    error.value = null

    try {
      
      const response = await PharmaciesService.updatePharmacies(id, pharmaciesData)
      

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const updatedPharmacie = response.data.body || response.data
        
        const index = pharmaciesList.value.findIndex(p => 
          p.id === id || p.uuid === id || p.code === id
        )
        
        if (index !== -1 && updatedPharmacie && typeof updatedPharmacie === 'object') {
          pharmaciesList.value[index] = updatedPharmacie
        } else {
          await fetchPharmaciesList()
        }
        
        return { success: true, data: updatedPharmacie }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la modification'
      error.value = errorMsg
      
      console.error('❌ Erreur updatePharmacies:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      })
      
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deletePharmacies = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      
      const response = await PharmaciesService.deletePharmacies(id)
      

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        pharmaciesList.value = pharmaciesList.value.filter(p => 
          p.id !== id && p.uuid !== id && p.code !== id
        )
        return { success: true }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      
      console.error('❌ Erreur deletePharmacies:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ NOUVEAU: Import CSV avec ville_id
  const importPharmaciesCsv = async (file, villeId) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await PharmaciesService.importPharmaciesCsv(formData, villeId)
      
      if (response.data.status === 'SUCCESS' || response.status === 200) {
        await fetchPharmaciesList()
        return { success: true, data: response.data.body }
      }
      
      return { success: false, error: 'Erreur lors de l\'import du fichier CSV' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de l\'import du fichier CSV'
      console.error('❌ Erreur importPharmaciesCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // ✅ NOUVEAU: Export CSV
  const exportPharmaciesCsv = () => {
    try {
      const headers = ['Nom', 'Ville', 'Téléphone', 'Statut']
      
      const rows = pharmaciesList.value.map(pharmacie => [
        pharmacie.nom || pharmacie.name || '',
        pharmacie.ville_nom || '',
        pharmacie.telephone || pharmacie.phone || '',
        pharmacie.active ? 'Actif' : 'Inactif'
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `pharmacies_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportPharmaciesCsv:', err)
      return { success: false, error: 'Erreur lors de l\'export CSV' }
    }
  }

  return {
    isLoading,
    error,
    pharmaciesList,
    fetchPharmaciesList,
    createPharmacies,
    updatePharmacies,
    deletePharmacies,
    importPharmaciesCsv,  // ✅ NOUVEAU
    exportPharmaciesCsv,  // ✅ NOUVEAU
  }
}