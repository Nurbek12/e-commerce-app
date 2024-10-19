import { Module } from '@nestjs/common';
import { clientService } from 'libs/utils';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma.service';
import { ClientsModule } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrderItemsService } from './order-items.service';

@Module({
  imports: [ClientsModule.register([
    clientService('USERS_PACKAGE'),
    clientService('PRODUCTS_PACKAGE')
  ])],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrderItemsService],
})
export class OrdersModule {}
