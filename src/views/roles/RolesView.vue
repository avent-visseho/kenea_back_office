<!-- src/views/RolesPage.vue -->

<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <RolesMetrics />
      </div>

      <div class="col-span-12">
        <RolesList />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import {ref} from "vue";
import AdminLayout from '../../components/layout/AdminLayout.vue';
import RolesMetrics from '@/components/roles/RolesMetrics.vue'
import RolesList from '@/components/roles/RolesList.vue'
const currentPageTitle = ref(" Gestion des Rôles");
</script>