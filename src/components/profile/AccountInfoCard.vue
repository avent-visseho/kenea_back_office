<!-- src/components/profile/AccountInfoCard.vue -->
<template>
    <div>
        <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Informations du compte
            </h4>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <!-- ID Utilisateur -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Identifiant unique
                    </p>
                    <p class="text-sm font-mono text-gray-800 dark:text-white/90 break-all">
                        {{ user?.id || 'N/A' }}
                    </p>
                </div>

                <!-- Username -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Nom d'utilisateur
                    </p>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                        {{ user?.username || 'N/A' }}
                    </p>
                </div>

                <!-- Date de création -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Compte créé le
                    </p>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                        {{ formatDate(user?.createAt) }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Il y a {{ getTimeAgo(user?.createAt) }}
                    </p>
                </div>

                <!-- Dernière mise à jour -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Dernière mise à jour
                    </p>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                        {{ formatDate(user?.updateAt) }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Il y a {{ getTimeAgo(user?.updateAt) }}
                    </p>
                </div>
            </div>

            <!-- Statuts du compte -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h5 class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Statut du compte
                </h5>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <!-- Compte activé -->
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div class="flex items-center gap-2">
                            <component :is="user?.enabled ? CheckCircleIcon : XCircleIcon"
                                :class="user?.enabled ? 'text-green-500' : 'text-red-500'" class="w-5 h-5" />
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Compte
                            </span>
                        </div>
                        <span
                            :class="user?.enabled ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'"
                            class="px-2 py-0.5 text-xs font-medium rounded-full">
                            {{ user?.enabled ? 'Actif' : 'Inactif' }}
                        </span>
                    </div>

                    <!-- Compte verrouillé -->
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div class="flex items-center gap-2">
                            <component :is="user?.locked ? LockIcon : UnlockIcon"
                                :class="user?.locked ? 'text-red-500' : 'text-green-500'" class="w-5 h-5" />
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Sécurité
                            </span>
                        </div>
                        <span
                            :class="user?.locked ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'"
                            class="px-2 py-0.5 text-xs font-medium rounded-full">
                            {{ user?.locked ? 'Verrouillé' : 'Déverrouillé' }}
                        </span>
                    </div>

                    <!-- Compte supprimé -->
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div class="flex items-center gap-2">
                            <component :is="user?.deleted ? TrashIcon : CheckCircleIcon"
                                :class="user?.deleted ? 'text-red-500' : 'text-green-500'" class="w-5 h-5" />
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                État
                            </span>
                        </div>
                        <span
                            :class="user?.deleted ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'"
                            class="px-2 py-0.5 text-xs font-medium rounded-full">
                            {{ user?.deleted ? 'Supprimé' : 'Actif' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- UUID de la personne -->
            <div v-if="person?.uuid" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        UUID Personne
                    </p>
                    <p class="text-sm font-mono text-gray-800 dark:text-white/90 break-all">
                        {{ person.uuid }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import {
    CheckCircleIcon,
    XCircleIcon,
    LockIcon,
    TrashIcon
} from '@/icons'

// Icône de déverrouillage (créer si n'existe pas)
const UnlockIcon = {
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  `
}

const { user, userPerson } = useAuth()

const person = computed(() => userPerson.value)

// ✅ Formater les dates
const formatDate = (dateString) => {
    if (!dateString) return 'N/A'

    try {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    } catch (e) {
        return dateString
    }
}

// ✅ Calculer le temps écoulé
const getTimeAgo = (dateString) => {
    if (!dateString) return 'N/A'

    try {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMs = now - date
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

        if (diffInDays === 0) {
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
            if (diffInHours === 0) {
                const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
                return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
            }
            return `${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
        } else if (diffInDays < 30) {
            return `${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
        } else if (diffInDays < 365) {
            const months = Math.floor(diffInDays / 30)
            return `${months} mois`
        } else {
            const years = Math.floor(diffInDays / 365)
            return `${years} an${years > 1 ? 's' : ''}`
        }
    } catch (e) {
        return 'N/A'
    }
}
</script>