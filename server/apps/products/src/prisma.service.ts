import { PrismaClient } from '@prisma/client-products'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$connect()
    }
}