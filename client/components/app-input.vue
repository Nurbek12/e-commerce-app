<template>
    <input v-model="model" @input="emits('inputed', $event)" class="px-3 py-1.5 border text-sm rounded-xl outline-none">
</template>

<script setup lang="ts">
const model = defineModel()
const emits = defineEmits(['inputed'])
</script>