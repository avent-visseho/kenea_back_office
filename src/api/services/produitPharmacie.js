// src/api/services/produitPharmacie.js
import { callerService } from './caller_service'

/**
 * Crée un produit pharmacie avec image
 * @param {Object} data - { dto: {...}, image: "base64" }
 */
const createProduitPharmacie = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}produits-pharmacie`, data)
}

/**
 * Met à jour un produit pharmacie
 * @param {string} id - ID du produit pharmacie
 * @param {Object} data - { dto: {...}, image: "base64" }
 */
const updateProduitPharmacie = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}produits-pharmacie/${id}`, data)
}

/**
 * Supprime un produit pharmacie
 * @param {string} id - ID du produit pharmacie
 */
const deleteProduitPharmacie = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}produits-pharmacie/${id}`)
}

/**
 * Exporte les produits d'une pharmacie
 * @param {string} pharmacieId - ID de la pharmacie
 */
const exportProduitsPharmacie = (pharmacieId) => {
  return callerService.Axios.get(`${callerService.API_URL}produits-pharmacie/export/${pharmacieId}`)
}

/**
 * Import de produits par fichier avec images
 * @param {string} pharmacieId - ID de la pharmacie
 * @param {File} file - Fichier à importer
 * @param {Array<File>} images - Images des produits
 */
const importProduitsFile = (pharmacieId, file, images = []) => {
  const formData = new FormData()
  formData.append('file', file)

  // Ajouter toutes les images
  images.forEach(image => {
    formData.append('images', image)
  })

  return callerService.Axios.post(
    `${callerService.API_URL}produits-pharmacie/import-file`,
    formData,
    {
      params: { pharmacieId },
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
}

/**
 * Mise à jour par import de fichier
 * @param {string} id - ID du produit pharmacie
 * @param {File} file - Fichier à importer
 * @param {Array<File>} images - Images des produits
 */
const importUpdateProduit = (id, file, images = []) => {
  const formData = new FormData()
  formData.append('file', file)

  // Ajouter toutes les images
  images.forEach(image => {
    formData.append('images', image)
  })

  return callerService.Axios.put(
    `${callerService.API_URL}produits-pharmacie/import-update`,
    formData,
    {
      params: { id },
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
}

export const ProduitPharmacieServices = {
  createProduitPharmacie,
  updateProduitPharmacie,
  deleteProduitPharmacie,
  exportProduitsPharmacie,
  importProduitsFile,
  importUpdateProduit
}
