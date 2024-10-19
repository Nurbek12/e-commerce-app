import { PrismaService } from '../prisma.service';
import { ClientGrpc } from '@nestjs/microservices';
import { Prisma, OrderItem } from '@prisma/client-orders';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UsersServiceClient, USERS_SERVICE_NAME } from 'gen/users';
import { ProductsServiceClient, PRODUCTS_SERVICE_NAME } from 'gen/products';

@Injectable()
export class OrderItemsService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USERS_PACKAGE') private usersClient: ClientGrpc,
    @Inject('PRODUCTS_PACKAGE') private productsClient: ClientGrpc,
  ) {}

  usersService: UsersServiceClient;
  productsService: ProductsServiceClient;

  onModuleInit() {
    this.usersService = this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
    this.productsService = this.productsClient.getService<ProductsServiceClient>(PRODUCTS_SERVICE_NAME);
  }

  createOrderItems(orderItem: Prisma.OrderItemCreateManyInput[]) {
    return this.prismaService.orderItem.createManyAndReturn({
      data: orderItem,
    });
  }

  getOrderItem(id: number) {
    return this.prismaService.orderItem.findUnique({ where: { id } });
  }

  async removeOrderItem(id: number) {
    const item = await this.getOrderItem(id);
    if (item) await this.prismaService.orderItem.delete({ where: { id } });
    return { success: true };
  }

  async getItemsProduct(items: OrderItem[]) {
    const ids = items.map((item) => item.productId);
    const { products } = await this.productsService
      .getProducts({ ids }).toPromise();

    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        product,
        ...item,
      };
    });
  }

  getOrderUser(id: number) {
    return this.usersService
      .getUser({ id }).toPromise()
  }
}
