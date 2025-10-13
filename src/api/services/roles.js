// src/api/services/roles.js
import { callerService } from './caller_service'

const getRoles = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}roles`, { params })
}

const getRoleById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}roles/${id}`, { params })
}

const createRole = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}roles`, data)
}

const updateRole = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}roles/${id}`, data)
}

const deleteRole = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}roles/${id}`)
}

export const RolesServices = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
}