// src/composables/roles/useRoles.js
import { ref } from 'vue'
import { RolesServices } from '@/api/services/roles'

const rolesList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useRoles() {
  const fetchRoles = async (params = {}) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await RolesServices.getRoles(params)

      if (Array.isArray(response.data)) {
        rolesList.value = response.data
        return { success: true, data: rolesList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        rolesList.value = response.data.body
        return { success: true, data: rolesList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des rôles' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des rôles'
      console.error('❌ Erreur fetchRoles:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchRoleById = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await RolesServices.getRoleById(id)

      if (response.data) {
        return { success: true, data: response.data }
      }

      return { success: false, error: 'Rôle non trouvé' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement du rôle'
      console.error('❌ Erreur fetchRoleById:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createRole = async (roleData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await RolesServices.createRole(roleData)

      if (response.data.status === 'SUCCESS' || response.status === 200 || response.status === 201) {
        await fetchRoles()
        return { success: true, data: response.data.body || response.data }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la création' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la création'
      error.value = errorMsg

      console.error('❌ Erreur createRole:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateRole = async (id, roleData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await RolesServices.updateRole(id, roleData)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const updatedRole = response.data.body || response.data

        const index = rolesList.value.findIndex((r) => r.id === id)

        if (index !== -1 && updatedRole && typeof updatedRole === 'object') {
          rolesList.value[index] = updatedRole
        } else {
          await fetchRoles()
        }

        return { success: true, data: updatedRole }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la modification'
      error.value = errorMsg

      console.error('❌ Erreur updateRole:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteRole = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await RolesServices.deleteRole(id)

      if (
        response.data.status === 'SUCCESS' ||
        response.status === 200 ||
        response.status === 204
      ) {
        rolesList.value = rolesList.value.filter((r) => r.id !== id)
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg

      console.error('❌ Erreur deleteRole:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const exportRolesCsv = () => {
    try {
      const headers = ['Nom', 'Description', 'Nombre de privilèges', 'Privilèges IDs']

      const rows = rolesList.value.map((role) => [
        role.name || '',
        role.description || '',
        role.privilegeIds?.length || 0,
        role.privilegeIds?.join(', ') || '',
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `roles_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportRolesCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  return {
    isLoading,
    error,
    rolesList,
    fetchRoles,
    fetchRoleById,
    createRole,
    updateRole,
    deleteRole,
    exportRolesCsv,
  }
}