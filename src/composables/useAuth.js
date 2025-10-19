// src/composables/useAuth.js
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // ✅ State
  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)
  const successMessage = computed(() => authStore.successMessage)
  const user = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const userRoles = computed(() => authStore.userRoles)

  // ✅ NOUVEAUX: Getters supplémentaires
  const userPerson = computed(() => authStore.userPerson)
  const displayName = computed(() => authStore.displayName)

  // ✅ Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role) => {
    return authStore.hasRole(role)
  }

  // ✅ Vérifier si l'utilisateur a au moins un des rôles
  const hasAnyRole = (...roles) => {
    return roles.some((role) => authStore.hasRole(role))
  }

  // ✅ Vérifier si l'utilisateur a tous les rôles
  const hasAllRoles = (...roles) => {
    return roles.every((role) => authStore.hasRole(role))
  }

  // ✅ Connexion (étape 1: email/phone + password)
  const signIn = async (credentials) => {
    try {
      const result = await authStore.login(credentials)
      if (result.success && result.requiresOtp) {
        await router.push('/verify-otp')
        return result
      }
      if (result.success && !result.requiresOtp) {
        await router.push('/pharmacie')
        return result
      }
      throw new Error(result.error || 'Erreur de connexion')
    } catch (err) {
      console.error('Sign in error:', err)
      throw err
    }
  }

  // ✅ Vérification OTP (étape 2)
  const verifyOtp = async (otp) => {
    try {
      const result = await authStore.verifyOtp(otp)
      if (result.success) {
        await router.push('/pharmacie')
        return result
      }
      throw new Error(result.error || 'Code OTP invalide')
    } catch (err) {
      console.error('OTP verification error:', err)
      throw err
    }
  }

  // ✅ Renvoyer le code OTP
  const resendCode = async () => {
    try {
      const result = await authStore.resendOtp()
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors du renvoi du code')
      }
      return result
    } catch (err) {
      console.error('Resend code error:', err)
      throw err
    }
  }

  // ✅ Déconnexion
  const signOut = async () => {
    try {
      await authStore.logout()
      await router.push('/signin')
    } catch (err) {
      console.error('Sign out error:', err)
      throw err
    }
  }

  return {
    // State
    isLoading,
    error,
    successMessage,
    user,
    isAuthenticated,
    userRoles,
    userPerson,
    displayName,

    // Actions
    signIn,
    verifyOtp,
    resendCode,
    signOut,

    // Role checks
    hasRole,
    hasAnyRole,
    hasAllRoles,
  }
}
