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
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'], // Tous les utilisateurs authentifiés
      },
    },
    {
      path: '/pharmacie',
      name: 'Pharmacie',
      component: () => import('../views/pharmacie/Pharmacie.vue'),
      meta: {
        title: 'Pharmacie',
        requiresAuth: true,
        /* allowedRoles: ['ADMIN', 'SUPER_ADMIN', 'PHARMACIEN'], */ // Exemple
      },
    },{
      path: '/categorie',
      name: 'categorie',
      component: () => import('../views/pharmacie/CategorieView.vue'),
      meta: {
        title: 'Categorie',
        requiresAuth: true,
        /* allowedRoles: ['ADMIN', 'SUPER_ADMIN', 'PHARMACIEN'], */ // Exemple
      },
    },{
      path: '/produits',
      name: 'produits',
      component: () => import('../views/pharmacie/ProduitsView.vue'),
      meta: {
        title: 'produits',
        requiresAuth: true,
        /* allowedRoles: ['ADMIN', 'SUPER_ADMIN', 'PHARMACIEN'], */ // Exemple
      },
    },{
      path: '/users',
      name: 'users',
      component: () => import('../views/users/Userview.vue'),
      meta: {
        title: 'users',
        requiresAuth: true,
        /* allowedRoles: ['ADMIN', 'SUPER_ADMIN', 'PHARMACIEN'], */ // Exemple
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
      path: '/pays',
      name: 'Pays',
      component: () => import('../views/pays/PaysView.vue'),
      meta: {
        title: 'Pays',
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN', 'USER'],
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
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true,
        allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
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
        requiresAuth: true,
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: {
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
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
        requiresAuth: true,
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
        requiresAuth: true,
      },
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
        requiresAuth: true,
      },
    },
    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
        requiresAuth: true,
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
        requiresAuth: true,
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
        requiresAuth: true,
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
        guest: true, // Page accessible seulement si non connecté
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
    // Catch all - 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404',
    },
  ],
})

// ✅ GUARD DE NAVIGATION GLOBAL
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Mettre à jour le titre
  document.title = `Kenea ${to.meta.title || ''}`

  const requiresAuth = to.meta.requiresAuth
  const isGuest = to.meta.guest
  const allowedRoles = to.meta.allowedRoles

/*   console.log('Navigation vers:', to.path)
  console.log('Authentifié:', authStore.isAuthenticated)
  console.log('User:', authStore.user) */

  // ✅ Si la page nécessite d'être authentifié
  if (requiresAuth) {
    if (!authStore.isAuthenticated || !authStore.token) {
     /*  console.log('❌ Non authentifié, redirection vers /signin') */
      return next('/signin')
    }

    // ✅ Vérifier les rôles si spécifiés
    if (allowedRoles && allowedRoles.length > 0) {
      const userRoles = authStore.user?.roles || []
      const hasPermission = userRoles.some(role => allowedRoles.includes(role))
      
      if (!hasPermission) {
        /* console.log('❌ Rôle insuffisant, redirection vers /forbidden') */
        return next('/forbidden')
      }
    }
  }

  // ✅ Si c'est une page "guest" (signin, signup) et l'utilisateur est connecté
  if (isGuest && authStore.isAuthenticated) {
   /*  console.log('✅ Déjà connecté, redirection vers /dashboard') */
    return next('/pharmacie')
  }

  next()
})

export default router