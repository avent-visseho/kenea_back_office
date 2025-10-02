<!-- src/views/Errors/Forbidden.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-green-600 dark:text-green-500">
          403
        </h1>
      </div>
      
      <h2 class="mb-4 text-3xl font-semibold text-gray-900 dark:text-white">
        Accès refusé
      </h2>
      
      <p class="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        <span v-if="userRole" class="block mt-2 text-sm">
          Votre rôle actuel : <span class="font-semibold">{{ userRole }}</span>
        </span>
      </p>
      
      <div class="flex gap-4 justify-center flex-wrap">
        <button
          @click="goBack"
          class="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-colors"
        >
          Retour
        </button>
        
        <router-link
          to="/dashboard"
          class="px-6 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 transition-colors"
        >
          Accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth/auth'

const router = useRouter()
const authStore = useAuthStore()

const userRole = computed(() => {
  return authStore.user?.roles?.[0] || 'Non défini'
})

const goBack = () => {
  router.go(-1)
}
</script>