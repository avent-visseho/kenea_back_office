// src/store/auth/auth.js
import { defineStore } from 'pinia'
import { apiService } from '@/api/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    tokens: {
      access_token: null,
      refresh_token: null,
      token_type: 'Bearer',
      expires_in: null,
      expires_at: null,
    },
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    // ✅ CORRECTION: Utilisation correcte des backticks
    bearerToken: (state) => {
      if (state.tokens.access_token && state.tokens.token_type) {
        return `${state.tokens.token_type} ${state.tokens.access_token}`
      }
      return null
    },

    isTokenExpired: (state) => {
      if (!state.tokens.expires_at) return true
      return Date.now() >= state.tokens.expires_at
    },

    userRoles: (state) => {
      if (!state.user?.resource_access) return []

      const roles = []
      // Récupérer tous les rôles de toutes les ressources
      Object.keys(state.user.resource_access).forEach((resource) => {
        if (state.user.resource_access[resource]?.roles) {
          roles.push(...state.user.resource_access[resource].roles)
        }
      })

      // Ajouter les rôles du realm
      if (state.user.realm_access?.roles) {
        roles.push(...state.user.realm_access.roles)
      }

      return [...new Set(roles)] // Supprimer les doublons
    },

    hasRole: (state) => {
      return (role) => {
        // ✅ CORRECTION: Accès au getter userRoles
        const roles = state.userRoles
        return roles.includes(role)
      }
    },
  },

  actions: {
    // ✅ AMÉLIORATION: Connexion adaptée à votre flux (email/phone + password)
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        // Premier appel: envoyer email/phone + password
        const response = await apiService.postResource(
          credentials,
          '/kenea/api/authenticate'
        )

        if (response.data.success) {
          // Si la réponse contient directement les tokens (pas d'OTP)
          if (response.data.access_token) {
            this.tokens = {
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
              token_type: response.data.token_type || 'Bearer',
              expires_in: response.data.expires_in,
              expires_at: Date.now() + response.data.expires_in * 1000,
            }

            this.isAuthenticated = true
            this.saveToStorage()
            await this.fetchUserInfo()
            
            return { success: true, requiresOtp: false }
          }
          
          // Si un OTP est requis
          return { success: true, requiresOtp: true, message: response.data.message }
        }

        return { success: false, error: 'Erreur de connexion' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur de connexion'
        console.error('Erreur de connexion:', error)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ NOUVEAU: Vérification OTP
    async verifyOtp(username, otp) {
      this.isLoading = true
      this.error = null

      try {
        const response = await apiService.postResource(
          { username, otp },
          '/kenea/api/verify'
        )

        if (response.data.success) {
          this.tokens = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            token_type: response.data.token_type || 'Bearer',
            expires_in: response.data.expires_in,
            expires_at: Date.now() + response.data.expires_in * 1000,
          }

          this.isAuthenticated = true
          this.saveToStorage()
          await this.fetchUserInfo()

          return { success: true }
        }

        return { success: false, error: 'Code OTP invalide' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur de vérification OTP'
        console.error('Erreur de vérification OTP:', error)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // ✅ NOUVEAU: Renvoyer OTP
    async resendOtp(username) {
      this.isLoading = true
      this.error = null

      try {
        const response = await apiService.postResource(
          { username },
          '/kenea/api/resend-otp'
        )

        if (response.data.success) {
          return { success: true, message: 'Code renvoyé avec succès' }
        }

        return { success: false, error: 'Erreur lors du renvoi du code' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors du renvoi du code'
        console.error('Erreur de renvoi OTP:', error)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // Récupérer les infos utilisateur
    async fetchUserInfo() {
      if (!this.tokens.access_token) return

      try {
        const response = await apiService.getResource('/kenea/api/v1/auth/me')

        if (response.data.success) {
          this.user = response.data.user || response.data.data
          console.log('User info fetched:', this.user)
          this.saveToStorage()
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des infos utilisateur:', error)
        if (error.response?.status === 401) {
          this.logout()
        }
      }
    },

    // Déconnexion
    async logout() {
      try {
        // Appeler l'endpoint de logout si disponible
        await apiService.postResource({}, '/kenea/api/logout')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      } finally {
        // Nettoyer le state même en cas d'erreur
        this.user = null
        this.tokens = {
          access_token: null,
          refresh_token: null,
          token_type: 'Bearer',
          expires_in: null,
          expires_at: null,
        }
        this.isAuthenticated = false
        this.error = null
        localStorage.removeItem('auth_data')
      }
    },

    // Rafraîchir le token
    async refreshToken() {
      if (!this.tokens.refresh_token) {
        this.logout()
        return false
      }

      try {
        const response = await apiService.postResource(
          {
            refresh_token: this.tokens.refresh_token,
          },
          '/kenea/api/v1/auth/refresh',
        )

        if (response.data.success) {
          this.tokens = {
            ...this.tokens,
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            expires_at: Date.now() + response.data.expires_in * 1000,
          }

          this.saveToStorage()
          return true
        }

        return false
      } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error)
        this.logout()
        return false
      }
    },

    // Sauvegarder dans localStorage
    saveToStorage() {
      const authData = {
        user: this.user,
        tokens: this.tokens,
        isAuthenticated: this.isAuthenticated,
      }
      localStorage.setItem('auth_data', JSON.stringify(authData))
    },

    // Charger depuis localStorage
    loadFromStorage() {
      try {
        const authData = localStorage.getItem('auth_data')
        if (authData) {
          const parsed = JSON.parse(authData)
          console.log('Loaded from storage:', parsed)

          if (parsed.tokens?.expires_at && Date.now() < parsed.tokens.expires_at) {
            this.user = parsed.user
            this.tokens = parsed.tokens
            this.isAuthenticated = parsed.isAuthenticated
            console.log('User after load:', this.user)
            return true
          } else {
            localStorage.removeItem('auth_data')
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données d'authentification:", error)
        localStorage.removeItem('auth_data')
      }
      return false
    },

    // Initialiser le store (à appeler au démarrage de l'app)
    initialize() {
      return this.loadFromStorage()
    },
  },
})