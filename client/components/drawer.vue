<template>
    <div class="fixed transition-all w-[55px] p-1.5 h-screen flex flex-col gap-2 bg-primary-500">
        <router-link v-for="link in admin_links" :to="link.url" :key="link.url" class="overflow-hidden rounded bg-white text-primary-500 flex items-center justify-start text-nowrap gap-4 px-2.5 py-2">
            <div>
                <component :is="link.icon" class="text-primary-500 size-6" />
            </div>
            <span>{{ link.title }}</span>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { admin_links } from '@/constants'
</script>