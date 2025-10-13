import { callerService } from './caller_service'

const getCategories = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}categories`, { params })
}

const getCategorieById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}categories/${id}`, { params })
}

const addCategorie = (data) => {
  return callerService.Axios.post(`${callerService.API_URL}categories`, data)
}

const updateCategorie = (id, data) => {
  return callerService.Axios.put(`${callerService.API_URL}categories/${id}`, data)
}

const deleteCategorie = (id) => {
  return callerService.Axios.patch(`${callerService.API_URL}categories/${id}`)
}

const importCategoriesCsv = (formData) => {
  return callerService.Axios.post(`${callerService.API_URL}categories/import`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
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
