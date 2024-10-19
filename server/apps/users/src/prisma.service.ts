import { PrismaClient } from '@prisma/client-users'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$connect()
    }
}