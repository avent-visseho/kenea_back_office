<template>
  <admin-layout>
     <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <PaysVilleMetrics/>
      </div>

      <div class="col-span-12">
        <PaysVilleList/>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PaysVilleMetrics from '@/components/pays/PaysVilleMetrics.vue';
import PaysVilleList from '@/components/pays/PaysVilleList.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
const currentPageTitle = ref("Pays et Villes");
</script>
