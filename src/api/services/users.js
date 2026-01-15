// src/api/services/users.js

import { callerService } from './caller_service'

const getUsers = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}users/boolean`, { params })
}

const getUserById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}users/${id}`, { params })
}

const getUsersByCityID = (cityId, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}users/city/${cityId}`, { params })
}

const updateCoordonnees = (id, latitude, longitude, altitude) => {
  return callerService.Axios.patch(
    `${callerService.API_URL}users/${id}/update-coordonnees`,
    null,
    {
      params: { latitude, longitude, altitude }
    }
  )
}

const assignRole = (userId, roleIds) => {
  // roleIds doit être un tableau d'IDs de rôles
  return callerService.Axios.post(
    `${callerService.API_URL}users/add-roles/${userId}`,
    roleIds
  )
}

const removeRole = (userId, roleId) => {
  return callerService.Axios.delete(
    `${callerService.API_URL}users/${userId}/remove-roles/${roleId}`
  )
}


const assignEntity = (payload) => {
  return callerService.Axios.post(
    `${callerService.API_URL}users/assignations/v2`,
    payload
  )
}

const updateUser = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}users/${id}`, data)
}

const deleteUser = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}users/${id}`)
}

const updateSalaire = (id, salaire) => {
  return callerService.Axios.patch(
    `${callerService.API_URL}users/${id}/salaire`,
    null,
    {
      params: { salaire }
    }
  )
}

export const UsersServices = {
  getUsers,
  assignRole,
  removeRole,
  assignEntity,
  getUserById,
  getUsersByCityID,
  updateCoordonnees,
  updateUser,
  deleteUser,
  updateSalaire,
}