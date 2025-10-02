import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import { useAuthStore } from '@/store/auth/auth'

const app = createApp(App)
const pinia = createPinia()

// ⚠️ Toujours installer Pinia avant d'utiliser un store
app.use(pinia)
app.use(router)
app.use(VueApexCharts)

// ✅ Maintenant on peut appeler le store
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
