// src/api/services/ordonnance.js
import { callerService } from './caller_service'

const getAllOrdonnances = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances`, { params })
}

const getOrdonnanceById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/${id}`, { params })
}

const getOrdonnancesByUtilisateur = (utilisateurId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/utilisateur/${utilisateurId}`, { params })
}

const getAllOrdonnancesByUtilisateur = (utilisateurId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/utilisateur/ordonnance/${utilisateurId}`, { params })
}

const getOrdonnancesByPharmacie = (pharmacieId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/pharmacie/${pharmacieId}`, { params })
}

const getAllOrdonnancesByPharmacie = (pharmacieId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/pharmacie/ordonnance/${pharmacieId}`, { params })
}

const uploadOrdonnance = (pharmacieId, file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return callerService.Axios.post(`${callerService.API_URL}ordonnances/upload`, formData, {
    params: { pharmacieId },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteOrdonnance = (id) => {
  return callerService.Axios.patch(`${callerService.API_URL}ordonnances/${id}/delete`)
}

const updateOrdonnanceStatus = (id, etat) => {
  return callerService.Axios.patch(`${callerService.API_URL}ordonnances/${id}/status`, { etat })
}

export const OrdonnanceServices = {
  getAllOrdonnances,
  getOrdonnanceById,
  getOrdonnancesByUtilisateur,
  getAllOrdonnancesByUtilisateur,
  getOrdonnancesByPharmacie,
  getAllOrdonnancesByPharmacie,
  uploadOrdonnance,
  deleteOrdonnance,
  updateOrdonnanceStatus
}