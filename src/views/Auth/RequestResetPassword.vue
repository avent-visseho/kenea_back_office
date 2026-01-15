<!-- src/views/Auth/RequestResetPassword.vue -->

<script setup>
import { ref } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import { resetPassword } from '@/api/services/authService'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const email = ref('')
const username = ref('')
const isLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)

const handleSubmit = async () => {
  // Validation
  if (!email.value || !username.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  // Validation email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Veuillez entrer une adresse email valide'
    return
  }

  isLoading.value = true
  error.value = null
  successMessage.value = null

  try {
    const response = await resetPassword({
      to: email.value,
      username: username.value,
    })

    // L'API peut retourner soit une chaîne directement, soit un objet
    const isSuccess = response.status === 'SUCCESS' || typeof response === 'string'

    if (isSuccess) {
      const successMsg = typeof response === 'string'
        ? response
        : (response.message || 'Email de réinitialisation de mot de passe envoyé !')
      successMessage.value = successMsg
      toast.success(successMsg)

      // Stocker l'email pour la prochaine étape
      sessionStorage.setItem('reset_email', email.value)

      // Rediriger vers la page de confirmation après 2 secondes
      setTimeout(() => {
        router.push('/confirm-reset-password')
      }, 2000)
    } else {
      const errorMsg = response.message || 'Erreur lors de l\'envoi de l\'email'
      error.value = errorMsg
      toast.error(errorMsg)
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Erreur de connexion au serveur'
    error.value = errorMsg
    toast.error(errorMsg)
    console.error('Reset password error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Réinitialiser mon mot de passe
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Entrez votre email et votre nom d'utilisateur pour recevoir un code de réinitialisation
                </p>
              </div>
              <div>
                <form @submit.prevent="handleSubmit">
                  <div class="space-y-5">
                    <!-- Affichage des erreurs -->
                    <div
                      v-if="error"
                      class="p-3 text-sm rounded-lg bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400"
                    >
                      {{ error }}
                    </div>

                    <!-- Affichage du message de succès -->
                    <div
                      v-if="successMessage"
                      class="p-3 text-sm rounded-lg bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      {{ successMessage }}
                    </div>

                    <!-- Email -->
                    <div>
                      <label
                        for="email"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Email<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="votre@email.com"
                        required
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>

                    <!-- Username -->
                    <div>
                      <label
                        for="username"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Nom d'utilisateur<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="username"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Entrez votre nom d'utilisateur"
                        required
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>

                    <!-- Bouton -->
                    <div>
                      <button
                        type="submit"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="isLoading"
                      >
                        <span v-if="isLoading">Envoi en cours...</span>
                        <span v-else>Envoyer le code de réinitialisation</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div class="mt-5">
                  <p
                    class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start"
                  >
                    Vous vous souvenez de votre mot de passe ?
                    <router-link
                      to="/signin"
                      class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >Se connecter</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 dark:bg-white/5 lg:grid"
          style="
            background-image: url('/images/grid-image/image-02.png');
            background-size: cover;
            background-position: center;
          "
        >
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <p class="text-center text-gray-400 dark:text-white/60">
                Kenea+, la santé à portée de main.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>
