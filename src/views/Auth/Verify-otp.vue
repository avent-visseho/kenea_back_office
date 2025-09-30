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
                  Vérification en deux étapes
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Un code de vérification a été envoyé sur votre téléphone portable. Veuillez le
                  saisir dans le champ ci-dessous.
                </p>
              </div>

              <div>
                <form @submit.prevent="handleSubmit">
                  <div class="space-y-5">
                    <!-- Affichage des erreurs -->
                    <div v-if="error" class="text-sm text-error-500">
                      {{ error }}
                    </div>

                    <!-- Code de vérification à 6 chiffres -->
                    <div>
                      <label
                        class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Saisissez votre code de sécurité à 6 chiffres.
                      </label>

                      <div class="flex space-x-3">
                        <input
                          v-for="(digit, index) in otp"
                          :key="index"
                          :ref="(el) => setInputRef(el, index)"
                          v-model="otp[index]"
                          type="text"
                          maxlength="1"
                          @input="handleInput(index, $event)"
                          @keydown="handleKeydown(index, $event)"
                          @paste="handlePaste($event)"
                          class="w-16 h-10 text-center text-lg font-medium border border-gray-300 rounded-lg bg-transparent text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <!-- Bouton -->
                    <div class="mt-6">
                      <button
                        type="submit"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-blue-500 shadow-theme-xs hover:bg-blue-600"
                        :disabled="isLoading || !isCodeComplete"
                      >
                        <span v-if="isLoading">Vérification en cours...</span>
                        <span v-else>Vérifier mon compte</span>
                      </button>
                    </div>
                  </div>
                </form>

                <div class="mt-5">
                  <p
                    class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start"
                  >
                    Vous n'avez pas reçu le code ?
                    <button
                      @click="resendCode"
                      class="text-blue-500 hover:text-blue-600 dark:text-blue-400 underline"
                      :disabled="isLoading"
                    >
                      Renvoyer
                    </button>
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

// src/views/Auth/Verify-otp.vue
<script setup>
import { ref, computed, nextTick } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import { useAuth } from '@/composables/useAuth.js'
import { useUserStore } from '@/store/modules/user'

const { signIn, resendCode, isLoading, error } = useAuth()
const userStore = useUserStore()

// Code de vérification à 6 chiffres
const otp = ref(['', '', '', '', '', ''])
const inputRefs = ref([])

// Computed pour vérifier si le code est complet
const isCodeComplete = computed(() => {
  return otp.value.every((digit) => digit !== '')
})

// Fonction pour définir les références des inputs
const setInputRef = (el, index) => {
  if (el) {
    inputRefs.value[index] = el
  }
}

// Gestion de la saisie
const handleInput = (index, event) => {
  const value = event.target.value.replace(/[^0-9]/g, '') // Seuls les chiffres
  if (value.length <= 1) {
    otp.value[index] = value
    if (value && index < 5) {
      nextTick(() => {
        inputRefs.value[index + 1]?.focus()
      })
    }
  }
}

// Gestion des touches spéciales
const handleKeydown = (index, event) => {
  if (event.key === 'Backspace') {
    if (!otp.value[index] && index > 0) {
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

// Gestion du collage
const handlePaste = (event) => {
  event.preventDefault()
  const paste = event.clipboardData.getData('text').replace(/[^0-9]/g, '')
  if (paste.length >= 6) {
    for (let i = 0; i < 6; i++) {
      otp.value[i] = paste[i] || ''
    }
  }
}

// Soumettre le formulaire
const handleSubmit = async () => {
  if (isCodeComplete.value) {
    error.value = null
    await signIn({
      otp: otp.value.join(''),
      keepLoggedIn: localStorage.getItem('keepLoggedIn') === 'true', // Retrieve keepLoggedIn
    })
  }
}
</script>
