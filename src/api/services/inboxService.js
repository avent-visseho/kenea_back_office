import { callerService } from './caller_service'

const getInboxAll = (deleted = false) => {
  return callerService.Axios.get(
    `${callerService.API_URL}inbox`,
    { params: { deleted } }
  )
}

const getInboxByPharmacie = (pharmacieId) => {
  return callerService.Axios.get(
    `${callerService.API_URL}inbox/pharmacie/${pharmacieId}`
  )
}

const getInboxByClient = (clientId) => {
  return callerService.Axios.get(
    `${callerService.API_URL}inbox/client/${clientId}`
  )
}

const getInboxGlobal = () => {
  return callerService.Axios.get(
    `${callerService.API_URL}inbox/all`
  )
}

export const InboxServices = {
  getInboxAll,
  getInboxByPharmacie,
  getInboxByClient,
  getInboxGlobal
}