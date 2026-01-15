import { callerService } from './caller_service'

// ===== Gestion des Groupes =====
const getAllGroupes = () => {
  return callerService.Axios.get(`${callerService.API_URL}groupes`)
}

const getGroupeById = (groupeId) => {
  return callerService.Axios.get(`${callerService.API_URL}groupes/${groupeId}`)
}

const getMyGroup = () => {
  return callerService.Axios.get(`${callerService.API_URL}groupes/my-group`)
}

const createGroupe = (nom) => {
  return callerService.Axios.post(`${callerService.API_URL}groupes`, { nom })
}

const updateGroupe = (groupeId, nom) => {
  return callerService.Axios.put(`${callerService.API_URL}groupes/${groupeId}`, { nom })
}

const deleteGroupe = (id) => {
  return callerService.Axios.delete(`${callerService.API_URL}groupes/${id}`)
}

// ===== Gestion des Sous-Groupes =====
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

// ===== Gestion des Membres =====
const getGroupesWithMembersProfile = () => {
  return callerService.Axios.get(`${callerService.API_URL}groupes/with-members-profile`)
}

const addMemberToGroupe = (groupeId, userId, role = 'MEMBER') => {
  return callerService.Axios.post(
    `${callerService.API_URL}groupes/${groupeId}/members`,
    { userId, role }
  )
}

const removeMemberFromGroupe = (groupeId, userId) => {
  return callerService.Axios.delete(
    `${callerService.API_URL}groupes/${groupeId}/members/${userId}`
  )
}

const promoteMember = (groupeId, userId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}groupes/${groupeId}/members/${userId}/promote`
  )
}

const demoteMember = (groupeId, userId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}groupes/${groupeId}/members/${userId}/demote`
  )
}

// ===== Gestion du Budget =====
const setBudget = (groupeId, budgetData) => {
  return callerService.Axios.put(
    `${callerService.API_URL}groupes/${groupeId}/budget`,
    budgetData
  )
}

// ===== Paiement =====
const payForOrdonnance = (progressId) => {
  return callerService.Axios.post(
    `${callerService.API_URL}groupes/payment/ordonnance/${progressId}`
  )
}

// ===== Rapport financier =====
const getGroupeReport = (groupeId, month, year) => {
  const params = new URLSearchParams()
  if (month) params.append('month', month)
  if (year) params.append('year', year)

  const queryString = params.toString()
  const url = `${callerService.API_URL}groupes/${groupeId}/report${queryString ? `?${queryString}` : ''}`

  return callerService.Axios.get(url)
}

export const GroupesServices = {
  // Groupes
  getAllGroupes,
  getGroupeById,
  getMyGroup,
  createGroupe,
  updateGroupe,
  deleteGroupe,

  // Sous-groupes
  getSousGroupesByGroupe,
  createSousGroupe,
  deleteSousGroupe,

  // Membres
  getGroupesWithMembersProfile,
  addMemberToGroupe,
  removeMemberFromGroupe,
  promoteMember,
  demoteMember,

  // Budget
  setBudget,

  // Rapport
  getGroupeReport,

  // Paiement
  payForOrdonnance
}