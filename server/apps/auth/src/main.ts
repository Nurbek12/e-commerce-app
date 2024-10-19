import { microService } from 'libs/utils'
import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, microService('AUTH_PACKAGE'))
}

bootstrap()