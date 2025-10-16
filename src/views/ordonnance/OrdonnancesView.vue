<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />
        <div class="grid grid-cols-12 gap-4 md:gap-6">
            <div class="col-span-12">
                <OrdonnancesMetrics :ordonnances="ordonnancesList" />
            </div>

            <div class="col-span-12">
                <OrdonnancesList :ordonnances="ordonnancesList" :is-loading="isLoading" @refresh="refreshOrdonnances"
                    @filter-change="handleFilterChange" />
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
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = ref("Ordonnances")

const {
    ordonnancesList,
    isLoading,
    fetchAllOrdonnances,
    fetchOrdonnancesByEtat
} = useOrdonnances()

// Garder une trace de l'état actuel du filtre
const currentEtat = ref('')

// Gestionnaire pour le changement de filtre par état
const handleFilterChange = async (etat) => {
    currentEtat.value = etat

    if (etat) {
        await fetchOrdonnancesByEtat(etat)
    } else {
        await fetchAllOrdonnances(false)
    }
}

// Rafraîchir en respectant le filtre actuel
const refreshOrdonnances = async () => {
    if (currentEtat.value) {
        await fetchOrdonnancesByEtat(currentEtat.value)
    } else {
        await fetchAllOrdonnances(false)
    }
}

onMounted(async () => {
    await fetchAllOrdonnances(false)
})
</script>