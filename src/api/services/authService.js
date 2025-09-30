// src/api/services/authService.js
import apiClient from '../axios'

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/authenticate', credentials)
    console.log('Raw login response:', response) // Debugging
    return response // Retourner la réponse complète
  } catch (error) {
    console.error('Login error:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la connexion')
  }
}

export const verifyOtp = async ({ username, otp }) => {
  try {
    const response = await apiClient.post('/authenticate', {
      username,
      otp,
    })
    console.log('Raw OTP response:', response) // Debugging
    return response
  } catch (error) {
    console.error('OTP error:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la vérification OTP')
  }
}

export const resendOtp = async (username) => {
  try {
    const response = await apiClient.post('/resend-otp', { username })
    console.log('Raw resend OTP response:', response) // Debugging
    return response
  } catch (error) {
    console.error('Resend OTP error:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors du renvoi du code OTP')
  }
}

export const logout = async () => {
  try {
    const response = await apiClient.post('/logout')
    console.log('Raw logout response:', response) // Debugging
    return response
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error(error.response?.data?.message || 'Erreur lors de la déconnexion')
  }
}
