import { callerService } from './caller_service'
import { paymentcallerService } from './payement_caller_service'

const getInboxAll = (deleted = false) => {
  return callerService.Axios.get(`${callerService.API_URL}inbox`, { params: { deleted } })
}

const getInboxByPharmacie = (pharmacieId) => {
  return callerService.Axios.get(`${callerService.API_URL}inbox/pharmacie/${pharmacieId}`)
}

// ✅ NOUVEAU : Endpoint avec détails de progression
const getInboxByClientWithDetails = (clientId) => {
  return callerService.Axios.get(
    `${callerService.API_URL}inbox/client/${clientId}/progression-detail`,
  )
}

const getInboxByClient = (clientId) => {
  return callerService.Axios.get(`${callerService.API_URL}inbox/client/${clientId}`)
}

const getInboxGlobal = () => {
  return callerService.Axios.get(`${callerService.API_URL}inbox/all`)
}

const payServiceCarteGrise = (data) => {
  return paymentcallerService.Axios.post(
    paymentcallerService.PAYMENT_API_URL + 'v1/fedapay/transactions/mtn_open',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    },
  )
}

export const InboxServices = {
  getInboxAll,
  getInboxByPharmacie,
  getInboxByClient,
  getInboxByClientWithDetails, // ✅ NOUVEAU
  getInboxGlobal,
  payServiceCarteGrise,
}
