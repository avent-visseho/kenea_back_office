// src/store/auth/auth.js
import { defineStore } from 'pinia'
import {
  login,
  verifyOtp,
  resendOtp,
  getUserInfo,
  logout as logoutApi,
} from '@/api/services/authService'
import { useToast } from '@/composables/useToast'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    pendingUsername: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  getters: {
    bearerToken: (state) => {
      return state.token ? `Bearer ${state.token}` : null
    },

    // ✅ Getter pour les rôles
    userRoles: (state) => {
      return state.user?.roles || []
    },

    // ✅ Getter pour les informations personnelles
    userPerson: (state) => {
      return state.user?.person || null
    },

    // ✅ Nom d'affichage
    displayName: (state) => {
      if (state.user?.person?.firstname && state.user?.person?.lastname) {
        return `${state.user.person.firstname} ${state.user.person.lastname}`
      }
      if (state.user?.username) {
        if (state.user.username.includes('@')) {
          const name = state.user.username.split('@')[0]
          return name.charAt(0).toUpperCase() + name.slice(1)
        }
        return state.user.username.charAt(0).toUpperCase() + state.user.username.slice(1)
      }
      return 'Utilisateur'
    },

    // ✅ NOUVEAU: Getter pour récupérer l'ID de la pharmacie
    pharmacieId: (state) => {
      const assignments = state.user?.assignments
      if (assignments && assignments.PHARMACIE && Array.isArray(assignments.PHARMACIE)) {
        return assignments.PHARMACIE[0] || null
      }
      return null
    },

    // ✅ NOUVEAU: Getter pour tous les IDs de pharmacies (si plusieurs)
    pharmacieIds: (state) => {
      const assignments = state.user?.assignments
      if (assignments && assignments.PHARMACIE && Array.isArray(assignments.PHARMACIE)) {
        return assignments.PHARMACIE
      }
      return []
    },

    // ✅ NOUVEAU: Vérifier si l'utilisateur a une pharmacie assignée
    hasPharmacie: (state) => {
      const assignments = state.user?.assignments
      return !!(assignments && assignments.PHARMACIE && assignments.PHARMACIE.length > 0)
    },

    // ✅ NOUVEAU: Récupérer toutes les assignations
    userAssignments: (state) => {
      return state.user?.assignments || {}
    },
  },

  actions: {
    // ✅ Vérifier si l'utilisateur a un rôle
    hasRole(roleName) {
      return this.userRoles.some((role) => role.name === roleName)
    },

    // ✅ Étape 1: Connexion initiale
    async login(credentials) {
      const toast = useToast()
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const response = await login(credentials)
        console.log('Login response:', response)

        if (response.status === 'SUCCESS') {
          this.pendingUsername = credentials.username
          const successMsg = response.message || 'Code envoyé avec succès'
          this.successMessage = successMsg
          toast.success(successMsg)
          return {
            success: true,
            requiresOtp: true,
            message: successMsg,
          }
        }

        const errorMsg = response.message || 'Erreur de connexion'
        this.error = errorMsg
        toast.error(errorMsg)
        return {
          success: false,
          error: errorMsg,
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur de connexion au serveur'
        this.error = errorMsg
        toast.error(errorMsg)
        console.error('Login error:', error)
        return { success: false, error: errorMsg }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ Étape 2: Vérification OTP
    async verifyOtp(otp) {
      const toast = useToast()

      if (!this.pendingUsername) {
        const errorMsg = 'Session expirée. Veuillez vous reconnecter.'
        this.error = errorMsg
        toast.error(errorMsg)
        return { success: false, error: errorMsg }
      }

      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const response = await verifyOtp({
          username: this.pendingUsername,
          otp: otp,
        })

        console.log('OTP verification response:', response)

        if (response.status === 'SUCCESS' && response.body?.token) {
          this.token = response.body.token
          this.isAuthenticated = true
          this.pendingUsername = null
          this.saveToStorage()
          await this.fetchUserInfo()
          toast.success('Connexion réussie ! Bienvenue.')
          return { success: true }
        }

        const errorMsg = response.message || 'Code OTP invalide'
        this.error = errorMsg
        toast.error(errorMsg)
        return {
          success: false,
          error: errorMsg,
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur de vérification OTP'
        this.error = errorMsg
        toast.error(errorMsg)
        console.error('OTP verification error:', error)
        return { success: false, error: errorMsg }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ Renvoyer OTP
    async resendOtp() {
      const toast = useToast()

      if (!this.pendingUsername) {
        const errorMsg = 'Session expirée. Veuillez vous reconnecter.'
        this.error = errorMsg
        toast.error(errorMsg)
        return { success: false, error: errorMsg }
      }

      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const response = await resendOtp(this.pendingUsername)

        if (response.status === 'SUCCESS') {
          const successMsg = 'Code renvoyé avec succès'
          this.successMessage = successMsg
          toast.success(successMsg)
          return { success: true, message: successMsg }
        }

        const errorMsg = response.message || 'Erreur lors du renvoi du code'
        this.error = errorMsg
        toast.error(errorMsg)
        return {
          success: false,
          error: errorMsg,
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur lors du renvoi du code'
        this.error = errorMsg
        toast.error(errorMsg)
        console.error('Resend OTP error:', error)
        return { success: false, error: errorMsg }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ Récupérer les infos utilisateur
    async fetchUserInfo() {
      if (!this.token) return

      try {
        const response = await getUserInfo()
        console.log('User info response:', response)

        if (response?.status === 'SUCCESS' && response.body) {
          this.user = response.body
          console.log('✅ User info saved to store:', this.user)
          console.log('✅ Pharmacie ID:', this.pharmacieId)
          this.saveToStorage()
        } else {
          console.error('❌ Invalid user info response:', response)
        }
      } catch (error) {
        console.error('❌ Error fetching user info:', error)
      }
    },

    // ✅ Déconnexion
    async logout() {
      try {
        if (this.token) {
          await logoutApi()
        }
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.token = null
        this.pendingUsername = null
        this.isAuthenticated = false
        this.error = null
        this.successMessage = null
        localStorage.removeItem('auth_data')
        localStorage.removeItem('auth_token')
        sessionStorage.removeItem('auth_data')
        sessionStorage.removeItem('auth_token')
      }
    },

    // ✅ Sauvegarder dans le storage
    saveToStorage(useLocalStorage = true) {
      const authData = {
        user: this.user,
        token: this.token,
        isAuthenticated: this.isAuthenticated,
      }

      const storage = useLocalStorage ? localStorage : sessionStorage
      storage.setItem('auth_data', JSON.stringify(authData))
      storage.setItem('auth_token', this.token)

      console.log('✅ Auth data saved to storage:', authData)
    },

    // ✅ Charger depuis le storage
    loadFromStorage() {
      try {
        const authData = localStorage.getItem('auth_data') || sessionStorage.getItem('auth_data')

        if (authData) {
          const parsed = JSON.parse(authData)
          console.log('✅ Loaded from storage:', parsed)

          if (parsed.token) {
            this.user = parsed.user
            this.token = parsed.token
            this.isAuthenticated = parsed.isAuthenticated
            console.log('✅ User restored from storage:', this.user)
            console.log('✅ Pharmacie ID:', this.pharmacieId)
            return true
          }
        }
      } catch (error) {
        console.error('❌ Error loading auth data:', error)
        localStorage.removeItem('auth_data')
        localStorage.removeItem('auth_token')
        sessionStorage.removeItem('auth_data')
        sessionStorage.removeItem('auth_token')
      }
      return false
    },

    // ✅ Initialiser le store
    initialize() {
      const loaded = this.loadFromStorage()
      if (loaded && this.token) {
        this.fetchUserInfo()
      }
      return loaded
    },
  },
})
