// src/api/services/authService.js
import apiClient from '../axios'

const API_BASE = '/kenea/api/v3/security'

// ✅ Connexion initiale (envoie email/phone + password)
export const login = async (credentials) => {
  try {
    const response = await apiClient.post(`${API_BASE}/login`, {
      username: credentials.username,
      password: credentials.password,
    })
    console.log('Login response:', response.data)
    return response.data
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message)
    throw error
  }
}

// ✅ Vérification OTP - Attention à l'URL!
export const verifyOtp = async ({ username, otp }) => {
  try {
    // L'URL selon votre swagger: /verify/{code}/{username}
    const response = await apiClient.post(
      `${API_BASE}/verify/${otp}/${encodeURIComponent(username)}`,
      {} // Body vide selon votre curl
    )
    console.log('OTP verification response:', response.data)
    return response.data
  } catch (error) {
    console.error('OTP verification error:', error.response?.data || error.message)
    throw error
  }
}

// ✅ Renvoyer OTP
export const resendOtp = async (username) => {
  try {
    const response = await apiClient.post('/kenea/api/v3/send-otp', {
      username,
    })
    console.log('Resend OTP response:', response.data)
    return response.data
  } catch (error) {
    console.error('Resend OTP error:', error.response?.data || error.message)
    throw error
  }
}

// ✅ Récupérer les infos utilisateur
export const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/kenea/api/v3/users/me')
    /* console.log('User info response:', response.data) */
    return response.data
  } catch (error) {
    console.error('Get user info error:', error.response?.data || error.message)
    throw error
  }
}

// ✅ Déconnexion
export const logout = async () => {
  try {
    const response = await apiClient.post('/kenea/api/logout')
    console.log('Logout response:', response.data)
    return response.data
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message)
    throw error
  }
}