// src/api/services/ordonnance.js
import { callerService } from './caller_service'

const getAllOrdonnances = (params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/all`, { params })
}

const getOrdonnanceById = (id, params = {}) => {
  return callerService.Axios.get(`${callerService.API_URL}ordonnances/read/${id}`, { params })
}


/* const uploadOrdonnance = (pharmacieId, file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return callerService.Axios.post(`${callerService.API_URL}ordonnances/upload`, formData, {
    params: { pharmacieId },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
} */

  // src/api/ordonnance.js

const uploadOrdonnance = (pharmacieId, file) => {
  const formData = new FormData();

  // Le backend attend un champ 'dto' en JSON string
  const dto = { pharmacieId };
  formData.append('dto', JSON.stringify(dto));

  // Ajout du fichier
  formData.append('file', file);

  // Envoi vers l’API
  return callerService.Axios.post(
    `${callerService.API_URL}ordonnances/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Si ton callerService n’ajoute pas automatiquement le token :
        // 'Authorization': `Bearer ${store.token}`,
      },
    }
  );
};

export { uploadOrdonnance };


const deleteOrdonnance = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}ordonnances/delete/${id}`)
}



export const OrdonnanceServices = {
  getAllOrdonnances,
  getOrdonnanceById,
  uploadOrdonnance,
  deleteOrdonnance,
}