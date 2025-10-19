<!-- src/components/profile/ProfileCard.vue -->
<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <!-- Photo de profil -->
          <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img src="/images/logo/logo_Kenea_1.png" alt="user" />
          </div>

          <!-- Informations principales -->
          <div class="order-3 xl:order-2">
            <h4 class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {{ fullName }}
            </h4>
            <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <!-- Rôles -->
              <div class="flex flex-wrap gap-1.5 justify-center xl:justify-start">
                <span v-for="role in uniqueRoles" :key="role.id" :class="getRoleBadgeClass(role.name)"
                  class="inline-block px-2 py-0.5 text-xs font-medium rounded-full">
                  {{ formatRoleName(role.name) }}
                </span>
              </div>

              <div v-if="uniqueRoles.length > 0 && person?.location"
                class="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

              <!-- Localisation -->
              <p v-if="person?.location" class="text-sm text-gray-500 dark:text-gray-400">
                {{ person.location }}
              </p>
            </div>

            <!-- Statuts du compte -->
            <div class="flex flex-wrap gap-2 mt-3 justify-center xl:justify-start">
              <span :class="user?.enabled
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                " class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                <span :class="user?.enabled ? 'bg-green-500' : 'bg-red-500'"
                  class="w-1.5 h-1.5 rounded-full mr-1.5"></span>
                {{ user?.enabled ? 'Compte actif' : 'Compte désactivé' }}
              </span>

              <span v-if="user?.locked"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                🔒 Verrouillé
              </span>
            </div>
          </div>
        </div>

        <!-- Informations supplémentaires -->
        <div class="flex flex-col gap-2 text-center xl:text-right">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Membre depuis
          </p>
          <p class="text-sm font-medium text-gray-800 dark:text-white/90">
            {{ formatDate(user?.createAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

const { user, userRoles, userPerson } = useAuth()

// ✅ Computed properties
const person = computed(() => userPerson.value)

const fullName = computed(() => {
  if (person.value?.firstname && person.value?.lastname) {
    const firstname = person.value.firstname.charAt(0).toUpperCase() + person.value.firstname.slice(1)
    const lastname = person.value.lastname.charAt(0).toUpperCase() + person.value.lastname.slice(1)
    return `${firstname} ${lastname}`
  }
  if (user.value?.username) {
    if (user.value.username.includes('@')) {
      const name = user.value.username.split('@')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
    return user.value.username.charAt(0).toUpperCase() + user.value.username.slice(1)
  }
  return 'Utilisateur'
})

// ✅ Rôles uniques (éviter les doublons)
const uniqueRoles = computed(() => {
  if (!userRoles.value || userRoles.value.length === 0) return []

  const seen = new Set()
  return userRoles.value.filter(role => {
    if (seen.has(role.name)) return false
    seen.add(role.name)
    return true
  })
})

// ✅ Formater le nom du rôle
const formatRoleName = (roleName) => {
  const names = {
    'SUPER_ADMIN': 'Super Admin',
    'ADMIN': 'Administrateur',
    'PHARMACIEN': 'Pharmacien',
    'USER': 'Utilisateur',
  }
  return names[roleName] || roleName
}

// ✅ Classe CSS pour les badges de rôles
const getRoleBadgeClass = (roleName) => {
  const classes = {
    'SUPER_ADMIN': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'ADMIN': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'PHARMACIEN': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'USER': 'bg-brand-100 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400',
  }
  return classes[roleName] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
}

// ✅ Formater les dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch (e) {
    return dateString
  }
}
</script>