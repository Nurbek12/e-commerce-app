import { microService } from 'libs/utils'
import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users/users.module'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    microService('USERS_PACKAGE')
  )
}
bootstrap()