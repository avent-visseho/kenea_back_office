// src/store/cart/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // === État ===
  const items = ref([]) // Produits dans le panier
  const pharmacyId = ref(null) // ID de la pharmacie
  const pharmacyName = ref('') // Nom de la pharmacie
  const ordonnanceId = ref(null) // ID de l'ordonnance uploadée
  const ordonnanceData = ref(null) // Données base64 de l'ordonnance pour preview
  const customerInfo = ref({
    nom: '',
    prenom: '',
    telWathsApp: ''
  })

  // === Computed ===

  /**
   * Nombre total d'articles dans le panier
   */
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantite, 0)
  })

  /**
   * Total du panier
   */
  const total = computed(() => {
    return items.value.reduce((total, item) => total + item.sousTotal, 0)
  })

  /**
   * Vérifie si le panier est vide
   */
  const isEmpty = computed(() => items.value.length === 0)

  /**
   * Vérifie si une ordonnance a été uploadée
   */
  const hasOrdonnance = computed(() => ordonnanceId.value !== null)

  // === Actions ===

  /**
   * Ajoute un produit au panier
   * @param {Object} product - Produit à ajouter
   * @param {number} quantite - Quantité
   */
  const addItem = (product, quantite = 1) => {
    const existingItem = items.value.find(item => item.produitPharmacieId === product.id)

    if (existingItem) {
      // Mettre à jour la quantité si le produit existe déjà
      existingItem.quantite += quantite
      existingItem.sousTotal = existingItem.quantite * existingItem.prixUnitaire
    } else {
      // Ajouter un nouveau produit
      items.value.push({
        produitPharmacieId: product.id,
        productName: product.nom,
        quantite: quantite,
        prixUnitaire: product.prix,
        sousTotal: product.prix * quantite,
        // Données supplémentaires pour l'UI
        image: product.image,
        stock: product.stock
      })
    }

    console.log('🛒 Produit ajouté au panier:', product.nom, 'x', quantite)
  }

  /**
   * Met à jour la quantité d'un produit
   * @param {string} produitPharmacieId - ID du produit
   * @param {number} quantite - Nouvelle quantité
   */
  const updateQuantity = (produitPharmacieId, quantite) => {
    const item = items.value.find(item => item.produitPharmacieId === produitPharmacieId)

    if (item) {
      if (quantite <= 0) {
        // Retirer l'article si quantité = 0
        removeItem(produitPharmacieId)
      } else {
        item.quantite = quantite
        item.sousTotal = item.quantite * item.prixUnitaire
        console.log('🛒 Quantité mise à jour:', item.productName, 'x', quantite)
      }
    }
  }

  /**
   * Retire un produit du panier
   * @param {string} produitPharmacieId - ID du produit
   */
  const removeItem = (produitPharmacieId) => {
    const index = items.value.findIndex(item => item.produitPharmacieId === produitPharmacieId)
    if (index > -1) {
      const removedItem = items.value.splice(index, 1)[0]
      console.log('🛒 Produit retiré du panier:', removedItem.productName)
    }
  }

  /**
   * Définit la pharmacie pour le panier
   * @param {string} id - ID de la pharmacie
   * @param {string} name - Nom de la pharmacie
   */
  const setPharmacy = (id, name) => {
    pharmacyId.value = id
    pharmacyName.value = name
    console.log('🏥 Pharmacie définie:', name)
  }

  /**
   * Enregistre l'ID de l'ordonnance uploadée
   * @param {string} id - ID de l'ordonnance
   * @param {string} data - Données base64 de l'ordonnance
   */
  const setOrdonnance = (id, data) => {
    ordonnanceId.value = id
    ordonnanceData.value = data
    console.log('📄 Ordonnance enregistrée:', id)
  }

  /**
   * Supprime l'ordonnance
   */
  const clearOrdonnance = () => {
    ordonnanceId.value = null
    ordonnanceData.value = null
    console.log('📄 Ordonnance supprimée')
  }

  /**
   * Définit les informations du client
   * @param {Object} info - {nom, prenom, telWathsApp}
   */
  const setCustomerInfo = (info) => {
    customerInfo.value = { ...info }
    console.log('👤 Informations client enregistrées')
  }

  /**
   * Vide complètement le panier
   */
  const clearCart = () => {
    items.value = []
    pharmacyId.value = null
    pharmacyName.value = ''
    ordonnanceId.value = null
    ordonnanceData.value = null
    customerInfo.value = {
      nom: '',
      prenom: '',
      telWathsApp: ''
    }
    console.log('🛒 Panier vidé')
  }

  /**
   * Prépare les données pour la soumission du panier
   * @returns {Object} Données formatées pour l'API
   */
  const getPanierData = () => {
    return {
      lignePanierDto: items.value.map(item => ({
        produitPharmacieId: item.produitPharmacieId,
        productName: item.productName,
        quantite: item.quantite,
        prixUnitaire: item.prixUnitaire,
        sousTotal: item.sousTotal
      })),
      pharmacieId: pharmacyId.value,
      livreurId: '', // À définir si nécessaire
      ordonnanceId: ordonnanceId.value || '',
      total: total.value,
      nom: customerInfo.value.nom,
      prenom: customerInfo.value.prenom,
      telWathsApp: customerInfo.value.telWathsApp
    }
  }

  return {
    // État
    items,
    pharmacyId,
    pharmacyName,
    ordonnanceId,
    ordonnanceData,
    customerInfo,

    // Computed
    itemCount,
    total,
    isEmpty,
    hasOrdonnance,

    // Actions
    addItem,
    updateQuantity,
    removeItem,
    setPharmacy,
    setOrdonnance,
    clearOrdonnance,
    setCustomerInfo,
    clearCart,
    getPanierData
  }
})
