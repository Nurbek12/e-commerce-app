<template>
    <div class="w-full">
        <div class="flex items-center gap-2">
            <div>
                <component v-if="icon" :is="icon" class="text-primary-500 size-5" />
            </div>
            <h1 class="text-sm">{{ title }}</h1>
        </div>
        <div class="mt-4 p-2 bg-gray-100 rounded-lg w-full overflow-x-auto">
            <div class="flex items-end gap-5 h-[250px] mt-2 px-2">

                <div v-for="d,i in data" :key="i" class="h-full flex flex-col gap-1 items-center">
    
                    <div class="flex items-center gap-0.5 h-full">

                        <div class="flex flex-col items-center justify-end gap-2 h-full">
                            <div class="text-xs text-green-600">{{ d.orders }}</div>
                            <div class="bg-green-600 rounded-lg w-[10px]"
                                :style="{ height: (d.orders! * 100 / max_count.orders) + '%' }">   
                            </div>
                        </div>
        
                        <div class="flex flex-col items-center justify-end gap-2 h-full">
                            <div class="text-xs text-blue-600">{{ d.users }}</div>
                            <div class="bg-blue-600 rounded-lg w-[10px]"
                                :style="{ height: (d.users! * 100 / max_count.users) + '%' }">   
                            </div>
                        </div>
        
                        <div class="flex flex-col items-center justify-end gap-2 h-full">
                            <div class="text-xs text-red-600">{{ d.reports }}</div>
                            <div class="bg-red-600 rounded-lg w-[10px]"
                                :style="{ height: (d.reports! * 100 / max_count.reports) + '%' }">   
                            </div>
                        </div>
                        
                    </div>
    
                    <span class="text-xs text-gray-600 text-nowrap">{{ d.date }}</span>
    
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IStatistics } from '@/constants/types'

const props = defineProps<{
    icon?: any
    title?: string
    data: Partial<IStatistics>[]
}>()

const max_count = computed(() => {
    let max = { reports: 0, orders: 0, users: 0, amount: 0 }
    props.data.map(d => {
        if(max.reports < d.reports!) max.reports = d.reports!
        if(max.orders < d.orders!) max.orders = d.orders!
        if(max.users < d.users!) max.users = d.users!
        if(max.amount < d.amount!) max.amount = d.amount!
    })
    return max
})
</script>