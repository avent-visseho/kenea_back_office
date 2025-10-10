//src/api/services/produit.js
import { callerService } from './caller_service'

// ======== PRODUITS ========
const addProduit = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}produits`, data)
}

const getProduitsList = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}produits`, { params })
}

const getProduitById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}produits/${id}`, { params })
}

const updateProduit = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}produits/${id}`, data)
}

const deleteProduit = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}produits/${id}`)
}

const searchProduits = (params) => {
  return callerService.Axios.get(`${callerService.API_URL}produits/search`, { params })
}

const suggestProduits = (params) => {
  return callerService.Axios.get(`${callerService.API_URL}produits/suggest`, { params })
}

const searchProduitsList = (pharmacieId, produitNames) => {
  return callerService.Axios.post(
    `${callerService.API_URL}produits/search/list/${pharmacieId}`,
    produitNames
  )
}

const importProduitsCsv = (formData, pharmacieId, categorieId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}produits/import/${pharmacieId}/${categorieId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
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
