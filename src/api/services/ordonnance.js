// src/api/services/ordonnance.js
import { callerService } from './caller_service'

const getAllOrdonnances = () => { //params = {}
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/my`) //, { params }
}

const getOrdonnanceById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/read/${id}`, { params })
}

const getOrdonnancesByUtilisateur = (utilisateurId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/utilisateur/${utilisateurId}`, { params })
}

const getAllOrdonnancesByUtilisateur = (utilisateurId) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/utilisateur/${utilisateurId}/all`)
}

const getOrdonnancesByPharmacie = (pharmacieId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/pharmacie/${pharmacieId}`, { params })
}

const getAllOrdonnancesByPharmacie = (pharmacieId) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/pharmacie/${pharmacieId}/all`)
}

const getByEtat = (etat) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/my/${etat}`)
}

const uploadOrdonnance = (pharmacieIds, file) => {
  const formData = new FormData()
  
  // Le backend attend un objet dto avec un tableau pharmacieIds
  const dto = { 
    pharmacieIds: Array.isArray(pharmacieIds) ? pharmacieIds : [pharmacieIds] 
  }
  
  // Ajout du dto en tant que paramètre query (comme dans l'exemple Swagger)
  const dtoParam = encodeURIComponent(JSON.stringify(dto))
  
  // Ajout du fichier
  formData.append('file', file)
  
  // Envoi vers l'API avec dto en query parameter
  return callerService.Axios.post(
    `${callerService.API_URL}ordonnances/upload-v2?dto=${dtoParam}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

const deleteOrdonnance = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}ordonnances/delete/${id}`)
}

const updateOrdonnanceStatus = (id, etat) => {
  return callerService.Axios.put(`${callerService.API_URL}ordonnances/update/${id}`, { etat })
}

export const OrdonnanceServices = {
  getAllOrdonnances,
  getOrdonnanceById,
  getOrdonnancesByUtilisateur,
  getAllOrdonnancesByUtilisateur,
  getOrdonnancesByPharmacie,
  getAllOrdonnancesByPharmacie,
  getByEtat,
  uploadOrdonnance,
  deleteOrdonnance,
  updateOrdonnanceStatus
}