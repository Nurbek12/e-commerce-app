<template>
    <div class="border-r rounded-r-2xl z-30 bg-white absolute md:sticky top-0 h-[100vh] transition-all flex flex-col" :class="isOpen ? 'w-[250px]' : 'w-[57px]'">
        <div class="p-2 flex flex-col gap-1 overflow-auto scrollbar-hide">
            <template v-for="link,i in admin_links" :key="i">
                <router-link :to="link.url">
                    <div class="select-none px-2 py-2 rounded-xl w-full flex whitespace-nowrap items-center gap-4 transition-all"
                        :class="current_router === link.url ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-400/20'">
                        <div class="relative">
                            <component :is="link.icon" class="text-2xl" />
                        </div>
                        <span class="text-sm overflow-hidden">{{ link.title }}</span>
                    </div>
                </router-link>
            </template>
        </div>

        <button @click="isOpen = !isOpen"
            class="bg-white rounded-full w-[30px] h-[30px] text-gray-500 border cursor-pointer absolute top-[40%] right-[-15px] flex items-center justify-center">
            <BxSolidChevronRight class="transition-all relative flex items-center justify-center"
                :class="!isOpen ? 'transform rotate-0' : 'transform rotate-180'" />
        </button>

        <div class="mt-auto p-2 gap-1 flex-1 flex flex-col justify-end">
            <button @click="handleLogout" class="select-none px-2 py-2 rounded-xl w-full overflow-hidden flex items-center gap-6 transition-all active:bg-gray-400/40 text-gray-500 hover:bg-gray-400/20 cursor-pointer">
                <div>
                    <BxLogOut class="text-2xl" />
                </div>
                <span class="text-sm">Выйти</span>
            </button>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { useStore } from '@/store'
import { ref, computed } from 'vue'
import { admin_links } from '@/constants'
import { useRoute, useRouter } from 'vue-router'
import { BxSolidChevronRight, BxLogOut } from "@kalimahapps/vue-icons"

const store = useStore()
const route = useRoute()
const isOpen = ref(false)
const router = useRouter()
const opened = ref<number|null>(null)

const current_router = computed(() => {
    if(route.fullPath === '/') return route.fullPath.split('?')[0]
    else if(route.fullPath.endsWith('/')) return route.fullPath.slice(0, -1).split('?')[0]
    return route.fullPath.split('?')[0]
})

const handleLogout = () => {
    if(!confirm('Вы точно хотите выйти из аккаунта?')) return
    store.set_token(null)
    router.push('/login')
}

if(route.path.includes('/email')) opened.value = 5
</script>
