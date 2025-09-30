// src/api/axios.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Intercepteur pour inclure le token dans les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    console.log('Request:', config) // Debugging
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error) // Debugging
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response) // Debugging
    return response
  },
  (error) => {
    console.error('Response error:', error) // Debugging
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin'
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
