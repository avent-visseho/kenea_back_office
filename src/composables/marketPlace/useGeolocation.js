// src/composables/marketPlace/useGeolocation.js
// Composable pour gérer la géolocalisation de l'utilisateur

import { ref, computed } from 'vue'

// État global partagé entre toutes les instances du composable
const userLocation = ref(null)
const locationError = ref(null)
const isLoading = ref(false)
const permissionStatus = ref('prompt') // 'prompt' | 'granted' | 'denied'

// Coordonnées par défaut (Dakar, Sénégal)
const DEFAULT_LOCATION = {
  lat: 14.6928,
  lng: -17.4467,
  city: 'Dakar',
  country: 'Sénégal'
}

/**
 * Composable pour gérer la géolocalisation de l'utilisateur
 * @returns {Object} État et méthodes de géolocalisation
 */
export function useGeolocation() {
  /**
   * Vérifie si la géolocalisation est supportée par le navigateur
   */
  const isSupported = computed(() => {
    return 'geolocation' in navigator
  })

  /**
   * Demande la permission et récupère la position de l'utilisateur
   * @param {Object} options - Options de géolocalisation
   * @returns {Promise<Object>} Position de l'utilisateur {lat, lng}
   */
  const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (!isSupported.value) {
        const error = new Error('La géolocalisation n\'est pas supportée par votre navigateur')
        locationError.value = error.message
        reject(error)
        return
      }

      isLoading.value = true
      locationError.value = null

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 secondes
        maximumAge: 300000, // 5 minutes de cache
        ...options
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }

          userLocation.value = location
          permissionStatus.value = 'granted'
          isLoading.value = false

          console.log('✅ Position obtenue:', location)
          resolve(location)
        },
        (error) => {
          isLoading.value = false
          permissionStatus.value = 'denied'

          let errorMessage = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Vous avez refusé l\'accès à votre position. Veuillez autoriser la géolocalisation dans les paramètres de votre navigateur.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Votre position n\'est pas disponible pour le moment.'
              break
            case error.TIMEOUT:
              errorMessage = 'Le délai pour obtenir votre position a expiré. Veuillez réessayer.'
              break
            default:
              errorMessage = 'Une erreur inconnue s\'est produite lors de la géolocalisation.'
          }

          locationError.value = errorMessage
          console.error('❌ Erreur de géolocalisation:', errorMessage, error)

          // Utiliser la position par défaut
          console.log('📍 Utilisation de la position par défaut:', DEFAULT_LOCATION)
          userLocation.value = DEFAULT_LOCATION

          reject(new Error(errorMessage))
        }
      )
    })
  }

  /**
   * Récupère la position actuelle ou utilise celle en cache
   * @returns {Promise<Object>} Position de l'utilisateur
   */
  const getLocation = async () => {
    // Si on a déjà une position récente (moins de 5 minutes), la réutiliser
    if (userLocation.value && userLocation.value.timestamp) {
      const age = Date.now() - userLocation.value.timestamp
      if (age < 300000) { // 5 minutes
        console.log('📍 Utilisation de la position en cache')
        return userLocation.value
      }
    }

    try {
      return await getCurrentPosition()
    } catch (error) {
      // En cas d'erreur, retourner la position par défaut
      return DEFAULT_LOCATION
    }
  }

  /**
   * Surveille les changements de position en temps réel
   * @param {Function} callback - Fonction appelée à chaque changement
   * @param {Object} options - Options de géolocalisation
   * @returns {number|null} ID du watcher (pour le stopper)
   */
  const watchPosition = (callback, options = {}) => {
    if (!isSupported.value) {
      console.error('La géolocalisation n\'est pas supportée')
      return null
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }

        userLocation.value = location
        callback(location)
      },
      (error) => {
        console.error('Erreur watchPosition:', error)
        locationError.value = error.message
      },
      defaultOptions
    )

    return watchId
  }

  /**
   * Arrête la surveillance de la position
   * @param {number} watchId - ID du watcher à arrêter
   */
  const clearWatch = (watchId) => {
    if (watchId && isSupported.value) {
      navigator.geolocation.clearWatch(watchId)
    }
  }

  /**
   * Réinitialise l'état de géolocalisation
   */
  const reset = () => {
    userLocation.value = null
    locationError.value = null
    isLoading.value = false
    permissionStatus.value = 'prompt'
  }

  /**
   * Définit manuellement une position
   * @param {Object} location - {lat, lng}
   */
  const setLocation = (location) => {
    if (location && location.lat && location.lng) {
      userLocation.value = {
        ...location,
        timestamp: Date.now()
      }
      console.log('📍 Position définie manuellement:', location)
    }
  }

  /**
   * Utilise la position par défaut
   */
  const useDefaultLocation = () => {
    userLocation.value = {
      ...DEFAULT_LOCATION,
      timestamp: Date.now()
    }
    locationError.value = null
    console.log('📍 Utilisation de la position par défaut')
  }

  return {
    // État
    userLocation: computed(() => userLocation.value),
    locationError: computed(() => locationError.value),
    isLoading: computed(() => isLoading.value),
    permissionStatus: computed(() => permissionStatus.value),
    isSupported,
    defaultLocation: DEFAULT_LOCATION,

    // Méthodes
    getCurrentPosition,
    getLocation,
    watchPosition,
    clearWatch,
    reset,
    setLocation,
    useDefaultLocation
  }
}
