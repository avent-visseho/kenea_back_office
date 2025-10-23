/** Import des module axios */
import axios from "axios";

const PAYMENT_API_HOST_SERVEUR = "http://10.10.10.177:5050";
/* const PAYMENT_API_HOST_SERVEUR = "http://10.231.61.5:8080"; */
const PAYMENT_API_URL = PAYMENT_API_HOST_SERVEUR + "/api/";

const Axios = axios.create({
  baseURL: PAYMENT_API_HOST_SERVEUR,
});

Axios.interceptors.request.use((request) => {
  return request;
});

Axios.interceptors.response.use(function (response) {
  return response;
});

const revokeJwtFromLocalStorage = () => {
  store.dispatch("logoutRevokeJwtToken");
};

const gettoken = () => {
  return store.getters.bearerToken;
};

const payementpostResource = (resourceData, resourcePath) => {
  return paymentcallerService.Axios.post(resourcePath, resourceData);
};

const payementpostResourceWithFormDataManual = (resourceData, resourcePath) => {
  return paymentcallerService.Axios.post(resourcePath, resourceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46YWRtaW4=",
    },
  });
};

export const paymentcallerService = {
  Axios,
  PAYMENT_API_HOST_SERVEUR,
  PAYMENT_API_URL,
  revokeJwtFromLocalStorage,
  payementpostResource,
  gettoken,
  payementpostResourceWithFormDataManual,
};
