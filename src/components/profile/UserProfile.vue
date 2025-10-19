<!-- src/views/Others/UserProfile.vue -->
<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <!-- État de chargement -->
        <div v-if="!user"
            class="flex items-center justify-center p-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Chargement du profil...</p>
            </div>
        </div>

        <!-- Contenu du profil -->
        <div v-else class="space-y-6">
            <!-- Carte principale du profil -->
            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Profil utilisateur
                </h3>
                <profile-card />
                <personal-info-card />
            </div>

            <!-- Rôles et privilèges -->
            <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <roles-privileges-card />
            </div>

            <!-- Informations du compte -->
            <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <account-info-card />
            </div>

            <!-- Actions rapides -->
            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
                    Actions rapides
                </h3>
                <div class="flex flex-wrap gap-3">
                    <router-link to="/settings"
                        class="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <SettingsIcon class="mr-2 h-5 w-5" />
                        Paramètres du compte
                    </router-link>

                    <button @click="handleChangePassword"
                        class="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <LockIcon class="mr-2 h-5 w-5" />
                        Changer le mot de passe
                    </button>

                    <button @click="handleRefreshProfile" :disabled="isRefreshing"
                        class="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
                        <RefreshIcon :class="{ 'animate-spin': isRefreshing }" class="mr-2 h-5 w-5" />
                        {{ isRefreshing ? 'Actualisation...' : 'Actualiser' }}
                    </button>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script setup>
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ProfileCard from '../../components/profile/ProfileCard.vue'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue'
import RolesPrivilegesCard from '../../components/profile/RolesPrivilegesCard.vue'
import AccountInfoCard from '../../components/profile/AccountInfoCard.vue'
import { SettingsIcon, LockIcon } from '@/icons'
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth/auth'

const currentPageTitle = ref('Profil Utilisateur')
const { user } = useAuth()
const router = useRouter()
const authStore = useAuthStore()
const isRefreshing = ref(false)

// Icône de rafraîchissement
const RefreshIcon = {
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  `
}

// ✅ Changer le mot de passe
const handleChangePassword = () => {
    router.push('/change-password')
}

// ✅ Actualiser le profil
const handleRefreshProfile = async () => {
    isRefreshing.value = true
    try {
        await authStore.fetchUserInfo()
        console.log('✅ Profil actualisé')
    } catch (error) {
        console.error('❌ Erreur lors de l\'actualisation:', error)
    } finally {
        isRefreshing.value = false
    }
}
</script>