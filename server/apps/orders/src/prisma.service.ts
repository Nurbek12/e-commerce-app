import { OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client-orders'

export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$connect()
    }
}