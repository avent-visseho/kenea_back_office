//src/api/services/api.js
import { callerService } from './caller_service'

const API_HOST = callerService.API_HOST_SERVEUR

export const API_URL = API_HOST + '/kenea/api/'

const deleteResource = (resourcePath) => {
  return callerService.Axios.delete(resourcePath)
}

const restorResource = (resourcePath) => {
  return callerService.Axios.put(resourcePath)
}

const putResource = (resourceData, resourcePath) => {
  return callerService.Axios.put(resourcePath, resourceData)
}

const patchResource = (resourceData, resourcePath) => {
  return callerService.Axios.patch(resourcePath, resourceData)
}

const postResource = (resourceData, resourcePath) => {
  return callerService.Axios.post(resourcePath, resourceData)
}

const getResource = (resourcePath) => {
  return callerService.Axios.get(resourcePath)
}

const postResourceWithFormData = (resourceData, resourcePath) => {
  return callerService.Axios.post(resourcePath, resourceData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const payementpostResource = (resourceData, resourcePath) => {
  return paymentcallerService.Axios.post(resourcePath, resourceData)
}

export const apiService = {
  API_URL,
  API_HOST,
  deleteResource,
  restorResource,
  postResource,
  putResource,
  patchResource,
  getResource,
  postResourceWithFormData,
  payementpostResource,
}