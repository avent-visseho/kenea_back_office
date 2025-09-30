// src/api/services/authService.js
import { callerService } from './caller_service'

// ✅ Connexion initiale (envoie email/phone + password)
export const login = async (credentials) => {
  try {
    const response = await callerService.Axios.post(
      `${callerService.API_URL}authenticate`,
      credentials
    )
    console.log('Raw login response:', response)
    return response
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// ✅ Vérification OTP
export const verifyOtp = async ({ username, otp }) => {
  try {
    const response = await callerService.Axios.post(
      `${callerService.API_URL}verify`,
      {
        username,
        otp,
      }
    )
    console.log('Raw OTP response:', response)
    return response
  } catch (error) {
    console.error('OTP error:', error)
    throw error
  }
}

// ✅ Renvoyer OTP
export const resendOtp = async (username) => {
  try {
    const response = await callerService.Axios.post(
      `${callerService.API_URL}resend-otp`,
      { username }
    )
    console.log('Raw resend OTP response:', response)
    return response
  } catch (error) {
    console.error('Resend OTP error:', error)
    throw error
  }
}

// ✅ Déconnexion
export const logout = async () => {
  try {
    const response = await callerService.Axios.post(`${callerService.API_URL}logout`)
    console.log('Raw logout response:', response)
    return response
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// ✅ Récupérer les infos utilisateur
export const getUserInfo = async () => {
  try {
    const response = await callerService.Axios.get(`${callerService.API_URL}v1/auth/me`)
    console.log('Raw user info response:', response)
    return response
  } catch (error) {
    console.error('Get user info error:', error)
    throw error
  }
}