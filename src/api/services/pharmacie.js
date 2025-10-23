// src/api/services/pharmacie.js
import { callerService } from './caller_service'

const addPharmacies = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}pharmacies`, data)
}

const addPharmaciesConfirmationIdenity = (data) => {
  return callerService.Axios.post(
    `${callerService.API_URL}notifications/confirmation/confirm-identity`,
    data,
  )
}

const resetPaswword = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}security/reset-password`, data)
}

const importPharmaciesCsv = (formData) => {
  return callerService.Axios.post(
    `${callerService.API_URL}pharmacies/import-large-csv-file`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
}

const getPharmaciesList = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}pharmacies`, { params })
}

const getSugestPharmaciesList = () => {
  return callerService.Axios.get(`${callerService.API_URL}pharmacies/suggest`)
}

// ✅ NOUVEAU: Recherche par mot-clé
const searchPharmaciesByKeyword = (keyword) => {
  return callerService.Axios.get(`${callerService.API_URL}pharmacies/search-keyword`, {
    params: { keyword },
  })
}

const getPharmaciesById = (uuid, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}pharmacies/${uuid}`, { params })
}

const updatePharmacies = (uuid, data) => {
  return callerService.Axios.put(`${callerService.API_URL}pharmacies/${uuid}`, data)
}

const deletePharmacies = (uuid) => {
  return callerService.Axios.delete(`${callerService.API_URL}pharmacies/${uuid}`)
}

export const PharmaciesService = {
  addPharmacies,
  getPharmaciesList,
  getSugestPharmaciesList,
  searchPharmaciesByKeyword, // ✅ NOUVEAU
  getPharmaciesById,
  updatePharmacies,
  deletePharmacies,
  addPharmaciesConfirmationIdenity,
  resetPaswword,
  importPharmaciesCsv,
}
