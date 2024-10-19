import { Injectable } from '@nestjs/common'
import { GetOrdersRequest } from 'gen/orders'
import { Prisma } from '@prisma/client-orders'
import { PrismaService } from '../prisma.service'
import { OrderItemsService } from './order-items.service'
import { ExcludePaginationFields, PickPaginationFields } from 'libs/utils/types'

type OrdersPagitanion = PickPaginationFields<GetOrdersRequest>
type OrdersFiltering = ExcludePaginationFields<GetOrdersRequest>

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  private buildOrderFilters(filter: OrdersFiltering) {
    const where: Prisma.OrderWhereInput = {}
    const { date, ...others } = filter

    // if(date) where.createdAt = { lte: date, gte: date }

    Object.assign(where, others)

    return where
  }

  async paginatedOrders(findOrders: GetOrdersRequest) {
    const { limit, page, orderBy, ...filter } = findOrders
    const where = this.buildOrderFilters(filter)

    const [ count, orders ] = await this.prismaService.$transaction([
      this.countOrders(where),
      this.findOrders({limit, page, orderBy}, where),
    ])
    return { count, orders }
  }

  findOrders(
    pagination: OrdersPagitanion,
    where: Prisma.OrderWhereInput
  ) {
    const { page = 1, limit = 20, orderBy } = pagination
    console.log(orderBy)
    return this.prismaService.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      // orderBy,
      include: {
        items: true
      }
    })
  }

  countOrders(where: Prisma.OrderWhereInput) {
    return this.prismaService.order.count({ where })
  }

  async findOrder(id: number) {
    const order = await this.prismaService.order.findUnique({ where: { id }, include: { items: true } })
    
    if(!order) return {}

    const items = await this.orderItemsService.getItemsProduct(order?.items ?? [])

    const { user } = await this.orderItemsService.getOrderUser(order?.userId ?? 0)

    return { order: { ...order, items, user } }
  }

  async createOrder(
    createdOrder: Prisma.OrderCreateInput,
    orderItems: Prisma.OrderItemCreateInput[]
  ) {
    const order = await this.prismaService.order.create({ data: createdOrder })
    const items = await this.orderItemsService.createOrderItems(orderItems.map(o => ({...o, orderId: order.id })))
    return { order: { ...order, items } }
  }

  async updateOrder(id: number, updatedOrder: Prisma.OrderUpdateInput) {
    const order = await this.prismaService.order.update({ where: { id }, data: updatedOrder })
    return { order }
  }

  async removeOrder(id: number) {
    const { order } = await this.findOrder(id)
    if(order) await this.prismaService.order.delete({ where: { id } })
    return { success: true }
  }
}
