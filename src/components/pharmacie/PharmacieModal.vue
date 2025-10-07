<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ isEditMode ? 'Modifier la pharmacie' : 'Nouvelle pharmacie' }}
          </h3>
          <button @click="$emit('close')"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Nom -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom de la pharmacie <span class="text-red-500">*</span>
              </label>
              <input v-model="form.name" type="text" required
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Ex: Pharmacie Centrale" />
            </div>

            <!-- Devise -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Devise <span class="text-red-500">*</span>
              </label>
              <input v-model="form.devise" type="text" required
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Ex: XOF" />
            </div>
          </div>
          <!-- Ville -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ville <span class="text-red-500">*</span>
            </label>
            <select v-model="form.cityId" required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              <option value="">Sélectionner une ville</option>
              <option v-for="ville in citiesList" :key="ville.id || ville.code" :value="ville.id || ville.code">
                {{ ville.nom || ville.name }}
              </option>
            </select>
          </div>

          <!-- Adresse -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Altitude <span class="text-red-500">*</span>
            </label>
            <input v-model="form.altitude" type="text" required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: 123.5465" />
          </div>

          <!-- Téléphone -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Téléphone <span class="text-red-500">*</span>
            </label>
            <input v-model="form.phone" type="tel" required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: +212 5XX-XXXXXX" />
          </div>

          <!-- Email -->
          <!-- <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input v-model="form.email" type="email"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Ex: contact@pharmacie.com" />
          </div> -->

          <!-- Coordonnées GPS -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Latitude
              </label>
              <input v-model="form.latitude" type="number" step="any"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Ex: 33.5731" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Longitude
              </label>
              <input v-model="form.longitude" type="number" step="any"
                class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Ex: -7.5898" />
            </div>
          </div>

          <!-- Statut -->
       <!--    <div class="flex items-center gap-2">
            <input v-model="form.active" type="checkbox" id="active"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800" />
            <label for="active" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pharmacie active
            </label>
          </div> -->

          <!-- Erreur -->
          <div v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {{ error }}
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading"
              class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50">
              <svg v-if="isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Enregistrement...' : (isEditMode ? 'Modifier' : 'Créer') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePharmaciesVille } from '@/composables/pharmacie/usePharmacies'
import { usePaysVille } from '@/composables/pays_ville/usePaysVille'

const props = defineProps({
  pharmacieData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'success'])

const { createPharmacies, updatePharmacies, isLoading } = usePharmaciesVille()
const { citiesList, fetchCitiesList } = usePaysVille()

const error = ref(null)
const isEditMode = computed(() => !!props.pharmacieData)

const form = ref({
  name: '',
  devise: '',
  cityId: '',
  altitude: '',
  phone: '',
/*   email: '', */
  latitude: '',
  longitude: '',
  active: true
})

const handleSubmit = async () => {
  error.value = null

  const data = {
    name: form.value.name,
    devise: form.value.devise,
    cityId: form.value.cityId,
    altitude: form.value.altitude,
    phone: form.value.phone,
  /*   email: form.value.email || null, */
    latitude: form.value.latitude || null,
    longitude: form.value.longitude || null,
  }

  let result
  if (isEditMode.value) {
    const id = props.pharmacieData.id || props.pharmacieData.uuid
    result = await updatePharmacies(id, data)
  } else {
    result = await createPharmacies(data)
  }

  if (result.success) {
    emit('success')
  } else {
    error.value = result.error || 'Une erreur est survenue'
  }
}

onMounted(async () => {
  if (citiesList.value.length === 0) {
    await fetchCitiesList()
  }

  if (isEditMode.value && props.pharmacieData) {
    form.value = {
      name: props.pharmacieData.name || props.pharmacieData.name || '',
      devise: props.pharmacieData.devise || props.pharmacieData.devise || '',
      cityId: props.pharmacieData.cityId || props.pharmacieData.city_id || '',
      altitude: props.pharmacieData.altitude || props.pharmacieData.altitude || '',
      phone: props.pharmacieData.phone || props.pharmacieData.phone || '',
      /* email: props.pharmacieData.email || '', */
      latitude: props.pharmacieData.latitude || '',
      longitude: props.pharmacieData.longitude || ''
    }
  }
})
</script>