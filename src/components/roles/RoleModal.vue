<!-- src/components/roles/RoleModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ isViewMode ? 'Détails du rôle' : (roleData ? 'Modifier le rôle' : 'Créer un rôle') }}
        </h3>
        <button @click="closeModal" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Informations du rôle -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations du rôle</h4>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom du rôle <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  :disabled="isViewMode"
                  placeholder="Ex: ADMIN, USER, MANAGER"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50"
                  required
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Nom unique du rôle (généralement en majuscules)
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="formData.description"
                  :disabled="isViewMode"
                  rows="3"
                  placeholder="Description du rôle et de ses responsabilités"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800/50 resize-none"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Privilèges -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Privilèges associés
            </h4>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  Privilèges sélectionnés
                </span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  {{ formData.privilegeIds.length }} privilège(s)
                </span>
              </div>

              <div v-if="!isViewMode" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Ajouter des privilèges <span class="text-red-500">*</span>
                </label>
                
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <input
                      v-model.number="newPrivilegeId"
                      type="number"
                      placeholder="ID du privilège"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm"
                      @keyup.enter="addPrivilege"
                    />
                    <button
                      type="button"
                      @click="addPrivilege"
                      class="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm font-medium"
                    >
                      Ajouter
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Entrez l'ID du privilège et cliquez sur "Ajouter"
                  </p>
                </div>

                <div v-if="formData.privilegeIds.length > 0" class="mt-4">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Liste des privilèges :</p>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="privilegeId in formData.privilegeIds" 
                      :key="privilegeId"
                      class="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                    >
                      ID: {{ privilegeId }}
                      <button
                        type="button"
                        @click="removePrivilege(privilegeId)"
                        class="ml-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div v-else class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Privilèges assignés :</p>
                <div v-if="formData.privilegeIds.length > 0" class="flex flex-wrap gap-2">
                  <span 
                    v-for="privilegeId in formData.privilegeIds" 
                    :key="privilegeId"
                    class="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                  >
                    ID: {{ privilegeId }}
                  </span>
                </div>
                <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucun privilège assigné</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {{ isViewMode ? 'Fermer' : 'Annuler' }}
            </button>
            <button
              v-if="!isViewMode"
              type="submit"
              :disabled="isLoading || formData.privilegeIds.length === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Enregistrement...' : (roleData ? 'Enregistrer' : 'Créer') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoles } from '@/composables/roles/useRoles'

const props = defineProps({
  roleData: {
    type: Object,
    default: null
  },
  isViewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const { createRole, updateRole, isLoading } = useRoles()

const formData = ref({
  name: '',
  description: '',
  privilegeIds: []
})

const newPrivilegeId = ref(null)

watch(() => props.roleData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name || '',
      description: newData.description || '',
      privilegeIds: [...(newData.privilegeIds || [])]
    }
  } else {
    formData.value = {
      name: '',
      description: '',
      privilegeIds: []
    }
  }
}, { immediate: true })

const addPrivilege = () => {
  if (newPrivilegeId.value && !formData.value.privilegeIds.includes(newPrivilegeId.value)) {
    formData.value.privilegeIds.push(newPrivilegeId.value)
    newPrivilegeId.value = null
  }
}

const removePrivilege = (privilegeId) => {
  formData.value.privilegeIds = formData.value.privilegeIds.filter(id => id !== privilegeId)
}

const handleSubmit = async () => {
  if (props.isViewMode) return

  if (formData.value.privilegeIds.length === 0) {
    alert('Veuillez ajouter au moins un privilège')
    return
  }

  try {
    let result

    if (props.roleData) {
      result = await updateRole(props.roleData.id, formData.value)
    } else {
      result = await createRole(formData.value)
    }

    if (result.success) {
      emit('success')
      alert(props.roleData ? 'Rôle modifié avec succès !' : 'Rôle créé avec succès !')
    } else {
      alert(result.error || 'Erreur lors de l\'opération')
    }
  } catch (error) {
    console.error('❌ Erreur lors de la soumission:', error)
    alert('Une erreur est survenue')
  }
}

const closeModal = () => {
  emit('close')
}
</script>