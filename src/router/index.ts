// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/marketplace/Home.vue'),
      meta: {
        title: 'Accueil - Marketplace',
        requiresAuth: false,
      },
    },
    {
      path: '/pharmacie/:id',
      name: 'pharmacy-details',
      component: () => import('../views/marketplace/PharmacyDetails.vue'),
      meta: {
        title: 'Détails de la pharmacie',
        requiresAuth: false,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN', 'PHARMACIE'],
      },
    },
    {
      path: '/pharmacie',
      name: 'Pharmacie',
      component: () => import('../views/pharmacie/Pharmacie.vue'),
      meta: {
        title: 'Pharmacie',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/categorie',
      name: 'categorie',
      component: () => import('../views/pharmacie/CategorieView.vue'),
      meta: {
        title: 'Categorie',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/produits',
      name: 'produits',
      component: () => import('../views/pharmacie/ProduitsView.vue'),
      meta: {
        title: 'Produits',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/Userview.vue'),
      meta: {
        title: 'Users',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('../views/roles/RolesView.vue'),
      meta: {
        title: 'Roles',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/privileges',
      name: 'privileges',
      component: () => import('../views/privileges/PrivilegesView.vue'),
      meta: {
        title: 'Privileges',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/groupe',
      name: 'Groupe',
      component: () => import('../views/groupe/Groupe.vue'),
      meta: {
        title: 'Groupe',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('../views/inbox/InboxView.vue'),
      meta: {
        title: 'Inbox',
        requiresAuth: true,
        allowedRoles: ['USER'],
      },
    },
    {
      path: '/pays',
      name: 'Pays',
      component: () => import('../views/pays/PaysView.vue'),
      meta: {
        title: 'Pays',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/ordonnance',
      name: 'ordonnance',
      component: () => import('../views/ordonnance/OrdonnancesView.vue'),
      meta: {
        title: 'Ordonnance',
        requiresAuth: true,
        allowedRoles: ['USER'],
      },
    },
    {
      path: '/ordonnance-progression',
      name: 'ordonnance-progression',
      component: () => import('../views/ordonnance/OrdonnanceProgressionsView.vue'),
      meta: {
        title: 'Ordonnance Progression',
        requiresAuth: true,
        allowedRoles: ['PHARMACIE'],
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'PHARMACIE', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
      meta: {
        title: 'Line Chart',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: {
        title: 'Bar Chart',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import('../views/Errors/ForbiddenView.vue'),
      meta: {
        title: '403 - Accès refusé',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
        guest: true,
      },
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      component: () => import('../views/Auth/Verify-otp.vue'),
      meta: {
        title: 'Verify-otp',
        guest: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
        guest: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404',
    },
  ],
})

// ✅ GUARD DE NAVIGATION GLOBAL AMÉLIORÉ
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Mettre à jour le titre
  document.title = `Kenea ${to.meta.title || ''}`

  const requiresAuth = to.meta.requiresAuth
  const isGuest = to.meta.guest
  const allowedRoles = to.meta.allowedRoles

  // ✅ Si la page nécessite d'être authentifié
  if (requiresAuth) {
    // Vérifier si l'utilisateur est authentifié
    if (!authStore.isAuthenticated || !authStore.token) {
      console.warn('❌ Accès refusé: Utilisateur non authentifié')
      return next({
        path: '/signin',
        query: { redirect: to.fullPath }, // Sauvegarder la page demandée
      })
    }

    // Vérifier si l'utilisateur existe dans le store
    if (!authStore.user || !authStore.user.roles) {
      console.error('❌ Erreur: Données utilisateur manquantes')
      authStore.logout()
      return next('/signin')
    }

    // ✅ Vérifier les rôles si spécifiés
    if (allowedRoles && allowedRoles.length > 0) {
      // Extraire les noms des rôles de l'utilisateur
      const userRoles = authStore.user.roles.map((role) => role.name)

      // Vérifier si l'utilisateur a au moins un des rôles requis
      const hasPermission = userRoles.some((role) => allowedRoles.includes(role))

      if (!hasPermission) {
        console.warn('❌ Accès refusé: Rôle insuffisant')
        console.warn(`Rôles requis: ${allowedRoles.join(', ')}`)
        console.warn(`Rôles utilisateur: ${userRoles.join(', ')}`)

        return next({
          path: '/forbidden',
          query: {
            from: to.fullPath,
            required: allowedRoles.join(','),
          },
        })
      }

      console.log('✅ Accès autorisé:', to.path)
    }
  }

  // ✅ Si c'est une page "guest" et l'utilisateur est connecté
  if (isGuest && authStore.isAuthenticated) {
    console.log('✅ Déjà connecté, redirection vers le dashboard')

    // Rediriger vers la page appropriée selon le rôle
    const userRoles = authStore.user?.roles?.map((role) => role.name) || []

    if (userRoles.includes('ADMIN') || userRoles.includes('SUPER_ADMIN')) {
      return next('/dashboard')
    } else if (userRoles.includes('PHARMACIE')) {
      return next('/ordonnance-progression')
    } else if (userRoles.includes('USER')) {
      return next('/ordonnance')
    } else {
      return next('/dashboard')
    }
  }

  next()
})

// ✅ Gestion des erreurs de navigation
router.onError((error) => {
  console.error('Erreur de navigation:', error)
})

export default router
