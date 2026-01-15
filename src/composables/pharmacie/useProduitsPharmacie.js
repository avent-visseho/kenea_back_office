// src/composables/pharmacie/useProduitsPharmacie.js
import { ref } from 'vue'
import { ProduitPharmacieServices } from '@/api/services/produitPharmacie'
import { useAuthStore } from '@/store/auth/auth'

export function useProduitsPharmacie() {
  const authStore = useAuthStore()

  // État
  const produitsPharmacie = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Récupère les produits d'une pharmacie (export)
   * @param {string} pharmacieId - ID de la pharmacie (optionnel, utilise l'ID de l'utilisateur connecté par défaut)
   */
  const fetchProduitsPharmacie = async (pharmacieId = null) => {
    loading.value = true
    error.value = null

    try {
      // Utiliser l'ID de la pharmacie de l'utilisateur connecté si non fourni
      let targetPharmacieId = pharmacieId

      if (!targetPharmacieId) {
        // Récupérer l'ID de la pharmacie depuis assignments.PHARMACIE[0]
        const pharmacieAssignments = authStore.user?.assignments?.PHARMACIE

        if (pharmacieAssignments && pharmacieAssignments.length > 0) {
          targetPharmacieId = pharmacieAssignments[0]
        }
      }

      if (!targetPharmacieId) {
        console.error('❌ Structure user:', authStore.user)
        throw new Error('ID de pharmacie non trouvé')
      }

      console.log('📤 Récupération des produits de la pharmacie:', targetPharmacieId)

      const response = await ProduitPharmacieServices.exportProduitsPharmacie(targetPharmacieId)

      console.log('📥 Réponse serveur:', response.data)

      if (response.data?.status === 'SUCCESS') {
        produitsPharmacie.value = response.data.body || []
        return { success: true, data: produitsPharmacie.value }
      }

      // Certains endpoints retournent directement les données
      if (Array.isArray(response.data)) {
        produitsPharmacie.value = response.data
        return { success: true, data: produitsPharmacie.value }
      }

      return { success: false, error: 'Format de réponse invalide' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la récupération des produits'
      error.value = errorMessage
      console.error('❌ Erreur fetchProduitsPharmacie:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Crée un produit pharmacie
   * @param {Object} produitData - { dto: {...}, image: "base64" }
   */
  const createProduitPharmacie = async (produitData) => {
    loading.value = true
    error.value = null

    try {
      console.log('📤 Création produit pharmacie:', produitData)

      const response = await ProduitPharmacieServices.createProduitPharmacie(produitData)

      console.log('✅ Réponse création:', response.data)

      if (response.data?.status === 'SUCCESS') {
        const newProduit = response.data.body

        if (newProduit) {
          produitsPharmacie.value.push(newProduit)
        }

        return { success: true, data: newProduit }
      }

      return { success: false, error: response.data?.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la création du produit'
      error.value = errorMessage
      console.error('❌ Erreur createProduitPharmacie:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Met à jour un produit pharmacie
   * @param {string} id - ID du produit pharmacie
   * @param {Object} produitData - { dto: {...}, image: "base64" }
   */
  const updateProduitPharmacie = async (id, produitData) => {
    loading.value = true
    error.value = null

    try {
      console.log('📤 Mise à jour produit pharmacie:', id, produitData)

      const response = await ProduitPharmacieServices.updateProduitPharmacie(id, produitData)

      console.log('✅ Réponse mise à jour:', response.data)

      if (response.data?.status === 'SUCCESS') {
        const updatedProduit = response.data.body

        // Mettre à jour dans la liste
        const index = produitsPharmacie.value.findIndex(p => p.id === id)
        if (index !== -1 && updatedProduit) {
          produitsPharmacie.value[index] = updatedProduit
        }

        return { success: true, data: updatedProduit }
      }

      return { success: false, error: response.data?.message || 'Erreur lors de la mise à jour' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour du produit'
      error.value = errorMessage
      console.error('❌ Erreur updateProduitPharmacie:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Supprime un produit pharmacie
   * @param {string} id - ID du produit pharmacie
   */
  const deleteProduitPharmacie = async (id) => {
    loading.value = true
    error.value = null

    try {
      console.log('📤 Suppression produit pharmacie:', id)

      const response = await ProduitPharmacieServices.deleteProduitPharmacie(id)

      console.log('✅ Réponse suppression:', response)

      if (response.status === 200 || response.status === 204 || response.data?.status === 'SUCCESS') {
        // Retirer de la liste
        produitsPharmacie.value = produitsPharmacie.value.filter(p => p.id !== id)
        return { success: true }
      }

      return { success: false, error: 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la suppression du produit'
      error.value = errorMessage
      console.error('❌ Erreur deleteProduitPharmacie:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Import de produits par fichier
   * @param {string} pharmacieId - ID de la pharmacie
   * @param {File} file - Fichier à importer
   * @param {Array<File>} images - Images des produits
   */
  const importProduitsFile = async (pharmacieId, file, images = []) => {
    loading.value = true
    error.value = null

    try {
      console.log('📤 Import de produits:', { pharmacieId, file: file.name, imagesCount: images.length })

      const response = await ProduitPharmacieServices.importProduitsFile(pharmacieId, file, images)

      console.log('✅ Réponse import:', response.data)

      if (response.data?.status === 'SUCCESS') {
        // Recharger la liste des produits
        await fetchProduitsPharmacie(pharmacieId)
        return { success: true, data: response.data.body }
      }

      return { success: false, error: response.data?.message || 'Erreur lors de l\'import' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de l\'import du fichier'
      error.value = errorMessage
      console.error('❌ Erreur importProduitsFile:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Mise à jour par import de fichier
   * @param {string} id - ID du produit pharmacie
   * @param {File} file - Fichier à importer
   * @param {Array<File>} images - Images des produits
   */
  const importUpdateProduit = async (id, file, images = []) => {
    loading.value = true
    error.value = null

    try {
      console.log('📤 Mise à jour par import:', { id, file: file.name, imagesCount: images.length })

      const response = await ProduitPharmacieServices.importUpdateProduit(id, file, images)

      console.log('✅ Réponse mise à jour import:', response.data)

      if (response.data?.status === 'SUCCESS') {
        const updatedProduit = response.data.body

        // Mettre à jour dans la liste
        const index = produitsPharmacie.value.findIndex(p => p.id === id)
        if (index !== -1 && updatedProduit) {
          produitsPharmacie.value[index] = updatedProduit
        }

        return { success: true, data: updatedProduit }
      }

      return { success: false, error: response.data?.message || 'Erreur lors de la mise à jour' }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la mise à jour par import'
      error.value = errorMessage
      console.error('❌ Erreur importUpdateProduit:', err)
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Réinitialise les erreurs
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // État
    produitsPharmacie,
    loading,
    error,

    // Méthodes
    fetchProduitsPharmacie,
    createProduitPharmacie,
    updateProduitPharmacie,
    deleteProduitPharmacie,
    importProduitsFile,
    importUpdateProduit,
    clearError
  }
}
