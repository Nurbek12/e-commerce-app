import { PrismaClient } from '@prisma/client-statistics'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$connect()
    }
}