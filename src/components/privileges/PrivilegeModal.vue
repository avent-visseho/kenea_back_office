<!-- src/components/privileges/PrivilegeModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ privilegeData ? 'Modifier le privilège' : 'Créer un privilège' }}
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
          <!-- Informations du privilège -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations du privilège</h4>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom du privilège <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Ex: READ, WRITE, DELETE, UPDATE"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Nom unique du privilège (généralement en majuscules)
                </p>
              </div>

              <!-- Info Card -->
              <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-indigo-900 dark:text-indigo-300">
                      À propos des privilèges
                    </p>
                    <p class="mt-1 text-xs text-indigo-700 dark:text-indigo-400">
                      Les privilèges définissent les permissions de base du système. Ils sont ensuite assignés aux rôles pour créer des groupes de permissions.
                    </p>
                    <ul class="mt-2 text-xs text-indigo-700 dark:text-indigo-400 list-disc list-inside space-y-1">
                      <li>READ : Permission de lecture</li>
                      <li>WRITE : Permission d'écriture</li>
                      <li>DELETE : Permission de suppression</li>
                      <li>UPDATE : Permission de modification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="formData.name" class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Aperçu</h4>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">
                    {{ formData.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Nouveau privilège
                  </p>
                </div>
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
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isLoading || !formData.name"
              class="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Enregistrement...' : (privilegeData ? 'Enregistrer' : 'Créer') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePrivileges } from '@/composables/privileges/usePrivileges'

const props = defineProps({
  privilegeData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'success'])

const { createPrivilege, updatePrivilege, isLoading } = usePrivileges()

const formData = ref({
  name: '',
  deleted: false
})

watch(() => props.privilegeData, (newData) => {
  if (newData) {
    formData.value = {
      id: newData.id,
      name: newData.name || '',
      deleted: newData.deleted || false
    }
  } else {
    formData.value = {
      name: '',
      deleted: false
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (!formData.value.name.trim()) {
    alert('Veuillez saisir un nom de privilège')
    return
  }

  try {
    let result

    if (props.privilegeData) {
      result = await updatePrivilege(props.privilegeData.id, formData.value)
    } else {
      result = await createPrivilege({ name: formData.value.name })
    }

    if (result.success) {
      emit('success')
      alert(props.privilegeData ? 'Privilège modifié avec succès !' : 'Privilège créé avec succès !')
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