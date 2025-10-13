// src/api/services/privileges.js
import { callerService } from './caller_service'

const getPrivileges = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}privileges`, { params })
}

const getPrivilegeById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}privileges/${id}`, { params })
}

const createPrivilege = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}privileges`, data)
}

const updatePrivilege = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}privileges/${id}`, data)
}

const deletePrivilege = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}privileges/${id}`)
}

const restorePrivilege = (id) => {
  return callerService.Axios.post(`${callerService.API_URL}privileges/restore/${id}`)
}

export const PrivilegesServices = {
  getPrivileges,
  getPrivilegeById,
  createPrivilege,
  updatePrivilege,
  deletePrivilege,
  restorePrivilege,
}