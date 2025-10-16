<template>
    <admin-layout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
            <div
                class="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm dark:border-blue-900/30 dark:from-blue-950/20 dark:to-gray-900">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-blue-600 dark:text-blue-400">Total</p>
                        <h4 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</h4>
                    </div>
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm dark:border-amber-900/30 dark:from-amber-950/20 dark:to-gray-900">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-amber-600 dark:text-amber-400">En attente</p>
                        <h4 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</h4>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                        <svg class="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-gray-900">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400">Résolu</p>
                        <h4 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{{ stats.resolved }}</h4>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4 shadow-sm dark:border-purple-900/30 dark:from-purple-950/20 dark:to-gray-900">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-purple-600 dark:text-purple-400">Aujourd'hui</p>
                        <h4 class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{{ stats.today }}</h4>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 5a2 2 0 012-2h6a2 2 0 012 2v2H6V5zm0 4h12v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Inbox List Component -->
        <InboxList />
    </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import InboxList from '@/components/inbox/InboxList.vue'
import { useInbox } from '@/composables/inbox/useInbox'

const currentPageTitle = ref('Boîte de réception')
const { stats, fetchInboxGlobal } = useInbox()

onMounted(async () => {
    await fetchInboxGlobal()
})
</script>