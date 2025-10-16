import { callerService } from './caller_service'

const getAllGroupes = () => {
  return callerService.Axios.get(`${callerService.API_URL}groupes`)
}

const createGroupe = (nom) => {
  return callerService.Axios.post(`${callerService.API_URL}groupes`, { nom })
}

const deleteGroupe = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}groupes/${id}`)
}

const getSousGroupesByGroupe = (groupeId) => {
  return callerService.Axios.get(`${callerService.API_URL}groupes/${groupeId}/sous-groupes`)
}

const createSousGroupe = (groupeId, nom) => {
  return callerService.Axios.post(
    `${callerService.API_URL}groupes/${groupeId}/sous-groupes`,
    { nom }
  )
}

const deleteSousGroupe = (sousGroupeId) => {
  return callerService.Axios.delete(`${callerService.API_URL}groupes/sous-groupes/${sousGroupeId}`)
}

export const GroupesServices = {
  getAllGroupes,
  createGroupe,
  deleteGroupe,
  getSousGroupesByGroupe,
  createSousGroupe,
  deleteSousGroupe
}