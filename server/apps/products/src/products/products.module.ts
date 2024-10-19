import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ProductImagesService } from './product-images.service'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ProductImagesService],
})
export class ProductsModule {}
