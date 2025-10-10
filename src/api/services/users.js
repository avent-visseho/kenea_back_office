// src/api/services/users.js
import { callerService } from './caller_service'

const getUsers = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}v3/users`, { params })
}

const getUserById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}v3/users/${id}`, { params })
}

const getUsersByCityID = (cityId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}v3/users/city/${cityId}`, { params })
}

const updateCoordonnees = (id, latitude, longitude, altitude) => {
  return callerService.Axios.patch(
    `${callerService.API_URL}v3/users/${id}/update-coordonnees`,
    null,
    {
      params: { latitude, longitude, altitude }
    }
  )
}

const updateUser = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}v3/users/${id}`, data)
}

const deleteUser = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}v3/users/${id}`)
}

/* const importUsersCsv = (formData) => {
  return callerService.Axios.post(`${callerService.API_URL}v3/users/import`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
} */

export const UsersServices = {
  getUsers,
  getUserById,
  getUsersByCityID,
  updateCoordonnees,
  updateUser,
  deleteUser,/* 
  importUsersCsv, */
}