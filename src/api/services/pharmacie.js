// src/api/services/pharmacie.js
import { callerService } from './caller_service'

// ============= PHARMACIES =============
const addPharmacies = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/pharmacies`, data)
}

const addPharmaciesConfirmationIdenity = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/notifications/confirmation/confirm-identity`, data)
}

const resetPaswword = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/security/reset-password`, data)
}

const getPharmaciesList = () => {
  return callerService.Axios.get(`${callerService.API_URL}v3/pharmacies`)
}

const getPharmaciesById = (uuid) => {
  return callerService.Axios.get(`${callerService.API_URL}v3/pharmacies/read/${uuid}`)
}

const updatePharmacies = (uuid, data) => {
   return callerService.Axios.put(`${callerService.API_URL}v3/pharmacies/update/${uuid}?id=${uuid}`, data)
}

const deletePharmacies = (uuid) => {
  return callerService.Axios.delete(`${callerService.API_URL}v3/pharmacies/delete/${uuid}`)
}

export const PharmaciesService = {
  // Pharmacie
  addPharmacies,
  getPharmaciesList,
  getPharmaciesById,
  updatePharmacies,
  deletePharmacies,
  addPharmaciesConfirmationIdenity,
  resetPaswword
}