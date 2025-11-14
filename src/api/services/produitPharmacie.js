// src/api/services/produitPharmacie.js
import { callerService } from './caller_service'

const getAllOrdonnances = (pharmacieId) => {
  return callerService.Axios.get(`${callerService.API_URL}produits-pharmacie/export/{pharmacieId}`) 
}



export const ProduitPharmacieServices = {

}

