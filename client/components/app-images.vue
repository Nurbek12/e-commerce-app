<template>
    <div>
        <h1 class="text-sm text-gray-600 mb-2">{{ title }}</h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div v-for="image,i in images" :key="i">
                <div class="rounded-xl overflow-hidden h-[120px]">
                    <img :src="getImage(image)" class="w-full h-full object-cover" />
                </div>
                <div class="flex items-center justify-between gap-2 py-2">
                    <div class="max-w-[50px] text-ellipsis text-nowrap text-sm text-gray-500">{{ human_file_size(image.size) }}</div>
                    <app-btn type="button" @click="emits('remove_image', is_file?[i]:[image.id, i])">
                        <MdDelete class="w-4 h-4 text-white" />
                    </app-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppBtn from '@/components/app-btn.vue'
import { human_file_size } from '@/constants'
import { MdDelete } from '@kalimahapps/vue-icons'

const emits = defineEmits(['remove_image'])
const props = defineProps<{
    images: any[],
    title: string,
    is_file: boolean
}>()

const getImage = (img: any) => {
    return props.is_file ? URL.createObjectURL(img):img.url
}
</script>