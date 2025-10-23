import { callerService } from './caller_service'
import { paymentcallerService } from './payement_caller_service'

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

const payServiceCarteGrise = (data) => {
  return paymentcallerService.Axios.post(
    // ✅ URL correcte (comme dans votre curl)
    paymentcallerService.PAYMENT_API_URL + "v1/fedapay/transactions/mtn_open",
    // ✅ Data dans le body (pas dans l'URL)
    data,
    // ✅ Headers correctement placés
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46YWRtaW4=",
      },
    }
  );
};

export const InboxServices = {
  getInboxAll,
  getInboxByPharmacie,
  getInboxByClient,
  getInboxGlobal,
  payServiceCarteGrise
}