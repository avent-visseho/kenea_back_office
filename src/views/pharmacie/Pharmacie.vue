//src/views/pharmacie/Pharmacie.vue
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <PharmacieMetrics/>
      </div>

      <div class="col-span-12">
        <PharmaciesList/>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import PharmacieMetrics from '@/components/pharmacie/PharmacieMetrics.vue';
import PharmaciesList from '@/components/pharmacie/PharmaciesList.vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
export default {
  components: {
    AdminLayout,
    PharmacieMetrics,
    PharmaciesList,
  },
  name: 'Pharmacie',
}
</script>
