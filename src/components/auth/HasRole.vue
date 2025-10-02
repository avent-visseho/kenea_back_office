<!-- src/components/auth/HasRole.vue -->
<template>
  <slot v-if="hasPermission"></slot>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  // Un seul rôle requis
  role: {
    type: String,
    default: null,
  },
  // Plusieurs rôles possibles (OR logic)
  roles: {
    type: Array,
    default: () => [],
  },
  // Mode: 'any' (au moins un) ou 'all' (tous)
  mode: {
    type: String,
    default: 'any',
    validator: (value) => ['any', 'all'].includes(value),
  },
})

const { hasRole, hasAnyRole, hasAllRoles } = useAuth()

const hasPermission = computed(() => {
  // Si un seul rôle est spécifié
  if (props.role) {
    return hasRole(props.role)
  }

  // Si plusieurs rôles sont spécifiés
  if (props.roles.length > 0) {
    if (props.mode === 'all') {
      return hasAllRoles(...props.roles)
    }
    return hasAnyRole(...props.roles)
  }

  // Par défaut, ne rien afficher si aucun rôle n'est spécifié
  return false
})
</script>