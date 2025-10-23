<template>
  <aside :class="[
    'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
    {
      'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
      'lg:w-[90px]': !isExpanded && !isHovered,
      'translate-x-0 w-[290px]': isMobileOpen,
      '-translate-x-full': !isMobileOpen,
      'lg:translate-x-0': true,
    },
  ]" @mouseenter="!isExpanded && (isHovered = true)" @mouseleave="isHovered = false">
    <div :class="['py-8 flex', !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start']">
      <router-link to="/">
        <img v-if="isExpanded || isHovered || isMobileOpen" class="dark:hidden" src="/images/logo/logo_Kenea_1.png"
          alt="Logo" width="50" height="40" />
        <img v-if="isExpanded || isHovered || isMobileOpen" class="hidden dark:block"
          src="/images/logo/logo_Kenea_1.png" alt="Logo" width="50" height="40" />
        <img v-else src="/images/logo/logo_Kenea_1.png" alt="Logo" width="32" height="32" />
      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in filteredMenuGroups" :key="groupIndex">
            <h2 v-if="menuGroup.items.length > 0" :class="[
              'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
              !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
            ]">
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button v-if="item.subItems" @click="toggleSubmenu(groupIndex, index)" :class="[
                  'menu-item group w-full',
                  {
                    'menu-item-active': isSubmenuOpen(groupIndex, index),
                    'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                  },
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                ]">
                  <span :class="[
                    isSubmenuOpen(groupIndex, index)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive',
                  ]">
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">
                    {{ item.name }}
                  </span>
                  <ChevronDownIcon v-if="isExpanded || isHovered || isMobileOpen" :class="[
                    'ml-auto w-5 h-5 transition-transform duration-200',
                    {
                      'rotate-180 text-brand-500': isSubmenuOpen(groupIndex, index),
                    },
                  ]" />
                </button>
                <router-link v-else-if="item.path" :to="item.path" :class="[
                  'menu-item group',
                  {
                    'menu-item-active': isActive(item.path),
                    'menu-item-inactive': !isActive(item.path),
                  },
                ]">
                  <span :class="[
                    isActive(item.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive',
                  ]">
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">
                    {{ item.name }}
                  </span>
                </router-link>
                <transition @enter="startTransition" @after-enter="endTransition" @before-leave="startTransition"
                  @after-leave="endTransition">
                  <div v-show="isSubmenuOpen(groupIndex, index) && (isExpanded || isHovered || isMobileOpen)
                    ">
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link :to="subItem.path" :class="[
                          'menu-dropdown-item',
                          {
                            'menu-dropdown-item-active': isActive(subItem.path),
                            'menu-dropdown-item-inactive': !isActive(subItem.path),
                          },
                        ]">
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span v-if="subItem.new" :class="[
                              'menu-dropdown-badge',
                              {
                                'menu-dropdown-badge-active': isActive(subItem.path),
                                'menu-dropdown-badge-inactive': !isActive(subItem.path),
                              },
                            ]">
                              new
                            </span>
                            <span v-if="subItem.pro" :class="[
                              'menu-dropdown-badge',
                              {
                                'menu-dropdown-badge-active': isActive(subItem.path),
                                'menu-dropdown-badge-inactive': !isActive(subItem.path),
                              },
                            ]">
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import {
  GridIcon,
  CalenderIcon,
  UserCircleIcon,
  PieChartIcon,
  ChevronDownIcon,
  HorizontalDots,
  PageIcon,
  TableIcon,
  ListIcon,
  PlugInIcon,
} from '../../icons'
import BoxCubeIcon from '@/icons/BoxCubeIcon.vue'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const { hasAnyRole } = useAuth()
const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar()

// Configuration des menus avec les rôles requis
const menuGroups = [
  {
    title: 'Menu Principal',
    items: [
      {
        icon: GridIcon,
        name: 'Tableau de bord',
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
        subItems: [
          {
            name: 'Pays',
            path: '/pays',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Pharmacie',
            path: '/pharmacie',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Catégorie',
            path: '/categorie',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Produits',
            path: '/produits',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Privilèges',
            path: '/privileges',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Rôles',
            path: '/roles',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
          {
            name: 'Utilisateurs',
            path: '/users',
            allowedRoles: ['ADMIN', 'SUPER_ADMIN']
          },
        ],
      },
      {
        icon: CalenderIcon,
        name: 'Ordonnance',
        path: '/ordonnance',
        allowedRoles: ['USER'],
      },
      {
        icon: CalenderIcon,
        name: 'Traitement',
        path: '/ordonnance-progression',
        allowedRoles: ['PHARMACIE', 'ADMIN', 'SUPER_ADMIN'],
      },
      {
        icon: CalenderIcon,
        name: 'Groupe',
        path: '/groupe',
        allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
      },
      {
        icon: CalenderIcon,
        name: 'Inbox',
        path: '/inbox',
        allowedRoles: ['USER'],
      },
    ],
  },
]

// Filtrer les items du menu selon les rôles de l'utilisateur
const filteredMenuGroups = computed(() => {
  return menuGroups
    .map((group) => {
      const filteredItems = group.items
        .filter((item) => {
          // Si l'item a des rôles requis, vérifier si l'utilisateur les a
          if (item.allowedRoles && item.allowedRoles.length > 0) {
            return hasAnyRole(...item.allowedRoles)
          }
          return true
        })
        .map((item) => {
          // Filtrer les sous-items si présents
          if (item.subItems) {
            const filteredSubItems = item.subItems.filter((subItem) => {
              if (subItem.allowedRoles && subItem.allowedRoles.length > 0) {
                return hasAnyRole(...subItem.allowedRoles)
              }
              return true
            })

            // Ne garder l'item parent que s'il a des sous-items visibles
            if (filteredSubItems.length > 0) {
              return {
                ...item,
                subItems: filteredSubItems,
              }
            }
            return null
          }
          return item
        })
        .filter((item) => item !== null)

      return {
        ...group,
        items: filteredItems,
      }
    })
    .filter((group) => group.items.length > 0)
})

const isActive = (path) => route.path === path

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`
  openSubmenu.value = openSubmenu.value === key ? null : key
}

const isAnySubmenuRouteActive = computed(() => {
  return filteredMenuGroups.value.some((group) =>
    group.items.some(
      (item) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path)),
    ),
  )
})

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      filteredMenuGroups.value[groupIndex]?.items[itemIndex]?.subItems?.some((subItem) =>
        isActive(subItem.path),
      ))
  )
}

const startTransition = (el) => {
  el.style.height = 'auto'
  const height = el.scrollHeight
  el.style.height = '0px'
  el.offsetHeight // force reflow
  el.style.height = height + 'px'
}

const endTransition = (el) => {
  el.style.height = ''
}
</script>