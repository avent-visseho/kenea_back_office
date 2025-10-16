<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <OrdonnanceProgressionMetrics :progressions="allProgressions" />
      </div>
      <div class="col-span-12">
        <OrdonnanceProgressionList 
          :progressions="displayedProgressions" 
          :is-loading="isLoading" 
          @refresh="refreshProgressions"
          @filter-change="handleFilterChange" 
        />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { useOrdonnanceProgressions } from '@/composables/ordannance/useOrdonnanceProgressions'
import OrdonnanceProgressionMetrics from '@/components/ordonnance/OrdonnanceProgressionMetrics.vue'
import OrdonnanceProgressionList from '@/components/ordonnance/OrdonnanceProgressionList.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = ref('Progressions des Ordonnances')
const currentStatus = ref('')
const showDeleted = ref(false)

const {
  progressionsList,
  isLoading,
  fetchAllProgressions
} = useOrdonnanceProgressions()

// Garder toutes les progressions pour les métriques
const allProgressions = computed(() => progressionsList.value)

// Afficher les progressions selon les filtres
const displayedProgressions = computed(() => {
  let filtered = progressionsList.value

  if (!showDeleted.value) {
    filtered = filtered.filter(p => !p.deleted)
  }

  if (currentStatus.value) {
    filtered = filtered.filter(p => p.statut === currentStatus.value)
  }

  return filtered
})

const handleFilterChange = async (status) => {
  currentStatus.value = status
}

const refreshProgressions = async () => {
  await fetchAllProgressions(showDeleted.value)
}

onMounted(async () => {
  await fetchAllProgressions(false)
})
</script>