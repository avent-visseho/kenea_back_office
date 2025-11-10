<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    @click="$emit('click', pharmacy.id)"
  >
    <!-- Image de couverture -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="pharmacy.image"
        :alt="pharmacy.nom"
        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
      <!-- Badge de note -->
      <div class="absolute top-3 right-3 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1">
        <svg
          class="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <span class="font-semibold text-gray-800 dark:text-gray-200">{{ pharmacy.note }}</span>
      </div>
      <!-- Badge de distance -->
      <div class="absolute top-3 left-3 bg-brand-500 text-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
        {{ pharmacy.distance }}
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="p-5">
      <!-- Nom de la pharmacie -->
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {{ pharmacy.nom }}
      </h3>

      <!-- Adresse -->
      <div class="flex items-start gap-2 mb-3">
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {{ pharmacy.adresse }}
        </p>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
        {{ pharmacy.description }}
      </p>

      <!-- Services (badges) -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(service, index) in pharmacy.services.slice(0, 3)"
          :key="index"
          class="px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs rounded-full"
        >
          {{ service }}
        </span>
        <span
          v-if="pharmacy.services.length > 3"
          class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
        >
          +{{ pharmacy.services.length - 3 }}
        </span>
      </div>

      <!-- Horaires -->
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ pharmacy.horaires }}</span>
      </div>

      <!-- Bouton d'action -->
      <button
        class="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        @click.stop="$emit('click', pharmacy.id)"
      >
        <span>Voir les produits</span>
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pharmacy: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
