// src/composables/useAuth.js
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { login } from '@/api/services/authService'
import { useRouter } from 'vue-router'
import apiClient from '@/api/axios'

export function useAuth() {
  const isLoading = ref(false)
  const error = ref(null)
  const successMessage = ref(null)
  const router = useRouter()
  const userStore = useUserStore()

  const signIn = async (credentials) => {
    isLoading.value = true
    error.value = null
    successMessage.value = null
    try {
      if (credentials.otp) {
        // Vérification OTP
        const storedUsername = userStore.otp
        if (!storedUsername) {
          throw new Error('Username non trouvé. Veuillez vous reconnecter.')
        }
        console.log('OTP payload:', { username: storedUsername, otp: credentials.otp })
        const response = await apiClient.post('/verify', {
          username: storedUsername,
          otp: credentials.otp,
        })
        console.log('OTP response:', response)
        const { token, user } = response.data.body
        const storage = credentials.keepLoggedIn ? localStorage : sessionStorage
        storage.setItem('auth_token', token)
        userStore.setUser(user)
        userStore.setotp(null)
        router.push('/dashboard')
      } else {
        // Connexion initiale
        console.log('Login payload:', credentials)
        const response = await login(credentials)
        console.log('Login response:', response)
        // Vérifier si la réponse est valide
        if (!response || !response.data) {
          throw new Error("Réponse de l'API non valide ou vide")
        }
        // Vérifier si body est une chaîne
        if (typeof response.data.body === 'string') {
          userStore.setotp(credentials.username)
          successMessage.value = response.data.body
          router.push('/verify-otp')
        } else {
          throw new Error("Réponse inattendue de l'API lors de la connexion")
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      error.value = err.response?.data?.message || err.message || 'Erreur lors de la connexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signOut = async () => {
    isLoading.value = true
    error.value = null
    try {
      await apiClient.post('/logout')
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
      userStore.clearUser()
      router.push('/signin')
    } catch (err) {
      console.error('Logout error:', err)
      error.value = err.response?.data?.message || 'Erreur lors de la déconnexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resendCode = async () => {
    isLoading.value = true
    error.value = null
    try {
      const storedUsername = userStore.otp
      if (!storedUsername) {
        throw new Error('Username non trouvé. Veuillez vous reconnecter.')
      }
      await apiClient.post('/resend-otp', {
        username: storedUsername,
      })
      successMessage.value = 'Code renvoyé avec succès'
    } catch (err) {
      console.error('Resend OTP error:', err)
      error.value = err.response?.data?.message || 'Erreur lors du renvoi du code'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return { signIn, signOut, resendCode, isLoading, error, successMessage }
}
