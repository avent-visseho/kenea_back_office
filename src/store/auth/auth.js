// src/store/auth/auth.js
import { defineStore } from 'pinia'
import {
  login,
  verifyOtp,
  resendOtp,
  getUserInfo,
  logout as logoutApi,
} from '@/api/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    pendingUsername: null, // Stocke le username en attendant l'OTP
    isAuthenticated: false,
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  getters: {
    bearerToken: (state) => {
      return state.token ? `Bearer ${state.token}` : null
    },
  },

  actions: {
    // ✅ Étape 1: Connexion initiale
    async login(credentials) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const response = await login(credentials)

        console.log('Login response:', response)

        // Vérifier le statut de la réponse
        if (response.status === 'SUCCESS') {
          // Stocker le username pour l'étape OTP
          this.pendingUsername = credentials.username

          return {
            success: true,
            requiresOtp: true,
            message: response.message || 'Code envoyé avec succès',
          }
        }

        return {
          success: false,
          error: response.message || 'Erreur de connexion',
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur de connexion au serveur'
        this.error = errorMsg
        console.error('Login error:', error)
        return { success: false, error: errorMsg }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ Étape 2: Vérification OTP
    async verifyOtp(otp) {
      if (!this.pendingUsername) {
        this.error = 'Session expirée. Veuillez vous reconnecter.'
        return { success: false, error: this.error }
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
          // Sauvegarder le token
          this.token = response.body.token
          this.isAuthenticated = true
          this.pendingUsername = null

          // Sauvegarder dans localStorage ou sessionStorage
          this.saveToStorage()

          // Récupérer les infos utilisateur
          await this.fetchUserInfo()

          return { success: true }
        }

        return {
          success: false,
          error: response.message || 'Code OTP invalide',
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur de vérification OTP'
        this.error = errorMsg
        console.error('OTP verification error:', error)
        return { success: false, error: errorMsg }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ Renvoyer OTP
    async resendOtp() {
      if (!this.pendingUsername) {
        this.error = 'Session expirée. Veuillez vous reconnecter.'
        return { success: false, error: this.error }
      }

      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const response = await resendOtp(this.pendingUsername)

        if (response.status === 'SUCCESS') {
          this.successMessage = 'Code renvoyé avec succès'
          return { success: true, message: this.successMessage }
        }

        return {
          success: false,
          error: response.message || 'Erreur lors du renvoi du code',
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erreur lors du renvoi du code'
        this.error = errorMsg
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

        // ✅ CORRECTION: La réponse est directement {roles, expiration, username}
        // Pas besoin de response.body ou response.data
        if (response && response.username) {
          this.user = response // ✅ Directement la réponse
          console.log('User info saved to store:', this.user)
          this.saveToStorage()
        } else {
          console.error('Invalid user info response:', response)
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
        if (error.response?.status === 401) {
          this.logout()
        }
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

      // Aussi sauvegarder le token séparément pour axios
      storage.setItem('auth_token', this.token)

      console.log('Auth data saved to storage:', authData)
    },

    // ✅ Charger depuis le storage
    loadFromStorage() {
      try {
        const authData = localStorage.getItem('auth_data') || sessionStorage.getItem('auth_data')

        if (authData) {
          const parsed = JSON.parse(authData)
          console.log('Loaded from storage:', parsed)

          if (parsed.token) {
            this.user = parsed.user
            this.token = parsed.token
            this.isAuthenticated = parsed.isAuthenticated
            console.log('User restored from storage:', this.user)
            return true
          }
        }
      } catch (error) {
        console.error('Error loading auth data:', error)
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
        // Si on a un token, essayer de recharger les infos utilisateur
        this.fetchUserInfo()
      }
      return loaded
    },
  },
})
