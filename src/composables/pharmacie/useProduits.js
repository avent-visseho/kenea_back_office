// src/composables/pharmacie/useProduits.js
import { ref } from 'vue'
import { ProduitService } from '../../api/services/produit'

// État partagé
const produitsList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useProduits() {
  // ============= PRODUITS =============
  
  const fetchProduitsList = async (deleted = false) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProduitService.getProduitsList({ deleted })
      console.log('✅ Produits récupérés:', response.data)

      if (response.data.status === 'SUCCESS') {
        produitsList.value = response.data.body || []
        return { success: true, data: produitsList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des produits' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des produits'
      console.error('❌ Erreur fetchProduitsList:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createProduit = async (produitData) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Création produit:', produitData)
      
      const response = await ProduitService.addProduit(produitData)
      console.log('✅ Réponse création:', response.data)

      if (response.data.status === 'SUCCESS') {
        const newProduit = response.data.body
        
        if (newProduit) {
          produitsList.value.push(newProduit)
        } else {
          await fetchProduitsList()
        }
        
        return { success: true, data: newProduit }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erreur lors de la création du produit'
      error.value = errorMsg
      console.error('❌ Erreur createProduit:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateProduit = async (id, produitData) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Mise à jour produit:', id, produitData)
      
      const response = await ProduitService.updateProduit(id, produitData)
      console.log('✅ Réponse mise à jour:', response.data)

      if (response.data.status === 'SUCCESS') {
        const updatedProduit = response.data.body
        
        const index = produitsList.value.findIndex(p => p.id === id)
        
        if (index !== -1 && updatedProduit) {
          produitsList.value[index] = updatedProduit
        } else {
          await fetchProduitsList()
        }
        
        return { success: true, data: updatedProduit }
      }
      
      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erreur lors de la modification'
      error.value = errorMsg
      console.error('❌ Erreur updateProduit:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduit = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      console.log('📤 Suppression produit:', id)
      
      const response = await ProduitService.deleteProduit(id)
      console.log('✅ Réponse suppression:', response.data)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 204) {
        produitsList.value = produitsList.value.filter(p => p.id !== id)
        return { success: true }
      }
      
      return { success: false, error: 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erreur lors de la suppression'
      error.value = errorMsg
      console.error('❌ Erreur deleteProduit:', err)
      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const searchProduits = async (params) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProduitService.searchProduits(params)
      
      if (response.data.status === 'SUCCESS') {
        return { success: true, data: response.data.body || [] }
      }
      
      return { success: false, error: 'Aucun produit trouvé' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la recherche'
      console.error('❌ Erreur searchProduits:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const suggestProduits = async (params) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await ProduitService.suggestProduits(params)
      
      if (response.data.status === 'SUCCESS') {
        return { success: true, data: response.data.body || [] }
      }
      
      return { success: false, error: 'Aucune suggestion trouvée' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suggestion'
      console.error('❌ Erreur suggestProduits:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const importProduitsCsv = async (file, pharmacieId, categorieId) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('📤 Upload produits CSV:', { pharmacieId, categorieId })

      const response = await ProduitService.importProduitsCsv(formData, pharmacieId, categorieId)
      
      if (response.data.status === 'SUCCESS') {
        await fetchProduitsList()
        return { success: true, data: response.data.body }
      }
      
      return { success: false, error: 'Erreur lors de l\'import du fichier CSV' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de l\'import du fichier CSV'
      console.error('❌ Erreur importProduitsCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const exportProduitsCsv = () => {
    try {
      const headers = ['Nom', 'Code', 'Description', 'Prix', 'Code Barre', 'Pharmacie', 'Catégorie']
      
      const rows = produitsList.value.map(produit => [
        produit.nom || '',
        produit.code || '',
        produit.description || '',
        produit.prix || '',
        produit.codeBarre || '',
        produit.pharmacieName || '',
        produit.categorieName || ''
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `produits_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportProduitsCsv:', err)
      return { success: false, error: 'Erreur lors de l\'export CSV' }
    }
  }

  return {
    isLoading,
    error,
    produitsList,
    fetchProduitsList,
    createProduit,
    updateProduit,
    deleteProduit,
    searchProduits,
    suggestProduits,
    importProduitsCsv,
    exportProduitsCsv,
  }
}