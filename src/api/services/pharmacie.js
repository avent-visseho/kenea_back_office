// src/api/services/pharmacie.js
import { callerService } from './caller_service'

const addPharmacies = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/pharmacies`, data)
}

const addPharmaciesConfirmationIdenity = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/notifications/confirmation/confirm-identity`, data)
}

const resetPaswword = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/security/reset-password`, data)
}

// ✅ NOUVEAU: Import CSV avec ville_id
const importPharmaciesCsv = (formData, villeId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}v3/pharmacies/import/${villeId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  )
}


const getPharmaciesList = () => {
  return callerService.Axios.get(`${callerService.API_URL}v3/pharmacies`)
}

const getPharmaciesById = (uuid) => {
  return callerService.Axios.get(`${callerService.API_URL}v3/pharmacies/${uuid}`)
}


const updatePharmacies = (uuid, data) => {
  return callerService.Axios.put(`${callerService.API_URL}v3/pharmacies/${uuid}`, data)
}


const deletePharmacies = (uuid) => {
  return callerService.Axios.delete(`${callerService.API_URL}v3/pharmacies/${uuid}`)
}

export const PharmaciesService = {
  addPharmacies,
  getPharmaciesList,
  getPharmaciesById,
  updatePharmacies,
  deletePharmacies,
  addPharmaciesConfirmationIdenity,
  resetPaswword,
  importPharmaciesCsv,  // ✅ NOUVEAU
}