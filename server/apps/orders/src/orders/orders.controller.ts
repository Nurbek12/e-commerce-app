import { Controller } from '@nestjs/common'
import { GetByIdRequest } from 'gen/constants'
import { OrdersService } from './orders.service'
import { GrpcMethod } from '@nestjs/microservices'
import { GetOrdersRequest, CreateOrderRequest, UpdateOrderRequest, ORDERS_SERVICE_NAME } from 'gen/orders'

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod(ORDERS_SERVICE_NAME, 'GetOrder')
  findOrder(findOrder: GetByIdRequest) {
    return this.ordersService.findOrder(findOrder.id)
  }
  
  @GrpcMethod(ORDERS_SERVICE_NAME, 'GetOrders')
  findAllOrders(findOrders: GetOrdersRequest) {
    return this.ordersService.paginatedOrders(findOrders)
  }
  
  @GrpcMethod(ORDERS_SERVICE_NAME, 'CreateOrder')
  createOrder(createdOrder: CreateOrderRequest) {
    const { items, ...order } = createdOrder
    return this.ordersService.createOrder(order, items as any)
  }
  
  @GrpcMethod(ORDERS_SERVICE_NAME, 'UpdateOrder')
  updateOrder(updatedOrder: UpdateOrderRequest) {
    const { id, ...body } = updatedOrder
    return this.ordersService.updateOrder(id, body as any)
  }
  
  @GrpcMethod(ORDERS_SERVICE_NAME, 'DeleteOrder')
  removeOrder(findOrder: GetByIdRequest) {
    return this.ordersService.removeOrder(findOrder.id)
  }
}