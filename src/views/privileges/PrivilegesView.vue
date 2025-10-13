<!-- src/views/RolesPage.vue -->

<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
       <PrivilegesMetrics/>
      </div>

      <div class="col-span-12">
        <PrivilegesList />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import {ref} from "vue";
import AdminLayout from '../../components/layout/AdminLayout.vue';
import PrivilegesMetrics from '@/components/privileges/PrivilegesMetrics.vue';
import PrivilegesList from '@/components/privileges/PrivilegesList.vue';
const currentPageTitle = ref(" Gestion des Privilèges");
</script>