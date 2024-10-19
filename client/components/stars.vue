<template>
    <div class="flex items-center gap-2">
        <component
            v-for="i in 5"
            :key="i"
            :is="model<i?BxStar:BxSolidStar"
            @click="!props.readonly&&(model=i)"
            class="size-4 text-yellow-400" :class="{'cursor-pointer':!props.readonly}" />
    </div>
</template>

<script setup lang="ts">
import { BxStar, BxSolidStarHalf, BxSolidStar } from '@kalimahapps/vue-icons'

const model = defineModel({ type: Number, default: 0 })
const props = defineProps<{ readonly?: boolean }>()
</script>