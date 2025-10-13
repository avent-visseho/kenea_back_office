// src/composables/privileges/usePrivileges.js
import { ref } from 'vue'
import { PrivilegesServices } from '@/api/services/privileges'

const privilegesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function usePrivileges() {
  const fetchPrivileges = async (params = { supprime: false }) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.getPrivileges(params)

      if (Array.isArray(response.data)) {
        privilegesList.value = response.data
        return { success: true, data: privilegesList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        privilegesList.value = response.data.body
        return { success: true, data: privilegesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des privilèges' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des privilèges'
      console.error('❌ Erreur fetchPrivileges:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchPrivilegeById = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.getPrivilegeById(id)

      if (response.data) {
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: 'Privilège non trouvé' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement du privilège'
      console.error('❌ Erreur fetchPrivilegeById:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createPrivilege = async (privilegeData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.createPrivilege(privilegeData)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        await fetchPrivileges()
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg

      console.error('❌ Erreur createPrivilege:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updatePrivilege = async (id, privilegeData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.updatePrivilege(id, privilegeData)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const updatedPrivilege = response.data.body || response.data

        const index = privilegesList.value.findIndex((p) => p.id === id)

        if (index !== -1 && updatedPrivilege && typeof updatedPrivilege === 'object') {
          privilegesList.value[index] = updatedPrivilege
        } else {
          await fetchPrivileges()
        }

        return { success: true, data: updatedPrivilege }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la modification'
      error.value = errorMsg

      console.error('❌ Erreur updatePrivilege:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deletePrivilege = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.deletePrivilege(id)

      if (
        response.data.status === 'SUCCESS' ||
        response.status === 200 ||
        response.status === 204
      ) {
        // Marquer comme supprimé localement ou recharger la liste
        const privilege = privilegesList.value.find(p => p.id === id)
        if (privilege) {
          privilege.deleted = true
        }
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg

      console.error('❌ Erreur deletePrivilege:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const restorePrivilege = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PrivilegesServices.restorePrivilege(id)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        await fetchPrivileges()
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la restauration' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la restauration'
      error.value = errorMsg

      console.error('❌ Erreur restorePrivilege:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const exportPrivilegesCsv = () => {
    try {
      const headers = ['ID', 'Nom', 'Statut']

      const rows = privilegesList.value.map((privilege) => [
        privilege.id || '',
        privilege.name || '',
        privilege.deleted ? 'Supprimé' : 'Actif',
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `privileges_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportPrivilegesCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  return {
    isLoading,
    error,
    privilegesList,
    fetchPrivileges,
    fetchPrivilegeById,
    createPrivilege,
    updatePrivilege,
    deletePrivilege,
    restorePrivilege,
    exportPrivilegesCsv,
  }
}