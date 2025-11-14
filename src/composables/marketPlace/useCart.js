// src/composables/marketPlace/useCart.js
import { ref } from 'vue'
import { MarketPlaceService } from '@/api/services/marketPlace'
import { useCartStore } from '@/store/cart/cartStore'

/**
 * Composable pour gérer le panier et les ordonnances
 */
export function useCart() {
  // Store
  const cartStore = useCartStore()

  // État local
  const loading = ref(false)
  const error = ref(null)
  const uploadingOrdonnance = ref(false)
  const submittingOrder = ref(false)

  // Preview de l'ordonnance
  const ordonnancePreview = ref(null)
  const showPreviewModal = ref(false)
  const pendingOrdonnanceFile = ref(null)

  /**
   * Sélection d'un fichier d'ordonnance
   * @param {File} file - Fichier sélectionné
   * @returns {Promise<void>}
   */
  const selectOrdonnanceFile = async (file) => {
    if (!file) return

    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      error.value = 'Format de fichier non supporté. Veuillez utiliser une image (JPEG, PNG, WEBP) ou un PDF.'
      return
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      error.value = 'Le fichier est trop volumineux. Taille maximale : 5MB'
      return
    }

    error.value = null
    pendingOrdonnanceFile.value = file

    // Créer un preview
    if (file.type === 'application/pdf') {
      // Pour les PDFs, créer une URL
      ordonnancePreview.value = {
        type: 'pdf',
        url: URL.createObjectURL(file)
      }
    } else {
      // Pour les images, créer un data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        ordonnancePreview.value = {
          type: 'image',
          url: e.target.result
        }
        // Afficher le modal de preview
        showPreviewModal.value = true
      }
      reader.readAsDataURL(file)
    }

    console.log('📄 Fichier ordonnance sélectionné:', file.name, file.type, `${(file.size / 1024).toFixed(2)}KB`)
  }

  /**
   * Confirme et upload l'ordonnance
   * @param {string} pharmacyId - ID de la pharmacie
   * @returns {Promise<boolean>} True si succès
   */
  const confirmAndUploadOrdonnance = async (pharmacyId) => {
    if (!pendingOrdonnanceFile.value) {
      error.value = 'Aucun fichier sélectionné'
      return false
    }

    if (!pharmacyId) {
      error.value = 'ID de la pharmacie manquant'
      return false
    }

    uploadingOrdonnance.value = true
    error.value = null

    try {
      console.log('📤 Upload de l\'ordonnance en cours...')

      const response = await MarketPlaceService.uploadOrdonnance(
        pharmacyId,
        pendingOrdonnanceFile.value
      )

      console.log('📥 Réponse complète du serveur (uploadOrdonnance):', response.data)

      if (response.data?.status === 'SUCCESS' && response.data.body) {
        const ordonnance = response.data.body

        console.log('📦 Données ordonnance reçues:', {
          structure: ordonnance,
          hasId: !!ordonnance.id,
          hasData: !!ordonnance.data,
          id: ordonnance.id,
          dataType: typeof ordonnance.data
        })

        // Vérifier que l'ID existe avant d'enregistrer
        if (!ordonnance.id) {
          console.error('❌ Pas d\'ID dans la réponse:', ordonnance)
          throw new Error('L\'ID de l\'ordonnance est manquant dans la réponse du serveur')
        }

        // Enregistrer dans le store avec l'ID de la pharmacie
        cartStore.setOrdonnance(ordonnance.id, ordonnance.data, pharmacyId)

        console.log('✅ Ordonnance uploadée avec succès:', {
          ordonnanceId: ordonnance.id,
          pharmacieId: pharmacyId,
          storeOrdonnanceId: cartStore.ordonnanceId,
          storeOrdonnancePharmacyId: cartStore.ordonnancePharmacyId
        })

        // Fermer le modal
        showPreviewModal.value = false
        pendingOrdonnanceFile.value = null

        return true
      } else {
        console.error('❌ Réponse invalide:', {
          status: response.data?.status,
          hasBody: !!response.data?.body,
          data: response.data
        })
        throw new Error('Réponse invalide du serveur')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de l\'upload de l\'ordonnance'
      error.value = errorMessage
      console.error('❌ Erreur upload ordonnance:', err)
      console.error('❌ Détails de l\'erreur:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      return false
    } finally {
      uploadingOrdonnance.value = false
    }
  }

  /**
   * Annule l'upload de l'ordonnance
   */
  const cancelOrdonnanceUpload = () => {
    showPreviewModal.value = false
    ordonnancePreview.value = null
    pendingOrdonnanceFile.value = null
    error.value = null
    console.log('❌ Upload d\'ordonnance annulé')
  }

  /**
   * Supprime l'ordonnance uploadée
   */
  const removeOrdonnance = () => {
    cartStore.clearOrdonnance()
    ordonnancePreview.value = null
    pendingOrdonnanceFile.value = null
    console.log('🗑️ Ordonnance supprimée du panier')
  }

  /**
   * Soumet la commande
   * @returns {Promise<Object|null>} Données de la commande créée
   */
  const submitOrder = async () => {
    // Vérifier que le panier n'est pas vide
    if (cartStore.isEmpty) {
      error.value = 'Votre panier est vide'
      return null
    }

    // Vérifier que les infos client sont remplies
    if (!cartStore.customerInfo.nom || !cartStore.customerInfo.prenom || !cartStore.customerInfo.telWathsApp) {
      error.value = 'Veuillez remplir toutes les informations requises'
      return null
    }

    submittingOrder.value = true
    error.value = null

    try {
      console.log('📤 Étape 1/2 : Création du panier...')

      // Vérifier l'état du store avant de récupérer les données
      console.log('🔍 État du store avant getPanierData:', {
        hasOrdonnance: cartStore.hasOrdonnance,
        ordonnanceId: cartStore.ordonnanceId,
        ordonnancePharmacyId: cartStore.ordonnancePharmacyId,
        currentPharmacyId: cartStore.pharmacyId,
        ordonnanceData: cartStore.ordonnanceData ? 'Présent' : 'Absent'
      })

      // Vérifier que l'ordonnance appartient à la bonne pharmacie
      if (cartStore.hasOrdonnance && cartStore.ordonnancePharmacyId !== cartStore.pharmacyId) {
        console.warn('⚠️ L\'ordonnance ne correspond pas à la pharmacie actuelle - Suppression de l\'ordonnance')
        console.warn('   Ordonnance pour:', cartStore.ordonnancePharmacyId)
        console.warn('   Commande pour:', cartStore.pharmacyId)
        cartStore.clearOrdonnance()
      }

      const panierData = cartStore.getPanierData()
      console.log('📦 Données du panier:', panierData)

      // Étape 1 : Créer le panier
      const createResponse = await MarketPlaceService.createPanier(panierData)

      console.log('📥 Réponse complète du serveur (createPanier):', createResponse.data)

      if (createResponse.data?.status === 'SUCCESS' && createResponse.data.body) {
        const panierCreated = createResponse.data.body
        console.log('✅ Panier créé avec succès:', panierCreated)

        // Étape 2 : Préparer les données pour soumission à la pharmacie
        const submitData = {
          panierId: panierCreated.id,
          lignePanierDto: panierCreated.lignePanierDto,
          total: panierCreated.total,
          imageOrdonnance: cartStore.ordonnanceData || '' // Image de l'ordonnance en base64
        }

        console.log('📤 Étape 2/2 : Soumission du panier à la pharmacie...', {
          panierId: submitData.panierId,
          produits: submitData.lignePanierDto.length,
          total: submitData.total,
          hasOrdonnance: !!submitData.imageOrdonnance
        })

        // Étape 3 : Soumettre à la pharmacie
        const submitResponse = await MarketPlaceService.submitPanierToPharmacy(submitData)

        console.log('📥 Réponse complète du serveur (submitPanierToPharmacy):', submitResponse)

        // Le serveur peut retourner différents formats de réponse
        // Format 1: { status: 'SUCCESS', body: {...} }
        // Format 2: "Panier soumis à la pharmacie pour validation" (string direct)
        // Format 3: Juste un status 200 OK

        const isSuccess =
          submitResponse.status === 200 ||
          submitResponse.data?.status === 'SUCCESS' ||
          (typeof submitResponse.data === 'string' && submitResponse.data.includes('soumis'))

        if (isSuccess) {
          console.log('✅ Panier soumis à la pharmacie avec succès:', submitResponse.data)

          // Vider le panier uniquement après les deux succès
          cartStore.clearCart()

          return panierCreated // Retourner les données du panier créé
        } else {
          console.error('❌ Réponse inattendue:', submitResponse)
          throw new Error('Erreur lors de la soumission à la pharmacie')
        }
      } else {
        console.error('❌ Réponse invalide:', {
          status: createResponse.data?.status,
          hasBody: !!createResponse.data?.body,
          data: createResponse.data
        })
        throw new Error('Réponse invalide du serveur lors de la création du panier')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la soumission de la commande'
      error.value = errorMessage
      console.error('❌ Erreur soumission commande:', err)
      console.error('❌ Détails de l\'erreur:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      return null
    } finally {
      submittingOrder.value = false
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
    loading,
    error,
    uploadingOrdonnance,
    submittingOrder,
    ordonnancePreview,
    showPreviewModal,

    // Méthodes - Ordonnance
    selectOrdonnanceFile,
    confirmAndUploadOrdonnance,
    cancelOrdonnanceUpload,
    removeOrdonnance,

    // Méthodes - Commande
    submitOrder,
    clearError,

    // Store (pour accès direct)
    cartStore
  }
}
