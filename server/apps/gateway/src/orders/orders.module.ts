import { Module } from '@nestjs/common';
import { clientService } from 'libs/utils';
import { OrdersController } from './orders.controller';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    clientService('ORDERS_PACKAGE')
  ])],
  controllers: [OrdersController],
})
export class OrdersModule {}
