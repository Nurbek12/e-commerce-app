<template>
    <div class="fixed w-full bottom-0">
        <div class="container mx-auto w-full h-full py-2">
            <div class="grid grid-cols-4 gap-2 bg-primary-500 rounded-xl w-full max-w-[600px] mx-auto p-2">
                <router-link v-for="link in links" :key="link.title" :to="link.url" class="transition-all flex flex-col items-center gap-1 rounded-lg p-2"
                    :class="route.path == link.url ? 'bg-white text-primary-500' : 'text-white'">
                    <component :is="link.icon" class="size-6" />
                    <span class="text-xs font-modernist font-medium">{{ link.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { links } from '@/constants'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>