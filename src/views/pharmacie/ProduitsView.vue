//src/views/pharmacie/Pharmacie.vue
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <ProduitMetrics/>
      </div>

      <div class="col-span-12">
        <ProduitsList/>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../components/layout/AdminLayout.vue';
import ProduitsList from '@/components/produits/ProduitsList.vue';
import ProduitMetrics from '@/components/produits/ProduitMetrics.vue';
export default {
  components: {
    AdminLayout,
    ProduitMetrics,
    ProduitsList,
  },
  name: 'produits',
}
</script>
