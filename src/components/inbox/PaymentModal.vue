<template>
    <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-5"
        @click.self="closeModal">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-[modalSlideIn_0.3s_ease-out]"
            @click.stop>
            <!-- Header -->
            <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-emerald-600">
                        <path d="M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12Z"
                            stroke="currentColor" stroke-width="2" />
                        <path
                            d="M9.5 8.5C9.5 7.67157 10.1716 7 11 7H13C13.8284 7 14.5 7.67157 14.5 8.5S13.8284 10 13 10H11C10.1716 10 9.5 10.6716 9.5 11.5S10.1716 13 11 13H13C13.8284 13 14.5 13.6716 14.5 14.5S13.8284 16 13 16H11C10.1716 16 9.5 15.3284 9.5 14.5"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M12 6V7M12 16V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    Paiement Sécurisé
                </h2>
                <button @click="closeModal" :disabled="isProcessing"
                    class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6">
                <!-- Amount Summary -->
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                    <div class="flex justify-between mb-2 text-sm">
                        <span class="text-gray-600 dark:text-gray-400">Montant de l'ordonnance:</span>
                        <span class="font-medium text-emerald-600 dark:text-emerald-400">{{
                            formatAmount(paymentData.amount) }}
                            FCFA</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 font-semibold">
                        <span class="text-gray-900 dark:text-white">Total à payer:</span>
                        <span class="text-lg text-emerald-600 dark:text-emerald-400">{{ formatAmount(paymentData.amount)
                            }}
                            FCFA</span>
                    </div>
                </div>

                <!-- Payment Form -->
                <div class="space-y-4">
                    <!-- Firstname -->
                    <div>
                        <label for="firstname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Prénom <span class="text-red-600">*</span>
                        </label>
                        <input id="firstname" v-model="paymentForm.firstname" type="text" :class="[
                            'w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white',
                            errors.firstname ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        ]" placeholder="Votre prénom" required :disabled="isProcessing" />
                        <p v-if="errors.firstname" class="text-red-600 text-xs mt-1">{{ errors.firstname }}</p>
                    </div>

                    <!-- Lastname -->
                    <div>
                        <label for="lastname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nom <span class="text-red-600">*</span>
                        </label>
                        <input id="lastname" v-model="paymentForm.lastname" type="text" :class="[
                            'w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white',
                            errors.lastname ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        ]" placeholder="Votre nom" required :disabled="isProcessing" />
                        <p v-if="errors.lastname" class="text-red-600 text-xs mt-1">{{ errors.lastname }}</p>
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email <span class="text-red-600">*</span>
                        </label>
                        <input id="email" v-model="paymentForm.email" type="email" :class="[
                            'w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white',
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        ]" placeholder="votre@email.com" required :disabled="isProcessing" />
                        <p v-if="errors.email" class="text-red-600 text-xs mt-1">{{ errors.email }}</p>
                    </div>

                    <!-- Phone -->
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Numéro de téléphone <span class="text-red-600">*</span>
                        </label>
                        <div class="flex gap-2">
                            <select v-model="paymentForm.country"
                                class="flex-shrink-0 w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                :disabled="isProcessing">
                                <option v-for="country in countries" :key="country.code" :value="country.code">
                                    {{ country.flag }} {{ country.indicatif }}
                                </option>
                            </select>
                            <input id="phone" v-model="paymentForm.number" type="tel" :class="[
                                'flex-1 px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white',
                                errors.number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            ]" placeholder="12345678" required :disabled="isProcessing" />
                        </div>
                        <p v-if="errors.number" class="text-red-600 text-xs mt-1">{{ errors.number }}</p>
                    </div>

                    <!-- Error Message -->
                    <div v-if="paymentError"
                        class="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
                        </svg>
                        {{ paymentError }}
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3 mt-6">
                        <button @click="closeModal" :disabled="isProcessing"
                            class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Annuler
                        </button>
                        <button @click="processPayment" :disabled="isProcessing || !isFormValid"
                            class="flex-1 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <div v-if="isProcessing" class="flex items-center gap-2">
                                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin">
                                </div>
                                <span>Traitement...</span>
                            </div>
                            <div v-else class="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5S6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5S17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                Payer {{ formatAmount(paymentData.amount) }} FCFA
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { InboxServices } from '@/api/services/inboxService'

const props = defineProps({
    showModal: Boolean,
    paymentData: Object
})

const emit = defineEmits(['close', 'paymentSuccess', 'paymentError'])

const paymentForm = ref({
    firstname: '',
    lastname: '',
    email: '',
    number: '',
    country: 'bj'
})

const errors = ref({})
const isProcessing = ref(false)
const paymentError = ref('')

const countries = [
    { code: 'bj', flag: '🇧🇯', name: 'Bénin', indicatif: '+229' },
    { code: 'tg', flag: '🇹🇬', name: 'Togo', indicatif: '+228' },
    { code: 'ci', flag: '🇨🇮', name: 'Côte d\'Ivoire', indicatif: '+225' },
    { code: 'sn', flag: '🇸🇳', name: 'Sénégal', indicatif: '+221' }
]

// Pré-remplir le formulaire avec les données du localStorage
watch(() => props.showModal, (newVal) => {
    if (newVal) {
        const authData = localStorage.getItem('auth')
        if (authData) {
            try {
                const parsed = JSON.parse(authData)
                const user = parsed.user

                paymentForm.value = {
                    firstname: user?.person?.firstname || '',
                    lastname: user?.person?.lastname || '',
                    email: user?.person?.email || '',
                    number: user?.person?.phone || '',
                    country: 'bj'
                }
            } catch (error) {
                console.error('Erreur lors du parsing des données utilisateur:', error)
            }
        }
    } else {
        // Réinitialiser quand le modal se ferme
        errors.value = {}
        paymentError.value = ''
        isProcessing.value = false
    }
})

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount || 0)
}

const isFormValid = computed(() => {
    return paymentForm.value.firstname.trim() &&
        paymentForm.value.lastname.trim() &&
        paymentForm.value.email.trim() &&
        paymentForm.value.number.trim() &&
        validateEmail(paymentForm.value.email)
})

const validateForm = () => {
    const newErrors = {}

    if (!paymentForm.value.firstname.trim()) {
        newErrors.firstname = 'Le prénom est obligatoire'
    }

    if (!paymentForm.value.lastname.trim()) {
        newErrors.lastname = 'Le nom est obligatoire'
    }

    if (!paymentForm.value.email.trim()) {
        newErrors.email = "L'email est obligatoire"
    } else if (!validateEmail(paymentForm.value.email)) {
        newErrors.email = "Format d'email invalide"
    }

    if (!paymentForm.value.number.trim()) {
        newErrors.number = 'Le numéro de téléphone est obligatoire'
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const processPayment = async () => {
    if (!validateForm()) {
        return
    }

    try {
        isProcessing.value = true
        paymentError.value = ''

        const paymentRequestData = {
            description: props.paymentData.description || 'Paiement Ordonnance',
            amount: props.paymentData.amount,
            currency: {
                iso: 'XOF'
            },
            customer: {
                firstname: paymentForm.value.firstname,
                lastname: paymentForm.value.lastname,
                email: paymentForm.value.email,
                phone_number: {
                    number: paymentForm.value.number,
                    country: paymentForm.value.country
                }
            }
        }

        console.log('Données de paiement envoyées:', paymentRequestData)

        const response = await InboxServices.payServiceCarteGrise(paymentRequestData)

        console.log('Réponse du paiement:', response)

        if (response.data && response.data.approved === true) {
            console.log('Paiement approuvé avec succès')
            emit('paymentSuccess', {
                transactionData: response.data,
                paymentForm: paymentForm.value,
                paymentResponse: response.data
            })
        } else if (response.data && response.data.approved === false) {
            const errorMsg = response.data?.message || 'Paiement refusé'
            console.log('Paiement refusé:', errorMsg)
            paymentError.value = errorMsg
            emit('paymentError', errorMsg)
        } else {
            console.log('Réponse de paiement inattendue:', response.data)
            if (response.data?.message === 'pending' || response.data?.status === 'pending') {
                console.log('Paiement en attente...')
                paymentError.value = 'Paiement en attente de confirmation'
            } else {
                const errorMsg = response.data?.message || 'Statut de paiement incertain'
                paymentError.value = errorMsg
                emit('paymentError', errorMsg)
            }
        }

    } catch (error) {
        console.error('Erreur lors du paiement:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Erreur de connexion au service de paiement'
        paymentError.value = errorMessage
        emit('paymentError', errorMessage)
    } finally {
        isProcessing.value = false
    }
}

const closeModal = () => {
    if (!isProcessing.value) {
        emit('close')
    }
}
</script>

<style scoped>
@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>