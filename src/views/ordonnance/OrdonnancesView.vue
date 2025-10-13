<!-- src/views/OrdonnancesView.vue -->
<template>
    <admin-layout>
     <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <OrdonnancesMetrics :ordonnances="ordonnancesList" />
      </div>

      <div class="col-span-12">
         <OrdonnancesList :ordonnances="ordonnancesList" :is-loading="isLoading" @refresh="refreshOrdonnances" />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { useOrdonnances } from '@/composables/ordannance/useOrdonnances'
import OrdonnancesMetrics from '@/components/ordonnance/OrdonnancesMetrics.vue'
import OrdonnancesList from '@/components/ordonnance/OrdonnancesList.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';


const currentPageTitle = ref("Ordonnances");

const {
    ordonnancesList,
    isLoading,
    fetchAllOrdonnances,
    fetchOrdonnancesByUtilisateur,
    fetchOrdonnancesByPharmacie
} = useOrdonnances()

const filterType = ref('all')
const filterId = ref('')


const handleFilterTypeChange = () => {
    filterId.value = ''
    if (filterType.value === 'all') {
        refreshOrdonnances()
    }
}

const applyFilter = async () => {
    if (!filterId.value) {
        alert('Veuillez saisir un ID')
        return
    }

    if (filterType.value === 'user') {
        await fetchOrdonnancesByUtilisateur(filterId.value)
    } else if (filterType.value === 'pharmacy') {
        await fetchOrdonnancesByPharmacie(filterId.value)
    }
}

const refreshOrdonnances = async () => {
    if (filterType.value === 'all') {
        await fetchAllOrdonnances(false)
    } else if (filterType.value === 'user' && filterId.value) {
        await fetchOrdonnancesByUtilisateur(filterId.value)
    } else if (filterType.value === 'pharmacy' && filterId.value) {
        await fetchOrdonnancesByPharmacie(filterId.value)
    }
}

onMounted(async () => {
    await fetchAllOrdonnances(false)
})
</script>