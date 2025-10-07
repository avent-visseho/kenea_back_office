//src/views/pharmacie/Pharmacie.vue
<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <CategorieProduitsMetrics/>
      </div>

      <div class="col-span-12">
        <CategorieProduitsList/>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import CategorieProduitsMetrics from '@/components/categorie/CategorieProduitsMetrics.vue'
import CategorieProduitsList from '@/components/categorie/CategorieProduitsList.vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
export default {
  components: {
    AdminLayout,
    CategorieProduitsMetrics,
    CategorieProduitsList,
  },
  name: 'categorie',
}
</script>
