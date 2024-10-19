<template>
    <div class="flex items-center gap-2">
        <div>
            <div class="rounded-xl overflow-hidden relative h-[55px] w-[55px]">
                <img :src="product.images[0].url" class="w-full h-full object-cover" alt="">
            </div>
        </div>

        <div class="w-full">
            <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
            
            <div class="flex items-start justify-between">

                <div class="flex items-end gap-2">
                    <b class="text-primary-500">{{ (store.get_cart.find(p => p.id === product.id)?.quantity! * (product.price! - (product.price! * product.discount!/100)))?.toLocaleString('en-EN') }} сум</b>
                    <span class="text-sm">| {{ (product.price! - (product.price! * product.discount!/100))?.toLocaleString('en-EN') }} сум</span>
                </div>

                <div class="flex gap-2 items-center">
                    
                    <app-btn @click="store.add_to_cart(product)" class="text-white">
                        <AkPlus class="size-4" />
                    </app-btn>
                    <div class="w-[40px] flex justify-center items-center px-2.5 py-1 rounded-xl bg-primary-500 text-white">{{ store.get_cart.find(p => p.id === product.id)?.quantity }}</div>
                    <app-btn @click="store.remove_from_cart(product)" class="text-white">
                        <AkMinus class="size-4" />
                    </app-btn>
    
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import AppBtn from './app-btn.vue'
import { useStore } from '../store'
import { IProduct } from '../constants/types'
import { AkPlus, AkMinus } from '@kalimahapps/vue-icons'

defineProps<{
    product: IProduct
}>()

const store = useStore()
</script>