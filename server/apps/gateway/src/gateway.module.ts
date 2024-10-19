import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    ReviewsModule,
    ProductsModule,
    CategoriesModule,
    StatisticsModule,
  ],
})
export class GatewayModule {}
