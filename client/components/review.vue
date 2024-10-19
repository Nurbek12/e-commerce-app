<template>
    <div class="bg-gray-100 px-4 py-3 rounded-xl space-y-1">
        <div class="flex justify-between items-center">
            <div>
                <h1>{{ review.user.first_name }} {{ review.user.last_name }}</h1>
                <stars readonly :model-value="review.rate" />
            </div>
            <span class="text-sm text-gray-500">{{ new Date(review.created_at).toLocaleDateString() }}</span>
        </div>
        <p class="text-gray-600 text-sm">{{ review.text }}</p>
    </div>
</template>

<script setup lang="ts">
import Stars from '@/components/stars.vue'
import { IReview } from '@/constants/types'

defineProps<{
    review: IReview
}>()
</script>