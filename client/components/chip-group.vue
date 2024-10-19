<template>
    <div>
        <div v-if="title" class="flex items-center gap-2 mb-2">
            <component :is="icon" class="size-5 text-primary-500" />
            <h1>{{ title }}</h1>
        </div>

        <div class="overflow-auto">
            <div class="flex items-center gap-2">
                <div v-for="l in list" :key="l.id" @click="model=(model===l.id?null:l.id)" class="cursor-pointer transition-all flex gap-2 items-center px-3 rounded-xl"
                    :class="[l.id === model ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300', l.image ? 'py-1' : 'py-2'].join(' ')">
                    <div v-if="l.image" class="w-[30px] h-[30px]">
                        <img :src="l.image" class="w-full h-full object-cover">
                    </div>
                    <span class="text-nowrap text-sm">{{ l.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const model = defineModel()

defineProps<{
    title?: string,
    icon?: any,
    list: any[]
}>()
</script>