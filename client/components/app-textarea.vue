<template>
    <div class="w-full border rounded-xl overflow-hidden">
        <textarea v-model="model" @input="emits('inputed', $event)" :required="props.required" class="text-sm py-2 px-3 w-full outline-none resize-none" :rows="props.rows||6" :placeholder="props.placeholder" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel, defineEmits } from 'vue'

const model: any = defineModel()
const emits = defineEmits(['inputed'])
const props = defineProps<{
    placeholder?: string,
    required?: boolean,
    type?: string,
    rows?: number,
}>()
</script>