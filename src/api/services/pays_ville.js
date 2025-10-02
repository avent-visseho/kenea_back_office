// src/api/services/pays_ville.js
import { callerService } from './caller_service'

// ============= PAYS =============
const addPays = (data) => {
  // ✅ CORRECTION: Utilisation correcte des template literals avec backticks
  return callerService.Axios.post(`${callerService.API_URL}v3/pays`, data)
}

const getPaysList = () => {
  return callerService.Axios.get(`${callerService.API_URL}v3/pays/all/all`)
}

const getPaysById = (id) => {
  // ✅ CORRECTION: v3/pays/read/${id} était mal formaté
  return callerService.Axios.get(`${callerService.API_URL}v3/pays/read/${id}`)
}

const updatePays = (id, data) => {
  // ✅ CORRECTION: v3/pays/update/${id} était mal formaté
   return callerService.Axios.put(`${callerService.API_URL}v3/pays/update/${id}?id=${id}`, data)
}

const deletePays = (id) => {
  // ✅ CORRECTION: v3/pays/delete/${id} était mal formaté
  return callerService.Axios.delete(`${callerService.API_URL}v3/pays/delete/${id}`)
}


// ============= CITIES =============
const addCities = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/cities`, data)
}

const getCitiesList = () => {
  return callerService.Axios.get(`${callerService.API_URL}v3/cities`)
}

const getCitiesById = (id) => {
  // ✅ CORRECTION: v3/cities/${id} était mal formaté
  return callerService.Axios.get(`${callerService.API_URL}v3/cities/${id}`)
}

const updateCities = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}v3/cities/${id}`, data)
}

const deleteCities = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}v3/cities/${id}`)
}

export const PaysVilleService = {
  // Pays
  addPays,
  getPaysList,
  getPaysById,
  updatePays,
  deletePays,

  // Cities
  addCities,
  getCitiesList,
  getCitiesById,
  updateCities,
  deleteCities,
}