<template>
  <admin-layout>
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

<script>


import AdminLayout from '../../components/layout/AdminLayout.vue'
import PaysVilleMetrics from '@/components/pays/PaysVilleMetrics.vue';
import PaysVilleList from '@/components/pays/PaysVilleList.vue';
export default {
  components: {
    AdminLayout,
    PaysVilleMetrics,
    PaysVilleList,
  },
  name: 'Pharmacie',
}
</script>
