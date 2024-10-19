import { microService } from 'libs/utils';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders/orders.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(OrdersModule, microService('ORDERS_PACKAGE'));
}

bootstrap();