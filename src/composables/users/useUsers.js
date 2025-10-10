// src/composables/users/useUsers.js
import { ref } from 'vue'
import { UsersServices } from '@/api/services/users'

const usersList = ref([])
const isLoading = ref(false)
const error = ref(null)

export function useUsers() {
  const fetchUsers = async (params = {}) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.getUsers(params)

      if (Array.isArray(response.data)) {
        usersList.value = response.data
        return { success: true, data: usersList.value }
      }

      if (response.data.body && Array.isArray(response.data.body)) {
        usersList.value = response.data.body
        return { success: true, data: usersList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des utilisateurs' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des utilisateurs'
      console.error('❌ Erreur fetchUsers:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserById = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.getUserById(id)

      if (response.data) {
        return { success: true, data: response.data }
      }

      return { success: false, error: 'Utilisateur non trouvé' }
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur lors du chargement de l'utilisateur"
      console.error('❌ Erreur fetchUserById:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchUsersByCityID = async (cityId) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.getUsersByCityID(cityId)

      if (Array.isArray(response.data)) {
        usersList.value = response.data
        return { success: true, data: usersList.value }
      }

      return { success: false, error: 'Erreur lors du chargement des utilisateurs' }
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des utilisateurs'
      console.error('❌ Erreur fetchUsersByCityID:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (id, userData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.updateUser(id, userData)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        const updatedUser = response.data.body || response.data

        const index = usersList.value.findIndex((u) => u.id === id)

        if (index !== -1 && updatedUser && typeof updatedUser === 'object') {
          usersList.value[index] = updatedUser
        } else {
          await fetchUsers()
        }

        return { success: true, data: updatedUser }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la modification' }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || 'Erreur lors de la modification'
      error.value = errorMsg

      console.error('❌ Erreur updateUser:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const updateCoordonnees = async (id, latitude, longitude, altitude) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.updateCoordonnees(id, latitude, longitude, altitude)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        await fetchUsers()
        return { success: true, data: response.data }
      }

      return {
        success: false,
        error: response.data.message || 'Erreur lors de la mise à jour des coordonnées',
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Erreur lors de la mise à jour des coordonnées'
      error.value = errorMsg

      console.error('❌ Erreur updateCoordonnees:', err)

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await UsersServices.deleteUser(id)

      if (
        response.data.status === 'SUCCESS' ||
        response.status === 200 ||
        response.status === 204
      ) {
        usersList.value = usersList.value.filter((u) => u.id !== id)
        return { success: true }
      }

      return { success: false, error: response.data.message || 'Erreur lors de la suppression' }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Erreur lors de la suppression'
      error.value = errorMsg

      console.error('❌ Erreur deleteUser:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })

      return { success: false, error: errorMsg }
    } finally {
      isLoading.value = false
    }
  }

 /*  const importUsersCsv = async (file) => {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await UsersServices.importUsersCsv(formData)

      if (response.data.status === 'SUCCESS' || response.status === 200) {
        await fetchUsers()
        return { success: true, data: response.data.body }
      }

      return { success: false, error: "Erreur lors de l'import du fichier CSV" }
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur lors de l'import du fichier CSV"
      console.error('❌ Erreur importUsersCsv:', err)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  } */

  const exportUsersCsv = () => {
    try {
      const headers = [
        'Prénom',
        'Nom',
        'Email',
        'Téléphone',
        'Rôles',
        'Statut',
        'Ville',
        'Date de création',
      ]

      const rows = usersList.value.map((user) => [
        user.person?.firstname || '',
        user.person?.lastname || '',
        user.person?.email || '',
        user.person?.phone || '',
        user.roles?.map((r) => r.name).join(', ') || '',
        user.enabled ? 'Actif' : 'Inactif',
        user.person?.city?.name || '',
        new Date(user.createAt || Date.now()).toLocaleDateString('fr-FR'),
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n')

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `utilisateurs_${new Date().toISOString().slice(0, 10)}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    } catch (err) {
      console.error('❌ Erreur exportUsersCsv:', err)
      return { success: false, error: "Erreur lors de l'export CSV" }
    }
  }

  return {
    isLoading,
    error,
    usersList,
    fetchUsers,
    fetchUserById,
    fetchUsersByCityID,
    updateUser,
    updateCoordonnees,
    deleteUser,
    /* importUsersCsv, */
    exportUsersCsv,
  }
}
