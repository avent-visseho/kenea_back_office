// src/api/services/produit.js
import { callerService } from './caller_service'

// ============= PRODUITS =============

// Créer un produit
const addProduit = (data) => {
  return callerService.Axios.post(`api/v1/produits`, data)
}

// Récupérer tous les produits
const getProduitsList = () => {
  return callerService.Axios.get(`api/v1/produits`)
}

// Récupérer un produit par ID
const getProduitById = (id) => {
  return callerService.Axios.get(`api/v1/produits/${id}`)
}

// Modifier un produit
const updateProduit = (id, data) => {
  return callerService.Axios.put(`api/v1/produits/${id}`, data)
}

// Supprimer un produit
const deleteProduit = (id) => {
  return callerService.Axios.delete(`api/v1/produits/${id}`)
}

// Rechercher des produits par nom et pharmacie
const searchProduits = (params) => {
  const { nom, pharmacieId } = params
  return callerService.Axios.get(
    `api/v1/produits/search?nom=${nom}&pharmacieId=${pharmacieId}`
  )
}

// Suggestions de produits basées sur la localisation
const suggestProduits = (params) => {
  const { clientLat, clientLon, nomProduit } = params
  return callerService.Axios.get(
    `api/v1/produits/suggest?clientLat=${clientLat}&clientLon=${clientLon}&nomProduit=${nomProduit}`
  )
}

// Rechercher une liste de produits pour une pharmacie
const searchProduitsList = (pharmacieId, produitNames) => {
  return callerService.Axios.post(
    `api/v1/produits/search/list/${pharmacieId}`,
    produitNames
  )
}

// Import CSV avec pharmacieId et categorieId
const importProduitsCsv = (formData, pharmacieId, categorieId) => {
  return callerService.Axios.post(
    `api/v1/produits/import/${pharmacieId}/${categorieId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  )
}

export const ProduitService = {
  addProduit,
  getProduitsList,
  getProduitById,
  updateProduit,
  deleteProduit,
  searchProduits,
  suggestProduits,
  searchProduitsList,
  importProduitsCsv,
}