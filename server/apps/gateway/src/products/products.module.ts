import { Module } from '@nestjs/common'
import { clientService } from 'libs/utils'
import { ClientsModule } from '@nestjs/microservices'
import { ProductsController } from './products.controller'

@Module({
  imports: [
    ClientsModule.register([
      clientService('PRODUCTS_PACKAGE')
    ])
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
