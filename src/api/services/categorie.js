// src/api/services/categorie.js
import { callerService } from './caller_service'

const getCategories = () => {
  return callerService.Axios.get(`api/v1/categories`) //${callerService.API_URL}
}

const getCategorieById = (id) => {
  return callerService.Axios.get(`api/v1/categories/${id}`)
}

const addCategorie = (data) => {
  return callerService.Axios.post(`api/v1/categories`, data)
}

const updateCategorie = (id, data) => {
  return callerService.Axios.put(`api/v1/categories/${id}`, data)
}

const deleteCategorie = (id) => {
  return callerService.Axios.delete(`api/v1/categories/${id}`)
}

const importCategoriesCsv = (formData) => {
  return callerService.Axios.post(`api/v1/categories/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const ProduitsCategorieServices = {
  getCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
  importCategoriesCsv,
}
