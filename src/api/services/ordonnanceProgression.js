//src/api/services/ordonnanceProgression.js

import { callerService } from './caller_service'

const getAllProgressions = (deleted = false) => {
  return callerService.Axios.get(
    `${callerService.API_URL}ordonnance-progressions`,
    { params: { deleted } }
  )
}

const getProgressionById = (id) => {
  return callerService.Axios.get(
    `${callerService.API_URL}ordonnance-progressions/${id}`
  )
}

const getProgressionsByPharmacie = (pharmacieId) => {
  return callerService.Axios.get(
    `${callerService.API_URL}ordonnance-progressions/pharmacie/${pharmacieId}`
  )
}

const deleteProgression = (id) => {
  return callerService.Axios.delete(
    `${callerService.API_URL}ordonnance-progressions/delete/${id}`
  )
}

const restoreProgression = (id) => {
  return callerService.Axios.patch(
    `${callerService.API_URL}ordonnance-progressions/restore/${id}`
  )
}

const updateProgressionStatus = (id, statut) => {
  return callerService.Axios.patch(
    `${callerService.API_URL}ordonnance-progressions/${id}/statut/${statut}`
  )
}

const traiterProgression = (ordonnanceId, items, userId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}ordonnance-progressions/traiter/${ordonnanceId}`,
    items,
    {
      headers: {
        'X-User-Id': userId,
        'Content-Type': 'application/json'
      }
    }
  )
}
/* ordonnance by pharmacie */
const getOrdonnancesByPharmacie = (pharmacieId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}inbox/pharmacie/${pharmacieId}`, { params })
}

export const OrdonnanceProgressionServices = {
  getAllProgressions,
  getProgressionById,
  getProgressionsByPharmacie,
  deleteProgression,
  restoreProgression,
  updateProgressionStatus,
  traiterProgression,
  getOrdonnancesByPharmacie
}