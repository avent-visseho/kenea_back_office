// src/api/services/caller_service.js
import axios from 'axios'
import router from '@/router'

// ✅ CORRECTION: Utilisation de import.meta.env au lieu de VITE_API_BASE_URL directement
const API_HOST_SERVEUR = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_HOST_SERVEUR.replace(/\/$/, '')}/kenea/api/`

const Axios = axios.create({
  baseURL: API_HOST_SERVEUR,
  timeout: import.meta.env.VITE_API_TIMEOUT || 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur de requête - ajouter le token automatiquement
Axios.interceptors.request.use((request) => {
  const raw = localStorage.getItem('auth_data')
  if (!raw) return request

  try {
    const parsed = JSON.parse(raw)
    const token =
      parsed.tokens?.access_token ||
      parsed.access_token ||
      parsed.token ||
      parsed.data?.token ||
      parsed.data?.jwt ||
      null

    const type =
      parsed.tokens?.token_type || parsed.token_type || parsed.data?.token_type || 'Bearer'

    if (token) {
      request.headers.Authorization = `${type} ${token}`
      console.log('✅ Token attached:', request.headers.Authorization)
    } else {
      console.warn('⚠️ Aucun token trouvé dans auth_data')
    }
  } catch (err) {
    console.error('Erreur parsing auth_data:', err)
  }

  return request
})

// Intercepteur de réponse - gérer les erreurs d'authentification
Axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Si erreur 401 et que ce n'est pas déjà une tentative de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Nettoyer l'authentification et rediriger vers login
      localStorage.removeItem('auth_data')
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

// Fonctions utilitaires
const getToken = () => {
  const authData = localStorage.getItem('auth_data')
  if (authData) {
    try {
      const parsed = JSON.parse(authData)
      if (parsed.tokens?.access_token && parsed.tokens?.token_type) {
        // ✅ CORRECTION: Utilisation correcte des backticks
        return `${parsed.tokens.token_type} ${parsed.tokens.access_token}`
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du token:', error)
    }
  }
  return null
}

const revokeJwtFromLocalStorage = () => {
  localStorage.removeItem('auth_data')
}

const postResource = (resourceData, resourcePath) => {
  return Axios.post(resourcePath, resourceData)
}

const postResourceWithFormData = (resourceData, resourcePath) => {
  return Axios.post(resourcePath, resourceData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const callerService = {
  Axios,
  API_HOST_SERVEUR,
  API_URL,
  revokeJwtFromLocalStorage,
  postResource,
  getToken,
  postResourceWithFormData,
}
