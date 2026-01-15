<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <ProduitsPharmacieList />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ProduitsPharmacieList from '@/components/pharmacie/ProduitsPharmacieList.vue'
</script>
