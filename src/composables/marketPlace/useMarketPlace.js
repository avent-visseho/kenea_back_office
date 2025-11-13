// src/composables/marketPlace/useMarketPlace.js
// Composable principal pour gérer la marketplace

import { ref, computed } from 'vue'
import { MarketPlaceService } from '@/api/services/marketPlace'
import { callerService } from '@/api/services/caller_service'
import { useGeolocation } from './useGeolocation'
import {
  transformPharmaciesListData,
  transformPharmacyData,
  transformProductsListData,
  transformProductData
} from '@/utils/marketplaceTransformers'

/**
 * Composable pour gérer toutes les opérations de la marketplace
 * @returns {Object} État et méthodes de la marketplace
 */
export function useMarketPlace() {
  // === État ===
  const pharmacies = ref([])
  const selectedPharmacy = ref(null)
  const products = ref([])
  const selectedProduct = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Géolocalisation
  const geolocation = useGeolocation()

  // URL de base de l'API pour les images
  const apiHost = callerService.API_HOST_SERVEUR

  // === Computed ===

  /**
   * Pharmacies disponibles (non supprimées)
   */
  const availablePharmacies = computed(() => {
    return pharmacies.value.filter(p => !p.deleted)
  })

  /**
   * Produits disponibles (en stock et non supprimés)
   */
  const availableProducts = computed(() => {
    return products.value.filter(p => p.disponible && !p.deleted)
  })

  /**
   * Nombre total de pharmacies
   */
  const pharmaciesCount = computed(() => availablePharmacies.value.length)

  /**
   * Nombre total de produits
   */
  const productsCount = computed(() => availableProducts.value.length)

  /**
   * Vérifie si des données sont en cours de chargement
   */
  const isLoading = computed(() => loading.value || geolocation.isLoading.value)

  // === Méthodes - Pharmacies ===

  /**
   * Récupère toutes les pharmacies proches avec leurs produits
   * Utilise automatiquement la géolocalisation
   * @param {number} limit - Nombre maximum de pharmacies à récupérer
   * @returns {Promise<Array>} Liste des pharmacies transformées
   */
  const fetchNearbyPharmacies = async (limit = 50) => {
    loading.value = true
    error.value = null

    try {
      // 1. Obtenir la position de l'utilisateur
      let location
      try {
        location = await geolocation.getLocation()
      } catch (geoError) {
        console.warn('⚠️ Géolocalisation échouée, utilisation de la position par défaut')
        location = geolocation.defaultLocation
      }

      console.log('📍 Position utilisée:', location)

      // 2. Appeler l'API avec les coordonnées
      const response = await MarketPlaceService.getSugestMarketPharmaciesList(
        location.lat,
        location.lng,
        limit
      )

      // 3. Vérifier la réponse
      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        // 4. Transformer les données
        const transformedPharmacies = transformPharmaciesListData(
          response.data.body,
          location,
          apiHost
        )

        pharmacies.value = transformedPharmacies
        console.log(`✅ ${transformedPharmacies.length} pharmacies chargées`)

        return transformedPharmacies
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors du chargement des pharmacies'
      error.value = errorMessage
      console.error('❌ Erreur fetchNearbyPharmacies:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupère les infos complètes d'une pharmacie depuis la liste des pharmacies proches
   * Utilisé quand on accède directement à la page de détails (sans passer par Home)
   * @param {string} pharmacyId - ID de la pharmacie
   * @returns {Promise<Object|null>} Objet pharmacie ou null si non trouvé
   */
  const fetchPharmacyInfoFromNearbyList = async (pharmacyId) => {
    try {
      // Obtenir la position de l'utilisateur
      let location
      try {
        location = await geolocation.getLocation()
      } catch (geoError) {
        location = geolocation.defaultLocation
      }

      // Appeler l'API pour récupérer les pharmacies proches
      const response = await MarketPlaceService.getSugestMarketPharmaciesList(
        location.lat,
        location.lng,
        100 // Charger plus de pharmacies pour augmenter les chances de trouver celle qu'on cherche
      )

      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        // Chercher la pharmacie dans la liste
        const foundPharmacy = response.data.body.find(p => p.id === pharmacyId)

        if (foundPharmacy) {
          // Transformer les données
          const transformedPharmacy = transformPharmacyData(foundPharmacy, location, apiHost)
          console.log(`✅ Infos de la pharmacie ${pharmacyId} récupérées`)
          return transformedPharmacy
        }
      }

      return null
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des infos de la pharmacie:', err)
      return null
    }
  }

  /**
   * Récupère une pharmacie spécifique par son ID avec ses produits
   * @param {string} pharmacyId - ID de la pharmacie
   * @returns {Promise<Object>} Pharmacie transformée avec ses produits
   */
  const fetchPharmacyById = async (pharmacyId) => {
    loading.value = true
    error.value = null

    try {
      // Appeler l'API pour récupérer les produits de la pharmacie
      const response = await MarketPlaceService.getMarketPharmaciesById(pharmacyId)

      console.log('📦 Réponse API produits brute:', response.data)

      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        console.log(`📦 ${response.data.body.length} produits reçus de l'API`)

        // Les produits de cette pharmacie
        const pharmacyProducts = transformProductsListData(response.data.body, apiHost)
        console.log(`✅ ${pharmacyProducts.length} produits après transformation`)

        products.value = pharmacyProducts

        // Si on a déjà chargé la pharmacie dans la liste, la récupérer
        let pharmacy = pharmacies.value.find(p => p.id === pharmacyId)

        // Sinon, créer un objet pharmacie basique
        if (!pharmacy && pharmacyProducts.length > 0) {
          pharmacy = {
            id: pharmacyId,
            nom: 'Pharmacie',
            produits: pharmacyProducts,
            produitsCount: pharmacyProducts.length
          }
        }

        selectedPharmacy.value = pharmacy
        console.log(`✅ Pharmacie ${pharmacyId} chargée avec ${pharmacyProducts.length} produits`)

        return {
          pharmacy,
          products: pharmacyProducts
        }
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors du chargement de la pharmacie'
      error.value = errorMessage
      console.error('❌ Erreur fetchPharmacyById:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Recherche des pharmacies par mot-clé
   * @param {string} pharmacyId - ID de la pharmacie (optionnel)
   * @param {string} keyword - Mot-clé de recherche
   * @returns {Promise<Array>} Résultats de recherche
   */
  const searchPharmaciesByKeyword = async (pharmacyId, keyword) => {
    if (!keyword || keyword.trim() === '') {
      return availableProducts.value
    }

    loading.value = true
    error.value = null

    try {
      const response = await MarketPlaceService.searchMarketPharmaciesByKeyword(
        pharmacyId,
        keyword
      )

      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        const results = transformProductsListData(response.data.body, apiHost)
        console.log(`✅ ${results.length} résultats trouvés pour "${keyword}"`)
        return results
      } else {
        return []
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la recherche'
      error.value = errorMessage
      console.error('❌ Erreur searchPharmaciesByKeyword:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // === Méthodes - Produits ===

  /**
   * Récupère tous les produits disponibles
   * @returns {Promise<Array>} Liste des produits
   */
  const fetchAllProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await MarketPlaceService.getMarketPharmaciesList()

      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        const allProducts = transformProductsListData(response.data.body, apiHost)
        products.value = allProducts
        console.log(`✅ ${allProducts.length} produits chargés`)
        return allProducts
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors du chargement des produits'
      error.value = errorMessage
      console.error('❌ Erreur fetchAllProducts:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupère les pharmacies qui vendent un produit spécifique
   * @param {string} productId - ID du produit
   * @param {number} limit - Nombre maximum de pharmacies
   * @returns {Promise<Array>} Liste des pharmacies
   */
  const fetchPharmaciesByProduct = async (productId, limit = 10) => {
    loading.value = true
    error.value = null

    try {
      // Obtenir la position de l'utilisateur
      let location
      try {
        location = await geolocation.getLocation()
      } catch (geoError) {
        console.warn('⚠️ Géolocalisation échouée, utilisation de la position par défaut')
        location = geolocation.defaultLocation
      }

      // Appeler l'API
      const response = await MarketPlaceService.getMarketPharmaciesByProduitId(
        productId,
        location.lat,
        location.lng,
        limit
      )

      if (response.data?.status === 'SUCCESS' && Array.isArray(response.data.body)) {
        const pharmaciesWithProduct = transformPharmaciesListData(
          response.data.body,
          location,
          apiHost
        )
        console.log(`✅ ${pharmaciesWithProduct.length} pharmacies trouvées pour le produit ${productId}`)
        return pharmaciesWithProduct
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de la recherche de pharmacies'
      error.value = errorMessage
      console.error('❌ Erreur fetchPharmaciesByProduct:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // === Méthodes - Sélection ===

  /**
   * Sélectionne une pharmacie
   * @param {Object} pharmacy - Pharmacie à sélectionner
   */
  const selectPharmacy = (pharmacy) => {
    selectedPharmacy.value = pharmacy
    console.log('📍 Pharmacie sélectionnée:', pharmacy?.nom)
  }

  /**
   * Désélectionne la pharmacie actuelle
   */
  const clearSelectedPharmacy = () => {
    selectedPharmacy.value = null
    products.value = []
  }

  /**
   * Sélectionne un produit
   * @param {Object} product - Produit à sélectionner
   */
  const selectProduct = (product) => {
    selectedProduct.value = product
    console.log('🛒 Produit sélectionné:', product?.nom)
  }

  /**
   * Désélectionne le produit actuel
   */
  const clearSelectedProduct = () => {
    selectedProduct.value = null
  }

  // === Méthodes - Filtres locaux ===

  /**
   * Filtre les pharmacies localement (sans appel API)
   * @param {string} query - Terme de recherche
   * @returns {Array} Pharmacies filtrées
   */
  const filterPharmaciesLocally = (query) => {
    if (!query || query.trim() === '') {
      return availablePharmacies.value
    }

    const lowerQuery = query.toLowerCase()
    return availablePharmacies.value.filter(pharmacy =>
      pharmacy.nom?.toLowerCase().includes(lowerQuery) ||
      pharmacy.adresse?.toLowerCase().includes(lowerQuery) ||
      pharmacy.ville?.toLowerCase().includes(lowerQuery) ||
      pharmacy.region?.toLowerCase().includes(lowerQuery) ||
      pharmacy.services?.some(service => service.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Filtre les produits localement (sans appel API)
   * @param {string} query - Terme de recherche
   * @returns {Array} Produits filtrés
   */
  const filterProductsLocally = (query) => {
    if (!query || query.trim() === '') {
      return availableProducts.value
    }

    const lowerQuery = query.toLowerCase()
    return availableProducts.value.filter(product =>
      product.nom?.toLowerCase().includes(lowerQuery) ||
      product.code?.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery) ||
      product.fabricant?.toLowerCase().includes(lowerQuery)
    )
  }

  // === Méthodes - Utilitaires ===

  /**
   * Réinitialise toutes les données
   */
  const reset = () => {
    pharmacies.value = []
    selectedPharmacy.value = null
    products.value = []
    selectedProduct.value = null
    loading.value = false
    error.value = null
    geolocation.reset()
  }

  /**
   * Réinitialise uniquement l'erreur
   */
  const clearError = () => {
    error.value = null
  }

  // === Retour ===
  return {
    // État
    pharmacies: computed(() => pharmacies.value),
    selectedPharmacy: computed(() => selectedPharmacy.value),
    products: computed(() => products.value),
    selectedProduct: computed(() => selectedProduct.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isLoading,

    // Computed
    availablePharmacies,
    availableProducts,
    pharmaciesCount,
    productsCount,

    // Géolocalisation
    userLocation: geolocation.userLocation,
    locationError: geolocation.locationError,
    getLocation: geolocation.getLocation,
    useDefaultLocation: geolocation.useDefaultLocation,

    // Méthodes - Pharmacies
    fetchNearbyPharmacies,
    fetchPharmacyById,
    fetchPharmacyInfoFromNearbyList,
    searchPharmaciesByKeyword,

    // Méthodes - Produits
    fetchAllProducts,
    fetchPharmaciesByProduct,

    // Méthodes - Sélection
    selectPharmacy,
    clearSelectedPharmacy,
    selectProduct,
    clearSelectedProduct,

    // Méthodes - Filtres
    filterPharmaciesLocally,
    filterProductsLocally,

    // Méthodes - Utilitaires
    reset,
    clearError
  }
}
