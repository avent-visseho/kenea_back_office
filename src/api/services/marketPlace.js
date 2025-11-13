// src/api/services/marketPlace.js
import { callerService } from './caller_service'

const getMarketPharmaciesList = () => {
  return callerService.Axios.get(`${callerService.API_URL}market-places/all`)
}

// ✅ Récupère les pharmacies proches avec leurs produits
const getSugestMarketPharmaciesList = (latitude, longitude, limit = 10) => {
  return callerService.Axios.get(`${callerService.API_URL}market-places/proches`, {
    params: { latitude, longitude, limit }
  })
}

// ✅ Récupère les pharmacies proches qui vendent un produit spécifique
const getMarketPharmaciesByProduitId = (produitId, latitude, longitude, limit = 10) => {
  return callerService.Axios.get(`${callerService.API_URL}market-places/proches/${produitId}`, {
    params: { latitude, longitude, limit }
  })
}

// ✅ Recherche de produits par mot-clé dans une pharmacie
const searchMarketPharmaciesByKeyword = (pharmacieId, keyword) => {
  return callerService.Axios.get(`${callerService.API_URL}market-places/search`, {
    params: { pharmacieId, keyword },
  })
}

// ✅ Récupère les produits d'une pharmacie spécifique
const getMarketPharmaciesById = (pharmacieId) => {
  return callerService.Axios.get(`${callerService.API_URL}market-places/pharmacie/${pharmacieId}`)
}

// ✅ Upload d'une ordonnance
const uploadOrdonnance = (pharmacieId, file) => {
  const formData = new FormData()
  formData.append('file', file)

  return callerService.Axios.post(
    `${callerService.API_URL}paniers/upload`,
    formData,
    {
      params: { pharmacieId },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

// ✅ Création d'un panier/commande
const createPanier = (panierData) => {
  return callerService.Axios.post(
    `${callerService.API_URL}paniers/create`,
    panierData
  )
}

// ✅ Soumettre le panier à la pharmacie
const submitPanierToPharmacy = (panierSubmitData) => {
  return callerService.Axios.post(
    `${callerService.API_URL}market-places/submit-panier-to-pharmacienewv`,
    panierSubmitData
  )
}

export const MarketPlaceService = {
  getMarketPharmaciesList,
  getSugestMarketPharmaciesList,
  getMarketPharmaciesByProduitId,
  searchMarketPharmaciesByKeyword,
  getMarketPharmaciesById,
  uploadOrdonnance,
  createPanier,
  submitPanierToPharmacy,
}

