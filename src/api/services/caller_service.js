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

// Flag pour éviter les déconnexions multiples
let isHandlingAuthError = false

// Intercepteur de réponse - Gestion des erreurs d'authentification
Axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Gestion des erreurs 401 (Token invalide ou expiré)
    if (error.response?.status === 401 && !isHandlingAuthError) {
      console.error('❌ Erreur d\'authentification - Token invalide ou expiré:', {
        status: error.response?.status,
        url: originalRequest?.url,
        method: originalRequest?.method,
        message: error.response?.data?.message,
      })

      // Marquer qu'on est en train de gérer l'erreur
      isHandlingAuthError = true

      // Déconnexion automatique et redirection
      await handleAuthenticationError()

      // Réinitialiser le flag après un délai
      setTimeout(() => {
        isHandlingAuthError = false
      }, 2000)
    }

    // Gestion des erreurs 403 (Accès refusé - permissions insuffisantes)
    if (error.response?.status === 403) {
      console.warn('⚠️ Accès refusé - Permissions insuffisantes:', {
        url: originalRequest?.url,
        method: originalRequest?.method,
      })
      // On ne déconnecte pas l'utilisateur, juste un message d'erreur dans les composants
    }

    // Rejeter l'erreur pour que le composant puisse la gérer
    return Promise.reject(error)
  },
)

// Fonction pour gérer les erreurs d'authentification
async function handleAuthenticationError() {
  try {
    // Dynamiquement importer le store auth et le toast pour éviter les dépendances circulaires
    const { useAuthStore } = await import('@/store/auth/auth')
    const { useToast } = await import('@/composables/useToast')

    const authStore = useAuthStore()
    const toast = useToast()

    // Afficher un message d'erreur
    toast.error('Votre session a expiré. Veuillez vous reconnecter.')

    // Déconnecter l'utilisateur
    await authStore.logout()

    // Petit délai pour que l'utilisateur voie le toast
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Rediriger vers la page de connexion
    if (router.currentRoute.value.path !== '/signin') {
      router.push('/signin')
    }

    console.log('✅ Utilisateur déconnecté et redirigé vers la page de connexion')
  } catch (error) {
    console.error('❌ Erreur lors de la gestion de l\'erreur d\'authentification:', error)

    // Fallback : nettoyage manuel et redirection
    localStorage.removeItem('auth_data')
    localStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_data')
    sessionStorage.removeItem('auth_token')

    // Petit délai avant la redirection
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (router.currentRoute.value.path !== '/signin') {
      router.push('/signin')
    }
  }
}

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
