import { callerService } from './caller_service'

// ======== PAYS ========
const addPays = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}pays`, data)
}

const importPaysCsv = (formData) => {
  return callerService.Axios.post(`${callerService.API_URL}pays/import/csv`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const getPaysList = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}pays/all`, { params })
}

const getPaysById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}pays/read/${id}`, { params })
}

const updatePays = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}pays/update/${id}?id=${id}`, data) //?id=${id}
}

const deletePays = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}pays/delete/${id}`)
}

// ======== VILLES ========
const addCities = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}cities`, data)
}

const importCitiesCsv = (formData, paysId) => {
  return callerService.Axios.post(`${callerService.API_URL}cities/import/${paysId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const getCitiesList = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}cities`, { params })
}

const getCitiesById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}cities/${id}`, { params })
}

const updateCities = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}cities/${id}`, data)
}

const deleteCities = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}cities/${id}`)
}

// ======== Regions ========
const addRegions = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}regions`, data)
}

const importRegionsCsv = (formData, paysId) => {
  return callerService.Axios.post(`${callerService.API_URL}regions/import/${paysId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const getRegionsList = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}regions`, { params })
}

const getRegionsById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}regions/${id}`, { params })
}

const updateRegions = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}regions/${id}`, data)
}

const deleteRegions = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}regions/${id}`)
}

export const PaysVilleService = {
  // Pays
  addPays,
  importPaysCsv,
  getPaysList,
  getPaysById,
  updatePays,
  deletePays,

  // Villes
  addCities,
  importCitiesCsv,
  getCitiesList,
  getCitiesById,
  updateCities,
  deleteCities,

  // Regions
  addRegions,
  importRegionsCsv,
  getRegionsList,
  getRegionsById,
  updateRegions,
  deleteRegions,
}
