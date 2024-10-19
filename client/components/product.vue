<template>
    <div>
        <div class="rounded-xl overflow-hidden w-full relative h-[190px]">
            <div class="absolute right-2 top-2 flex flex-col gap-2">
                <app-btn @click="store.add_to_saving(product)" class="cursor-pointer p-1.5 rounded-full text-white">
                    <component :is="store.get_saved.find(p => p.id === product.id)?AnFilledHeart:AnOutlinedHeart" class="size-5" />
                </app-btn>

                <template v-if="!store.get_cart.find(p => p.id === product.id)">
                    <app-btn @click="store.add_to_cart(product)" class="text-white">
                        <MdOutlinedShoppingCart class="size-5" />
                    </app-btn>
                </template>
                <template v-else>
                    <app-btn @click="store.add_to_cart(product)" class="text-white">
                        <AkPlus class="size-5" />
                    </app-btn>
                    <app-btn class="text-white py-[6px]">
                        {{store.get_cart.find(p => p.id === product.id)?.quantity}}
                    </app-btn>
                    <app-btn @click="store.remove_from_cart(product)" class="text-white">
                        <AkMinus class="size-5" />
                    </app-btn>
                </template>
            </div>
            <img :src="product.images?.[0]?.url" class="w-full h-full object-cover" alt="">
        </div>
        <div class="pt-2">
            <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
            <div class="flex items-center justify-between gap-1">
                <div class="flex items-center gap-1">
                    <AnFilledStar class="size-4 text-yellow-400" />
                    <b class="text-gray-500 text-sm">{{ product.rate }}</b>
                </div>
                <div class="flex items-center gap-1">
                    <BsChatFill class="size-3 text-blue-400" />
                    <b class="text-gray-500 text-sm">{{ product.reviews.length }}</b>
                </div>
                <div class="flex items-center gap-1">
                    <FaBagShopping class="size-3 text-green-400" />
                    <b class="text-gray-500 text-sm">{{ product.sold }}</b>
                </div>
                <div class="flex items-center gap-1">
                    <AnFilledShop class="size-4 text-orange-400" />
                    <b class="text-gray-500 text-sm">{{ product.stock_count }}</b>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-end gap-2">
                    <b class="text-lg text-primary-500">{{ (product.price! - (product.price! * product.discount!/100))?.toLocaleString('en-EN') }} сум</b>
                    <b class="line-through text-gray-500">{{ product.price?.toLocaleString('en-EN') }}</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppBtn from './app-btn.vue'
import { useStore } from '../store'
import { IProduct } from '../constants/types'
import { AnFilledHeart, AnOutlinedHeart, AnFilledStar, AnFilledShop, MdOutlinedShoppingCart, AkPlus, AkMinus, BsChatFill, FaBagShopping } from '@kalimahapps/vue-icons'

defineProps<{
    product: IProduct
}>()

const store = useStore()
</script>