<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div
      class="relative w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
      >
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
            fill=""
          />
        </svg>
      </button>

      <!-- Header -->
      <div class="mb-6 pr-14">
        <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Filtrer {{ activeTab === 'pays' ? 'les pays' : 'les villes' }}
        </h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Affinez votre recherche avec des filtres avancés
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="applyFilters" class="space-y-5">
        <!-- Filtres pour Pays -->
        <template v-if="activeTab === 'pays'">
          <!-- Code du pays -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Code du pays
            </label>
            <input
              v-model="filters.code"
              type="text"
              placeholder="Ex: TG, BJ, FR"
              class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>

          <!-- Indicatif -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Indicatif téléphonique
            </label>
            <input
              v-model="filters.indicatif"
              type="text"
              placeholder="Ex: +228, +229"
              class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </template>

        <!-- Filtres pour Villes -->
        <template v-else>
          <!-- Pays (pour filtrer les villes) -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Pays
            </label>
            <select
              v-model="filters.paysId"
              class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Tous les pays</option>
              <option
                v-for="pays in paysList"
                :key="pays.id || pays.code"
                :value="pays.id || pays.code"
              >
                {{ pays.nom || pays.name }}
              </option>
            </select>
          </div>
        </template>

        <!-- Tri -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Trier par
          </label>
          <select
            v-model="filters.sortBy"
            class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="name_asc">Nom (A-Z)</option>
            <option value="name_desc">Nom (Z-A)</option>
            <option value="code_asc">Code (A-Z)</option>
            <option value="code_desc">Code (Z-A)</option>
            <option value="recent">Plus récent</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-2">
          <button
            @click="resetFilters"
            type="button"
            class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            class="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            Appliquer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'apply'])

const { fetchPaysList, paysList } = usePaysVille()

const filters = ref({
  code: '',
  indicatif: '',
  paysId: '',
  sortBy: 'name_asc'
})

onMounted(async () => {
  await fetchPaysList()
})

const applyFilters = () => {
  emit('apply', { ...filters.value })
}

const resetFilters = () => {
  filters.value = {
    code: '',
    indicatif: '',
    paysId: '',
    sortBy: 'name_asc'
  }
}
</script>