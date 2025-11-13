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

  // ✅ Obtenir les privilèges de l'utilisateur
  const userPrivileges = computed(() => {
    if (!authStore.user || !authStore.user.roles) return []

    const privileges = new Set()
    authStore.user.roles.forEach((role) => {
      if (role.privileges) {
        role.privileges.forEach((privilege) => {
          if (!privilege.deleted) {
            privileges.add(privilege.name)
          }
        })
      }
    })

    return Array.from(privileges)
  })

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

  // ✅ Vérifier si l'utilisateur a un privilège spécifique
  const hasPrivilege = (privilegeName) => {
    return userPrivileges.value.includes(privilegeName)
  }

  // ✅ Vérifier si l'utilisateur a au moins un des privilèges
  const hasAnyPrivilege = (...privileges) => {
    return privileges.some((privilege) => userPrivileges.value.includes(privilege))
  }

  // ✅ Vérifier si l'utilisateur a tous les privilèges
  const hasAllPrivileges = (...privileges) => {
    return privileges.every((privilege) => userPrivileges.value.includes(privilege))
  }

  // ✅ Vérifier si l'utilisateur peut accéder à une route
  const canAccessRoute = (routeMeta) => {
    if (!routeMeta) return true

    // Si la route nécessite l'authentification
    if (routeMeta.requiresAuth && !authStore.isAuthenticated) {
      return false
    }

    // Si des rôles sont requis
    if (routeMeta.allowedRoles && routeMeta.allowedRoles.length > 0) {
      return hasAnyRole(...routeMeta.allowedRoles)
    }

    return true
  }

  // ✅ Vérifier les types d'utilisateurs
  const isAdmin = computed(() => hasAnyRole('ADMIN', 'SUPER_ADMIN'))
  const isPharmacy = computed(() => hasRole('PHARMACIE'))
  const isUser = computed(() => hasRole('USER'))
  const isSuperAdmin = computed(() => hasRole('SUPER_ADMIN'))

  // ✅ Obtenir la page d'accueil selon le rôle
  const getHomeRoute = () => {
    if (hasAnyRole('ADMIN', 'SUPER_ADMIN')) {
      return '/dashboard'
    } else if (hasRole('PHARMACIE')) {
      return '/ordonnance-progression'
    } else if (hasRole('USER')) {
      return '/ordonnance'
    }
    return '/dashboard'
  }

  // ✅ Connexion (étape 1: email/phone + password)
  const signIn = async (credentials) => {
    try {
      const result = await authStore.login(credentials)
      if (result.success && result.requiresOtp) {
        // Conserver le paramètre redirect lors de la redirection vers OTP
        const redirectUrl = router.currentRoute.value.query.redirect
        if (redirectUrl) {
          await router.push({ path: '/verify-otp', query: { redirect: redirectUrl } })
        } else {
          await router.push('/verify-otp')
        }
        return result
      }
      if (result.success && !result.requiresOtp) {
        // Vérifier s'il y a une URL de redirection
        const redirectUrl = router.currentRoute.value.query.redirect
        if (redirectUrl) {
          console.log('🔄 Redirection vers:', redirectUrl)
          await router.push(redirectUrl)
        } else {
          // Rediriger vers la page appropriée selon le rôle
          await router.push(getHomeRoute())
        }
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
        // Vérifier s'il y a une URL de redirection
        const redirectUrl = router.currentRoute.value.query.redirect

        if (redirectUrl) {
          // Rediriger vers l'URL demandée
          console.log('🔄 Redirection vers:', redirectUrl)
          await router.push(redirectUrl)
        } else {
          // Rediriger vers la page appropriée selon le rôle
          await router.push(getHomeRoute())
        }
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
    userPrivileges,

    // Actions
    signIn,
    verifyOtp,
    resendCode,
    signOut,

    // Role checks
    hasRole,
    hasAnyRole,
    hasAllRoles,

    // Privilege checks
    hasPrivilege,
    hasAnyPrivilege,
    hasAllPrivileges,

    // Route access
    canAccessRoute,
    getHomeRoute,

    // User type checks
    isAdmin,
    isPharmacy,
    isUser,
    isSuperAdmin,
  }
}
