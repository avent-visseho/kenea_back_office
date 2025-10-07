// src/composables/pharmacie/useCategories.js
import { ref } from 'vue'
import { ProduitsCategorieServices } from '@/api/services/categorie'

const categoriesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useProduitsCategorie() {
  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProduitsCategorieServices.getCategories()
      console.log('✅ Catégories récupérées:', response.data)

      if (Array.isArray(response.data)) {
        categoriesList.value = response.data
        return { success: true, data: categoriesList.value }
      }

      // Si les données sont dans response.data.body
      if (response.data.body && Array.isArray(response.data.body)) {
        categoriesList.value = response.data.body
        return { success: true, data: categoriesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des catégories' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des catégories'
      console.error('❌ Erreur fetchCategories:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createCategorie = async (categorieData) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Création catégorie avec données:', categorieData)
      
      const response = await ProduitsCategorieServices.addCategorie(categorieData)
      
      console.log('✅ Réponse création:', response.data)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        const newCategorie = response.data.body || response.data
        
        if (newCategorie && typeof newCategorie === 'object') {
          categoriesList.value.push(newCategorie)
        } else {
          await fetchCategories()
        }
        
        return { success: true, data: newCategorie }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg
      
      console.error('❌ Erreur createCategorie:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateCategorie = async (id, categorieData) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Mise à jour catégorie:', id, categorieData)
      
      const response = await ProduitsCategorieServices.updateCategorie(id, categorieData)
      
      console.log('✅ Réponse mise à jour:', response.data)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const updatedCategorie = response.data.body || response.data
        
        const index = categoriesList.value.findIndex(c => 
          c.id === id || c.uuid === id || c.code === id
        )
        
        if (index !== -1 && updatedCategorie && typeof updatedCategorie === 'object') {
          categoriesList.value[index] = updatedCategorie
        } else {
          await fetchCategories()
        }
        
        return { success: true, data: updatedCategorie }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la modification'
      error.value = errorMsg
      
      console.error('❌ Erreur updateCategorie:', {
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

  const deleteCategorie = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Suppression catégorie:', id)
      
      const response = await ProduitsCategorieServices.deleteCategorie(id)
      
      console.log('✅ Réponse suppression:', response.data)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        categoriesList.value = categoriesList.value.filter(c => 
          c.id !== id && c.uuid !== id && c.code !== id
        )
        return { success: true }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      
      console.error('❌ Erreur deleteCategorie:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const importCategoriesCsv = async (file) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('📤 Upload catégories CSV:', file.name)

      const response = await ProduitsCategorieServices.importCategoriesCsv(formData)
      
      if (response.data.status === 'SUCCESS' || response.status === 200) {
        await fetchCategories()
        return { success: true, data: response.data.body }
      }
      
      return { success: false, error: 'Erreur lors de l\'import du fichier CSV' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de l\'import du fichier CSV'
      console.error('❌ Erreur importCategoriesCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const exportCategoriesCsv = () => {
    try {
      const headers = ['Nom', 'Description', 'Date de création']
      
      const rows = categoriesList.value.map(categorie => [
        categorie.nom || categorie.name || '',
        categorie.description || '',
        new Date(categorie.createdAt || categorie.created_at || Date.now()).toLocaleDateString('fr-FR')
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `categories_produits_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportCategoriesCsv:', err)
      return { success: false, error: 'Erreur lors de l\'export CSV' }
    }
  }

  return {
    isLoading,
    error,
    categoriesList,
    fetchCategories,
    createCategorie,
    updateCategorie,
    deleteCategorie,
    importCategoriesCsv,
    exportCategoriesCsv,
  }
}