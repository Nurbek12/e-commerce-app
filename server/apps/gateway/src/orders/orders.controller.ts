import { ClientGrpc } from '@nestjs/microservices';
import { OrdersQueryDto } from './dto/query-orders';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersServiceClient, ORDERS_SERVICE_NAME } from 'gen/orders'
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(@Inject('ORDERS_PACKAGE') private ordersClient: ClientGrpc) {}

  ordersService: OrdersServiceClient

  onModuleInit() {
    this.ordersService = this.ordersClient.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME)
  }

  @Get()
  findAll(@Query() findQuery: OrdersQueryDto) {
    return this.ordersService.getOrders(Object.assign({ page: 1, limit: 10 }, findQuery));
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.getOrder({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder({ id, ...updateOrderDto } as any);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.deleteOrder({ id });
  }
}
