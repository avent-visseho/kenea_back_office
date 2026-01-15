<!-- src/components/users/UserModal.vue -->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
      :class="isViewMode ? 'max-w-2xl' : 'max-w-4xl'">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ isViewMode ? 'Détails de l\'utilisateur' : 'Modifier l\'utilisateur' }}
        </h3>
        <button @click="closeModal"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body - Mode Visualisation -->
      <div v-if="isViewMode" class="p-6 space-y-6">
        <!-- Section Avatar et Infos principales -->
        <div class="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {{ getInitials(userData.person?.firstname, userData.person?.lastname) }}
          </div>
          <div class="text-center">
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ userData.person?.firstname }} {{ userData.person?.lastname }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">@{{ userData.username }}</p>
            <div class="flex items-center justify-center gap-3 mt-3">
              <span v-if="userData.enabled"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Actif
              </span>
              <span v-else
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
                Inactif
              </span>
              <span v-if="userData.locked"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
                Verrouillé
              </span>
            </div>
          </div>
        </div>

        <!-- Informations de contact -->
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <h5 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Informations de contact
          </h5>
          <div class="space-y-3">
            <div v-if="userData.person?.email" class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white break-all">{{ userData.person.email }}</p>
              </div>
            </div>

            <div v-if="userData.person?.phone" class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400">Téléphone</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userData.person.phone }}</p>
              </div>
            </div>

            <div v-if="userData.person?.address" class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400">Adresse</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userData.person.address }}</p>
                <p v-if="userData.person?.location" class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {{ userData.person.location }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Coordonnées GPS -->
        <div v-if="userData.person?.latitude || userData.person?.longitude || userData.person?.altitude"
          class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <h5 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Coordonnées GPS
          </h5>
          <div class="grid grid-cols-3 gap-4">
            <div v-if="userData.person?.latitude" class="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Latitude</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ userData.person.latitude }}°</p>
            </div>
            <div v-if="userData.person?.longitude" class="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Longitude</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ userData.person.longitude }}°</p>
            </div>
            <div v-if="userData.person?.altitude" class="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Altitude</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ userData.person.altitude }}m</p>
            </div>
          </div>
        </div>

        <!-- Rôles -->
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <h5 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Rôles attribués
          </h5>
          <div class="flex flex-wrap gap-2">
            <span v-for="role in userData.roles" :key="role.id"
              class="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd" />
              </svg>
              {{ role.name }}
            </span>
            <span v-if="!userData.roles || userData.roles.length === 0"
              class="text-sm text-gray-500 dark:text-gray-400 italic">
              Aucun rôle attribué
            </span>
          </div>
        </div>

        <!-- Salaire -->
        <div v-if="userData.salaire" class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
          <h5 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Salaire
          </h5>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Salaire mensuel</p>
              <p class="text-3xl font-bold text-green-700 dark:text-green-400">
                {{ formatCurrency(userData.salaire) }}
              </p>
            </div>
            <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Footer - Mode View -->
        <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
          <button type="button" @click="closeModal"
            class="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
            Fermer
          </button>
        </div>
      </div>

      <!-- Body - Mode Édition -->
      <div v-else class="p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Avatar et identité -->
          <div class="flex items-center gap-6 p-6 bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
              {{ getInitials(formData.person.firstname, formData.person.lastname) }}
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Modification de l'utilisateur
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Mettez à jour les informations de l'utilisateur ci-dessous
              </p>
            </div>
          </div>

          <!-- Informations personnelles -->
          <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Informations personnelles</h4>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prénom <span class="text-red-500">*</span>
                </label>
                <input v-model="formData.person.firstname" type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="Ex: Jean"
                  required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom <span class="text-red-500">*</span>
                </label>
                <input v-model="formData.person.lastname" type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="Ex: Dupont"
                  required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone
                </label>
                <input v-model="formData.person.phone" type="tel"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="+33 6 12 34 56 78" />
              </div>

              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input v-model="formData.person.email" type="email"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="exemple@email.com"
                  required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Localisation
                </label>
                <input v-model="formData.person.location" type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="Ex: Paris, France" />
              </div>

              <div class="lg:col-span-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse complète
                </label>
                <input v-model="formData.person.address" type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="123 Rue de la République, 75001 Paris" />
              </div>
            </div>
          </div>

          <!-- Informations du compte -->
          <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Informations du compte</h4>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom d'utilisateur <span class="text-red-500">*</span>
                </label>
                <input v-model="formData.username" type="text"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="username"
                  required />
              </div>

              <div class="flex items-end gap-6 pb-2">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative">
                    <input v-model="formData.enabled" type="checkbox"
                      class="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 transition-all" />
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Compte activé</span>
                    <p class="text-xs text-gray-500 dark:text-gray-400">L'utilisateur peut se connecter</p>
                  </div>
                </label>

                <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative">
                    <input v-model="formData.locked" type="checkbox"
                      class="w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500 transition-all" />
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Verrouillé</span>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Bloquer l'accès au compte</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Coordonnées GPS -->
          <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Coordonnées GPS</h4>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Latitude
                </label>
                <input v-model.number="formData.person.latitude" type="number" step="any"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="48.8566" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Longitude
                </label>
                <input v-model.number="formData.person.longitude" type="number" step="any"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="2.3522" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Altitude (m)
                </label>
                <input v-model.number="formData.person.altitude" type="number" step="any"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="35" />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button type="button" @click="closeModal"
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading"
              class="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-purple-600 rounded-lg hover:from-brand-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30 transition-all">
              <span v-if="isLoading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer les modifications
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUsers } from '@/composables/users/useUsers'

const props = defineProps({
  userData: {
    type: Object,
    default: null
  },
  isViewMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const { updateUser, isLoading } = useUsers()

const formData = ref({
  id: '',
  username: '',
  enabled: true,
  locked: false,
  person: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    latitude: null,
    longitude: null,
    altitude: null
  }
})

// Fonction pour obtenir les initiales
const getInitials = (firstname, lastname) => {
  const first = firstname ? firstname.charAt(0).toUpperCase() : ''
  const last = lastname ? lastname.charAt(0).toUpperCase() : ''
  return `${first}${last}` || '?'
}

// Fonction pour formater le montant en devise
const formatCurrency = (amount) => {
  if (!amount) return '0 FCFA'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount).replace('XOF', 'FCFA')
}

// Watcher pour initialiser les données du formulaire
watch(() => props.userData, (newData) => {
  if (newData) {
    formData.value = {
      id: newData.id || '',
      username: newData.username || '',
      enabled: newData.enabled ?? true,
      locked: newData.locked ?? false,
      person: {
        id: newData.person?.id || '',
        firstname: newData.person?.firstname || '',
        lastname: newData.person?.lastname || '',
        email: newData.person?.email || '',
        phone: newData.person?.phone || '',
        address: newData.person?.address || '',
        location: newData.person?.location || '',
        latitude: newData.person?.latitude,
        longitude: newData.person?.longitude,
        altitude: newData.person?.altitude
      }
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  if (props.isViewMode) return

  try {
    console.log('📤 Données à soumettre:', formData.value)

    const result = await updateUser(formData.value.id, formData.value)

    if (result.success) {
      emit('success')
      alert('Utilisateur modifié avec succès !')
    } else {
      alert(result.error || 'Erreur lors de la modification')
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
