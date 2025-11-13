/* commentaire utils pour afficher les informations sur la pharmacie et les produit : 
  {
  "status": "SUCCESS",
  "message": "Liste des pharmacies proches avec produits en stock",
  "body": [
    {
      "id": "PHA-1760634968722-454",
      "name": "ABDOU MBENGUE",
      "region": "DAKAR",
      "ville": "DAKAR",
      "adresse": "\"Yoff Layène Route du Cimetière\"",
      "phone": "820.27.31",
      "latitude": 24.490582032,
      "longitude": 55.378496,
      "altitude": null,
      "deGarde": false,
      "deleted": false,
      "uuid": "1830a036-cb96-4b1a-908e-b8efae4270b0",
      "createAt": "2025-10-16T18:16:08.722356",
      "updateAt": "2025-11-13T14:09:00.220807",
      "produits": [
        {
          "id": "PPHA-1763042810373-215",
          "code": "2025111314065037251E84",
          "produitId": "PDT-1760636566643-268",
          "pharmacieId": "PHA-1760634968722-454",
          "produitName": "Concentré de bicarbonate",
          "prix": 1500,
          "stock": 20,
          "promotion": false,
          "prixPromotion": null,
          "dateExpiration": null,
          "fournisseur": null,
          "deleted": false,
          "createAt": "2025-11-13T14:06:50.372594",
          "updateAt": null,
          "userId": "USER-1759307441354-952",
          "userName": null,
          "imageUrl": "data:image/png;base64,/9j/4AAQSkZJRgABAQ49bc/zFXzNx1rD8Xy58IaqM9YD/AEoA/9k="
        },
        {
          "id": "PPHA-1763042810383-408",
          "code": "2025111314065038327FB7",
          "produitId": "PDT-1760636566643-286",
          "pharmacieId": "PHA-1760634968722-454",
          "produitName": "Lignes artère veine",
          "prix": 2750,
          "stock": 15,
          "promotion": false,
          "prixPromotion": null,
          "dateExpiration": null,
          "fournisseur": null,
          "deleted": false,
          "createAt": "2025-11-13T14:06:50.383571",
          "updateAt": null,
          "userId": "USER-1759307441354-952",
          "userName": null,
          "imageUrl": "data:image/png;base64,/9j/4AAQSkZJRgABAQEAYAwAge5/3DQAlt/x7R/7oqU1Dbf8AHtH/ALoqU1RJ/9k="
        }
      ]
    }
  ]
}
*/



// src/utils/marketplaceTransformers.js
// Utilitaires pour transformer les données de l'API vers le format UI

/**
 * Calcule la distance entre deux coordonnées GPS (formule de Haversine)
 * @param {Object} coord1 - {lat, lng}
 * @param {Object} coord2 - {lat, lng}
 * @returns {string} Distance formatée (ex: "2.5 km")
 */
export const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2 || !coord1.lat || !coord1.lng || !coord2.lat || !coord2.lng) {
    return 'N/A'
  }

  const R = 6371 // Rayon de la Terre en km
  const dLat = toRad(coord2.lat - coord1.lat)
  const dLng = toRad(coord2.lng - coord1.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`
  }
  return `${distance.toFixed(1)} km`
}

const toRad = (value) => {
  return (value * Math.PI) / 180
}

/**
 * Construit l'URL complète pour une image
 * @param {string} imageUrl - URL relative de l'image ou base64
 * @param {string} apiHost - URL de base de l'API
 * @returns {string} URL complète, base64 ou image par défaut
 */
export const buildImageUrl = (imageUrl, apiHost) => {
  if (!imageUrl) {
    return 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800' // Image par défaut
  }

  // Si c'est déjà une image base64, la retourner telle quelle
  if (imageUrl.startsWith('data:image/')) {
    return imageUrl
  }

  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Construire l'URL complète pour les chemins relatifs
  const cleanHost = apiHost.replace(/\/$/, '')
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return `${cleanHost}${cleanPath}`
}

/**
 * Transforme une pharmacie de l'API vers le format UI
 * @param {Object} apiPharmacy - Données de la pharmacie depuis l'API
 * @param {Object} userLocation - Position de l'utilisateur {lat, lng}
 * @param {string} apiHost - URL de base de l'API
 * @returns {Object} Pharmacie au format UI
 */
export const transformPharmacyData = (apiPharmacy, userLocation = null, apiHost = '') => {
  if (!apiPharmacy) return null

  // Récupérer l'image du premier produit ou une image par défaut
  const firstProductImage = apiPharmacy.produits?.[0]?.imageUrl
  const imageUrl = buildImageUrl(firstProductImage, apiHost)

  // Calculer la distance si on a la position de l'utilisateur
  const distance = userLocation
    ? calculateDistance(userLocation, {
        lat: apiPharmacy.latitude,
        lng: apiPharmacy.longitude
      })
    : 'N/A'

  // Générer les horaires en fonction du statut de garde
  const horaires = apiPharmacy.deGarde
    ? 'Service 24/7 - Garde permanente'
    : 'Lun-Sam: 8h-20h, Dim: 9h-18h'

  // Services par défaut (à enrichir si l'API fournit ces infos plus tard)
  const services = [
    'Conseil pharmaceutique',
    'Ordonnances',
    ...(apiPharmacy.deGarde ? ['Service 24/7', 'Urgences'] : []),
    'Produits de santé'
  ]

  return {
    id: apiPharmacy.id,
    nom: apiPharmacy.name || 'Pharmacie',
    adresse: apiPharmacy.adresse || 'Adresse non disponible',
    ville: apiPharmacy.ville || '',
    region: apiPharmacy.region || '',
    telephone: apiPharmacy.phone || 'N/A',
    email: apiPharmacy.email /* `contact@${apiPharmacy.name?.toLowerCase().replace(/\s/g, '')}.sn` */ || 'N/A',
    image: imageUrl,
    description: `Pharmacie située à ${apiPharmacy.ville}, ${apiPharmacy.region}. ${
      apiPharmacy.deGarde ? 'Service de garde disponible 24/7.' : ''
    }`,
    horaires,
    services,
    coordonnees: {
      lat: apiPharmacy.latitude,
      lng: apiPharmacy.longitude,
      altitude: apiPharmacy.altitude
    },
    deGarde: apiPharmacy.deGarde || false,
    note: 4.5, // Note par défaut (à calculer depuis les avis si disponible)
    distance,
    uuid: apiPharmacy.uuid,
    produitsCount: apiPharmacy.produits?.length || 0
  }
}

/**
 * Transforme un produit de l'API vers le format UI
 * @param {Object} apiProduct - Données du produit depuis l'API
 * @param {string} apiHost - URL de base de l'API
 * @returns {Object} Produit au format UI
 */
export const transformProductData = (apiProduct, apiHost = '') => {
  if (!apiProduct) return null

  const imageUrl = buildImageUrl(apiProduct.imageUrl, apiHost)

  // Calculer le prix final (avec promotion si applicable)
  const prixFinal = apiProduct.promotion && apiProduct.prixPromotion
    ? apiProduct.prixPromotion
    : apiProduct.prix

  const transformed = {
    id: apiProduct.id,
    code: apiProduct.code,
    produitId: apiProduct.produitId,
    pharmacieId: apiProduct.pharmacieId,
    nom: apiProduct.nomProduit || apiProduct.produit || 'Produit',
    categorie: 'Médicament', // Catégorie par défaut (à enrichir si l'API fournit)
    prix: apiProduct.prix,
    prixFinal,
    devise: 'FCFA',
    stock: apiProduct.stock || 0,
    image: imageUrl,
    description: apiProduct.description || 'Aucune description disponible',
    dosage: apiProduct.dosage || 'N/A',
    format: apiProduct.format || apiProduct.code,
    fabricant: apiProduct.fournisseur || 'Non spécifié',
    fournisseur: apiProduct.fournisseur,
    ordonnanceRequise: apiProduct.ordonnanceRequise || false,
    promotion: apiProduct.promotion || false,
    prixPromotion: apiProduct.prixPromotion,
    dateExpiration: apiProduct.dateExpiration,
    deleted: apiProduct.deleted || false,
    disponible: apiProduct.stock > 0 && !apiProduct.deleted,
    createAt: apiProduct.createAt,
    updateAt: apiProduct.updateAt
  }

  // Log pour debug
  console.log('🔄 Produit transformé:', {
    id: transformed.id,
    nom: transformed.nom,
    image: transformed.image?.substring(0, 50) + '...',
    stock: transformed.stock,
    disponible: transformed.disponible
  })

  return transformed
}

/**
 * Transforme une liste de pharmacies de l'API vers le format UI
 * @param {Array} apiPharmacies - Liste des pharmacies depuis l'API
 * @param {Object} userLocation - Position de l'utilisateur {lat, lng}
 * @param {string} apiHost - URL de base de l'API
 * @returns {Array} Liste des pharmacies au format UI
 */
export const transformPharmaciesListData = (apiPharmacies, userLocation = null, apiHost = '') => {
  if (!Array.isArray(apiPharmacies)) return []

  return apiPharmacies
    .map(pharmacy => transformPharmacyData(pharmacy, userLocation, apiHost))
    .filter(pharmacy => pharmacy !== null)
    .sort((a, b) => {
      // Trier par distance si disponible
      if (a.distance === 'N/A' || b.distance === 'N/A') return 0

      const distA = parseFloat(a.distance)
      const distB = parseFloat(b.distance)
      return distA - distB
    })
}

/**
 * Transforme une liste de produits de l'API vers le format UI
 * @param {Array} apiProducts - Liste des produits depuis l'API
 * @param {string} apiHost - URL de base de l'API
 * @returns {Array} Liste des produits au format UI
 */
export const transformProductsListData = (apiProducts, apiHost = '') => {
  if (!Array.isArray(apiProducts)) return []

  return apiProducts
    .map(product => transformProductData(product, apiHost))
    .filter(product => product !== null)
    .filter(product => product.disponible) // Filtrer les produits disponibles
}

/**
 * Groupe les produits par pharmacie
 * @param {Array} products - Liste des produits transformés
 * @returns {Object} Produits groupés par pharmacieId
 */
export const groupProductsByPharmacy = (products) => {
  if (!Array.isArray(products)) return {}

  return products.reduce((acc, product) => {
    const pharmacyId = product.pharmacieId
    if (!acc[pharmacyId]) {
      acc[pharmacyId] = []
    }
    acc[pharmacyId].push(product)
    return acc
  }, {})
}
