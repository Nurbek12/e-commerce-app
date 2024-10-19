import { ApiProperty } from '@nestjs/swagger'
import { CreateOrderRequest, CreateOrderItem, STATUS } from 'gen/orders'
import { IsString, IsNumber, IsOptional, IsEnum, IsArray } from 'class-validator'

export class CreateOrderDto implements CreateOrderRequest {
    @IsString()
    @ApiProperty()
    address: string
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    latitude: number
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    longitude: number

    @IsEnum(STATUS)
    @IsOptional()
    status: STATUS
    
    @IsNumber()
    @ApiProperty()
    totalPrice: number
    
    @IsNumber()
    @ApiProperty()
    userId: number

    @IsArray()
    @ApiProperty()
    items: CreateOrderItemDto[]
}

export class CreateOrderItemDto implements CreateOrderItem {
    @IsNumber()
    @ApiProperty()
    price: number

    @IsNumber()
    @ApiProperty()
    quantity: number

    @IsNumber()
    @ApiProperty()
    productId: number
}