// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.4
//   protoc               v5.28.0
// source: orders.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GetByIdRequest, sortingValues, SuccessResponse } from "./constants";
import { Product } from "./products";
import { User } from "./users";

export const protobufPackage = "orders";

export enum STATUS {
  PENDING = 0,
  PROCESSING = 1,
  DELIVERED = 2,
  CANCELED = 3,
  UNRECOGNIZED = -1,
}

export interface Order {
  id: number;
  userId: number;
  user: User | undefined;
  status: STATUS;
  totalPrice: number;
  deliveryTime: string;
  address: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
  items: OrderItem[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface CreateOrder {
  userId: number;
  status: STATUS;
  totalPrice: number;
  address: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  userId: number;
  totalPrice: number;
  address: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
  items: CreateOrderItem[];
}

export interface UpdateOrderRequest {
  id: number;
  status: STATUS;
}

export interface SortingOrders {
  id?: sortingValues | undefined;
  totalPrice?: sortingValues | undefined;
  status?: sortingValues | undefined;
  createdAt?: sortingValues | undefined;
}

export interface GetOrdersRequest {
  page: number;
  limit: number;
  date?: string | undefined;
  userId?: number | undefined;
  status?: STATUS | undefined;
  orderBy?: SortingOrders | undefined;
}

export interface GetOrdersResponse {
  count: number;
  orders: Order[];
}

export interface OrderResponse {
  order: Order | undefined;
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrdersServiceClient {
  getOrder(request: GetByIdRequest): Observable<OrderResponse>;

  getOrders(request: GetOrdersRequest): Observable<GetOrdersResponse>;

  createOrder(request: CreateOrderRequest): Observable<OrderResponse>;

  updateOrder(request: UpdateOrderRequest): Observable<OrderResponse>;

  deleteOrder(request: GetByIdRequest): Observable<SuccessResponse>;
}

export interface OrdersServiceController {
  getOrder(request: GetByIdRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;

  getOrders(request: GetOrdersRequest): Promise<GetOrdersResponse> | Observable<GetOrdersResponse> | GetOrdersResponse;

  createOrder(request: CreateOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;

  updateOrder(request: UpdateOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;

  deleteOrder(request: GetByIdRequest): Promise<SuccessResponse> | Observable<SuccessResponse> | SuccessResponse;
}

export function OrdersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrder", "getOrders", "createOrder", "updateOrder", "deleteOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDERS_SERVICE_NAME = "OrdersService";
