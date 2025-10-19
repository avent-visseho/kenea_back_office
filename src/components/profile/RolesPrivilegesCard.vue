<!-- src/components/profile/RolesPrivilegesCard.vue -->
<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Rôles et Privilèges
      </h4>

      <!-- Si aucun rôle -->
      <div
        v-if="!uniqueRoles || uniqueRoles.length === 0"
        class="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        Aucun rôle assigné
      </div>

      <!-- Liste des rôles -->
      <div v-else class="space-y-4">
        <div
          v-for="role in uniqueRoles"
          :key="role.id"
          class="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span
                  :class="getRoleBadgeClass(role.name)"
                  class="inline-block px-3 py-1 text-sm font-semibold rounded-full"
                >
                  {{ formatRoleName(role.name) }}
                </span>
              </div>
              <p
                v-if="role.description"
                class="mt-2 text-sm text-gray-600 dark:text-gray-400"
              >
                {{ role.description }}
              </p>
            </div>

            <!-- Icône du rôle -->
            <div
              :class="getRoleIconBgClass(role.name)"
              class="flex items-center justify-center w-10 h-10 rounded-full"
            >
              <component :is="getRoleIcon(role.name)" class="w-5 h-5" />
            </div>
          </div>

          <!-- Privilèges -->
          <div v-if="role.privileges && role.privileges.length > 0" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              Privilèges accordés:
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="privilege in role.privileges"
                :key="privilege.id"
                class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300"
              >
                <component :is="getPrivilegeIcon(privilege.name)" class="w-3.5 h-3.5 mr-1.5" />
                {{ formatPrivilegeName(privilege.name) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques des privilèges -->
      <div v-if="privilegeStats.total > 0" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h5 class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Résumé des permissions
        </h5>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ uniqueRoles.length }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Rôle{{ uniqueRoles.length > 1 ? 's' : '' }}
            </p>
          </div>
          <div class="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ privilegeStats.total }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Privilèges
            </p>
          </div>
          <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ privilegeStats.read }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Lecture
            </p>
          </div>
          <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ privilegeStats.write }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Écriture
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { 
  ShieldCheckIcon, 
  UserIcon, 
  KeyIcon,
  EyeIcon,
  PencilIcon
} from '@/icons'

const { userRoles } = useAuth()

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

// ✅ Statistiques des privilèges
const privilegeStats = computed(() => {
  let total = 0
  let read = 0
  let write = 0
  
  uniqueRoles.value.forEach(role => {
    if (role.privileges) {
      role.privileges.forEach(priv => {
        if (priv.name === 'READ') read++
        if (priv.name === 'WRITE') write++
      })
      total += role.privileges.length
    }
  })
  
  return { total, read, write }
})

// ✅ Formater le nom du rôle
const formatRoleName = (roleName) => {
  const names = {
    'SUPER_ADMIN': 'Super Administrateur',
    'ADMIN': 'Administrateur',
    'PHARMACIEN': 'Pharmacien',
    'USER': 'Utilisateur',
  }
  return names[roleName] || roleName
}

// ✅ Formater le nom du privilège
const formatPrivilegeName = (privilegeName) => {
  const names = {
    'READ': 'Lecture',
    'WRITE': 'Écriture',
    'DELETE': 'Suppression',
    'UPDATE': 'Modification',
    'CREATE': 'Création',
  }
  return names[privilegeName] || privilegeName
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

// ✅ Classe CSS pour le fond de l'icône du rôle
const getRoleIconBgClass = (roleName) => {
  const classes = {
    'SUPER_ADMIN': 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    'ADMIN': 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    'PHARMACIEN': 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    'USER': 'bg-brand-100 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400',
  }
  return classes[roleName] || 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
}

// ✅ Icône du rôle
const getRoleIcon = (roleName) => {
  const icons = {
    'SUPER_ADMIN': ShieldCheckIcon,
    'ADMIN': KeyIcon,
    'PHARMACIEN': UserIcon,
    'USER': UserIcon,
  }
  return icons[roleName] || UserIcon
}

// ✅ Icône du privilège
const getPrivilegeIcon = (privilegeName) => {
  const icons = {
    'READ': EyeIcon,
    'WRITE': PencilIcon,
    'DELETE': 'TrashIcon',
    'UPDATE': PencilIcon,
    'CREATE': PencilIcon,
  }
  return icons[privilegeName] || EyeIcon
}
</script>