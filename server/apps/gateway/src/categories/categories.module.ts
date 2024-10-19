import { Module } from '@nestjs/common'
import { clientService } from 'libs/utils'
import { ClientsModule } from '@nestjs/microservices'
import { CategoriesController } from './categories.controller'

@Module({
  imports: [
    ClientsModule.register([
      clientService('PRODUCTS_PACKAGE')
    ])
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
