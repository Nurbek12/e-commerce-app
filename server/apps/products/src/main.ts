import { microService } from 'libs/utils'
import { NestFactory } from '@nestjs/core'
import { ProductsModule } from './products/products.module'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule, microService('PRODUCTS_PACKAGE')
  )
}
bootstrap();
