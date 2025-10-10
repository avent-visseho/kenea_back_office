//src/views/users/Userview.vue
<template>
  <admin-layout>
     <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <UsersMetrics/>
      </div>

      <div class="col-span-12">
        <UsersList/>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import UsersMetrics from '@/components/users/UsersMetrics.vue';
import UsersList from '@/components/users/UsersList.vue';
const currentPageTitle = ref("Utilisateurs");
</script>
