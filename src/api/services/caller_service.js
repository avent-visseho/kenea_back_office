// src/api/services/caller_service.js
import axios from 'axios'
import router from '@/router'

const API_HOST_SERVEUR = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_HOST_SERVEUR.replace(/\/$/, '')}/kenea/api/v3/`

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

// ✅ INTERCEPTEUR CORRIGÉ - Ne déconnecte plus automatiquement
Axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // ✅ Si erreur 401, juste notifier sans déconnecter
    if (error.response?.status === 401) {
      console.error('❌ Erreur 401 - Non autorisé:', {
        url: originalRequest?.url,
        method: originalRequest?.method,
      })

      // ✅ Afficher une alerte au lieu de déconnecter
      if (window.alert) {
        alert(`⚠️ Erreur d'autorisation (401)\n\nVous n'avez pas les permissions nécessaires pour cette action.\n\nURL: ${originalRequest?.url}`)
      }

      // ✅ Option alternative : Utiliser un toast/notification si vous avez une lib
      // Si vous utilisez une bibliothèque de notification (comme vue-toastification),
      // décommentez et adaptez cette ligne :
      // toast.error('Erreur d\'autorisation. Vérifiez vos permissions.', { duration: 5000 })
    }

    // ✅ Rejeter l'erreur pour que le composant puisse la gérer
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