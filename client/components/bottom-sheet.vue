<template>
    <div @click="model=false" :class="model?'bg-black/40 pointer-events-auto':'pointer-events-none'" class="top-0 left-0 fixed z-10 w-full h-full transition-all">
        <transition name="sheet-content">
            <div v-if="model" @click.stop class="pointer-events-auto w-full absolute bottom-0 h-[80%] bg-white rounded-t-xl container py-2">
                <div class="flex justify-between items-center py-2 w-full">
                    <span class="text-lg">{{ props.title }}</span>
                    <app-btn @click="model=false">
                        <ClCloseMd class="text-white size-5" />
                    </app-btn>
                </div>
                <slot />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import AppBtn from './app-btn.vue'
import { ClCloseMd } from '@kalimahapps/vue-icons'

const props = defineProps<{
    title?: string
}>()
const model = defineModel({
    type: Boolean,
    default: false
})
</script>

<style>
.sheet-open-enter-active,
.sheet-open-leave-active {
    transition: opacity .2s;
}

.sheet-open-enter-from,
.sheet-open-leave-to {
    opacity: 0;
}

.sheet-content-enter-active,
.sheet-content-leave-active {
    transition: transform .2s;
}

.sheet-content-enter-from,
.sheet-content-leave-to {
    transform: translateY(100%);
}
</style>