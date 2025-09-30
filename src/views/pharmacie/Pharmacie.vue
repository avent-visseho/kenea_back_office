<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <PharmacieMetrics />
      </div>

      <div class="col-span-12">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../components/layout/AdminLayout.vue'
import RecentOrders from '../../components/pharmacie/RecentOrders.vue'
import PharmacieMetrics from '../../components/pharmacie/PharmacieMetrics.vue'
export default {
  components: {
    AdminLayout,
    PharmacieMetrics,
    RecentOrders,
  },
  name: 'Pharmacie',
}
</script>
