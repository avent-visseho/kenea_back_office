// src/composables/useAuth.js
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const isLoading = ref(false)
  const error = ref(null)
  const successMessage = ref(null)
  const router = useRouter()
  const authStore = useAuthStore()
  
  // ✅ NOUVEAU: Stocker le username pour l'OTP
  const pendingUsername = ref(null)

  // ✅ AMÉLIORATION: Connexion initiale (email/phone + password)
  const signIn = async (credentials) => {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    try {
      // Si c'est une vérification OTP
      if (credentials.otp) {
        const username = pendingUsername.value || credentials.username
        
        if (!username) {
          throw new Error('Username non trouvé. Veuillez vous reconnecter.')
        }

        const result = await authStore.verifyOtp(username, credentials.otp)
        
        if (result.success) {
          // Stocker keepLoggedIn si nécessaire
          if (credentials.keepLoggedIn) {
            localStorage.setItem('keepLoggedIn', 'true')
          } else {
            localStorage.removeItem('keepLoggedIn')
          }
          
          pendingUsername.value = null
          router.push('/dashboard')
          return result
        } else {
          error.value = result.error
          throw new Error(result.error)
        }
      } 
      // Sinon, c'est une connexion initiale
      else {
        const result = await authStore.login({
          username: credentials.username,
          password: credentials.password,
        })

        if (result.success) {
          // Si OTP requis
          if (result.requiresOtp) {
            pendingUsername.value = credentials.username
            successMessage.value = result.message || 'Un code de vérification a été envoyé'
            router.push('/verify-otp')
          } 
          // Sinon connexion directe
          else {
            if (credentials.keepLoggedIn) {
              localStorage.setItem('keepLoggedIn', 'true')
            }
            router.push('/dashboard')
          }
          return result
        } else {
          error.value = result.error
          throw new Error(result.error)
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      error.value = err.message || 'Erreur lors de la connexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // ✅ AMÉLIORATION: Déconnexion
  const signOut = async () => {
    isLoading.value = true
    error.value = null

    try {
      await authStore.logout()
      localStorage.removeItem('keepLoggedIn')
      router.push('/signin')
    } catch (err) {
      console.error('Logout error:', err)
      error.value = err.message || 'Erreur lors de la déconnexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // ✅ AMÉLIORATION: Renvoyer le code OTP
  const resendCode = async () => {
    isLoading.value = true
    error.value = null
    successMessage.value = null

    try {
      const username = pendingUsername.value
      
      if (!username) {
        throw new Error('Username non trouvé. Veuillez vous reconnecter.')
      }

      const result = await authStore.resendOtp(username)
      
      if (result.success) {
        successMessage.value = result.message || 'Code renvoyé avec succès'
        return result
      } else {
        error.value = result.error
        throw new Error(result.error)
      }
    } catch (err) {
      console.error('Resend OTP error:', err)
      error.value = err.message || 'Erreur lors du renvoi du code'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    signIn,
    signOut,
    resendCode,
    isLoading,
    error,
    successMessage,
    pendingUsername,
  }
}