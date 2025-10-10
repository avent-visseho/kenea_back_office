<!-- src/components/ordonnances/OrdonnancesDashboard.vue -->
<template>
    <div class="space-y-6">
        <!-- Advanced Filters Bar -->
        <div
            class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <!-- Left Side Filters -->
                <div class="flex flex-wrap items-center gap-3">
                    <!-- Date Range -->
                    <div class="flex items-center gap-2">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Période:
                        </label>
                        <select v-model="dateRange" @change="applyDateFilter"
                            class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
                            <option value="all">Toutes</option>
                            <option value="today">Aujourd'hui</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                            <option value="custom">Personnalisé</option>
                        </select>
                    </div>

                    <!-- Status Filter -->
                    <div class="flex items-center gap-2">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Statut:
                        </label>
                        <div class="flex gap-2">
                            <button v-for="status in statuses" :key="status.value"
                                @click="toggleStatusFilter(status.value)" :class="[
                                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                                    selectedStatuses.includes(status.value)
                                        ? status.activeClass
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                ]">
                                <span class="h-1.5 w-1.5 rounded-full" :class="status.dotClass"></span>
                                {{ status.label }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right Side Actions -->
                <div class="flex items-center gap-2">
                    <button @click="exportToCSV"
                        class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Exporter CSV
                    </button>

                    <button @click="refreshData" :disabled="isLoading"
                        class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50">
                        <svg :class="['h-4 w-4', isLoading ? 'animate-spin' : '']" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualiser
                    </button>
                </div>
            </div>

            <!-- Custom Date Range -->
            <div v-if="dateRange === 'custom'"
                class="mt-4 flex items-center gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                <input v-model="customStartDate" type="date"
                    class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90" />
                <span class="text-sm text-gray-500 dark:text-gray-400">à</span>
                <input v-model="customEndDate" type="date"
                    class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90" />
                <button @click="applyCustomDateRange"
                    class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
                    Appliquer
                </button>
            </div>
        </div>

        <!-- Statistics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Average Processing Time -->
            <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Temps moyen</p>
                        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ averageProcessingTime }}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">de traitement</p>
                    </div>
                    <div class="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                        <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Pending Count -->
            <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">En attente</p>
                        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ pendingCount }}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">à traiter</p>
                    </div>
                    <div class="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                        <svg class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Today's Total -->
            <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Aujourd'hui</p>
                        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ todayCount }}
                        </p>
                        <p class="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                    clip-rule="evenodd" />
                            </svg>
                            +{{ todayGrowth }}%
                        </p>
                    </div>
                    <div class="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                        <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Rejection Rate -->
            <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Taux rejet</p>
                        <p class="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {{ rejectionRate }}%
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">ce mois</p>
                    </div>
                    <div class="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                        <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity Timeline -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Activité récente
            </h3>
            <div class="space-y-4">
                <div v-for="activity in recentActivities" :key="activity.id"
                    class="flex items-start gap-4 rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
                    <div :class="[
                        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                        activity.type === 'upload' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            activity.type === 'validated' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                'bg-red-100 dark:bg-red-900/30'
                    ]">
                        <svg :class="[
                            'h-5 w-5',
                            activity.type === 'upload' ? 'text-blue-600 dark:text-blue-400' :
                                activity.type === 'validated' ? 'text-emerald-600 dark:text-emerald-400' :
                                    'text-red-600 dark:text-red-400'
                        ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="activity.type === 'upload'" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            <path v-else-if="activity.type === 'validated'" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                            {{ activity.title }}
                        </p>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {{ activity.description }}
                        </p>
                        <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            {{ formatRelativeTime(activity.date) }}
                        </p>
                    </div>
                    <button @click="viewActivity(activity)"
                        class="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                        Voir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    ordonnances: {
        type: Array,
        default: () => []
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['refresh', 'filter'])

const dateRange = ref('all')
const customStartDate = ref('')
const customEndDate = ref('')
const selectedStatuses = ref([])

const statuses = [
    {
        value: 'PENDING',
        label: 'En attente',
        activeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        dotClass: 'bg-amber-500'
    },
    {
        value: 'VALIDATED',
        label: 'Validée',
        activeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        dotClass: 'bg-emerald-500'
    },
    {
        value: 'REJECTED',
        label: 'Rejetée',
        activeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        dotClass: 'bg-red-500'
    }
]

// Computed statistics
const averageProcessingTime = computed(() => {
    const processed = props.ordonnances.filter(o =>
        o.etat === 'VALIDATED' || o.etat === 'REJECTED'
    )

    if (processed.length === 0) return '0h'

    const totalTime = processed.reduce((acc, o) => {
        const start = new Date(o.createAt)
        const end = new Date(o.updateAt)
        return acc + (end - start)
    }, 0)

    const avgHours = (totalTime / processed.length) / (1000 * 60 * 60)
    return avgHours < 1 ? `${Math.round(avgHours * 60)}m` : `${avgHours.toFixed(1)}h`
})

const pendingCount = computed(() =>
    props.ordonnances.filter(o => o.etat === 'PENDING').length
)

const todayCount = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return props.ordonnances.filter(o => {
        const createDate = new Date(o.createAt)
        createDate.setHours(0, 0, 0, 0)
        return createDate.getTime() === today.getTime()
    }).length
})

const todayGrowth = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)

    const yesterdayCount = props.ordonnances.filter(o => {
        const createDate = new Date(o.createAt)
        createDate.setHours(0, 0, 0, 0)
        return createDate.getTime() === yesterday.getTime()
    }).length

    if (yesterdayCount === 0) return 0
    return Math.round(((todayCount.value - yesterdayCount) / yesterdayCount) * 100)
})

const rejectionRate = computed(() => {
    if (props.ordonnances.length === 0) return '0'

    const rejected = props.ordonnances.filter(o => o.etat === 'REJECTED').length
    return ((rejected / props.ordonnances.length) * 100).toFixed(1)
})

const recentActivities = computed(() => {
    return props.ordonnances
        .slice(0, 5)
        .map(o => ({
            id: o.id,
            type: o.etat === 'PENDING' ? 'upload' : o.etat === 'VALIDATED' ? 'validated' : 'rejected',
            title: o.etat === 'PENDING' ? 'Nouvelle ordonnance uploadée' :
                o.etat === 'VALIDATED' ? 'Ordonnance validée' : 'Ordonnance rejetée',
            description: `Code: ${o.code}`,
            date: o.updateAt || o.createAt
        }))
})

// Methods
const toggleStatusFilter = (status) => {
    const index = selectedStatuses.value.indexOf(status)
    if (index > -1) {
        selectedStatuses.value.splice(index, 1)
    } else {
        selectedStatuses.value.push(status)
    }
    emit('filter', { statuses: selectedStatuses.value })
}

const applyDateFilter = () => {
    emit('filter', { dateRange: dateRange.value })
}

const applyCustomDateRange = () => {
    if (customStartDate.value && customEndDate.value) {
        emit('filter', {
            startDate: customStartDate.value,
            endDate: customEndDate.value
        })
    }
}

const refreshData = () => {
    emit('refresh')
}

const exportToCSV = () => {
    const headers = ['ID', 'Code', 'Statut', 'Utilisateur', 'Pharmacie', 'Date création', 'Date mise à jour']
    const rows = props.ordonnances.map(o => [
        o.id,
        o.code,
        o.etat,
        o.utilisateurId,
        o.pharmacieId,
        new Date(o.createAt).toLocaleString('fr-FR'),
        new Date(o.updateAt).toLocaleString('fr-FR')
    ])

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ordonnances_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
}

const viewActivity = (activity) => {
    console.log('View activity:', activity)
}

const formatRelativeTime = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return 'À l\'instant'
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`
    return `Il y a ${Math.floor(diffInSeconds / 86400)}j`
}
</script>