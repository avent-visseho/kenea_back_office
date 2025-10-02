// src/api/axios.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Intercepteur pour inclure le token dans les requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage ou sessionStorage
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    
    console.log('📤 Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
    })

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.error('❌ Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })

    // Gérer les erreurs 401 (non autorisé)
    if (error.response?.status === 401) {
      // Nettoyer le token
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_data')
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_data')

      // Rediriger vers la page de connexion (sauf si déjà dessus)
      if (window.location.pathname !== '/signin' && window.location.pathname !== '/verify-otp') {
        window.location.href = '/signin'
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient