<!-- src/components/layout/header/UserMenu.vue -->
<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img src="/images/user/owner.jpg" alt="User" />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">
        {{ displayName }}
      </span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ displayName }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ user?.username || 'Chargement...' }}
        </span>
        <span
          v-if="user?.roles && user.roles.length > 0"
          class="inline-block px-2 py-0.5 mt-2 text-xs font-medium rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
        >
          {{ user.roles[0] }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      
      <button
        @click="handleSignOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        Sign out
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { UserCircleIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, InfoCircleIcon } from '@/icons'
import { RouterLink } from 'vue-router'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

const { user, signOut, userRoles } = useAuth()

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// Computed pour extraire le nom d'affichage depuis l'email
const displayName = computed(() => {
  if (!user.value?.username) return 'Utilisateur'
  
  const username = user.value.username
  
  // Si c'est un email, extraire la partie avant @
  if (username.includes('@')) {
    const name = username.split('@')[0]
    // Capitaliser la première lettre
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  
  // Si c'est un username simple, capitaliser
  return username.charAt(0).toUpperCase() + username.slice(1)
})

// Classe CSS pour les badges de rôles
const getRoleBadgeClass = (role) => {
  const classes = {
    'SUPER_ADMIN': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'ADMIN': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    'PHARMACIEN': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'USER': 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400',
  }
  return classes[role] || 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
}

const menuItems = [
  { href: '/profile', icon: UserCircleIcon, text: 'Edit profile' },
  { href: '/settings', icon: SettingsIcon, text: 'Account settings' },
  { href: '/support', icon: InfoCircleIcon, text: 'Support' },
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleSignOut = async () => {
  try {
    await signOut()
    closeDropdown()
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>