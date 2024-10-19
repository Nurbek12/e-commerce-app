import { ApiProperty } from '@nestjs/swagger';
import { GetOrdersRequest, STATUS, SortingOrders } from 'gen/orders';
import { IsEnum, IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class OrdersQueryDto implements GetOrdersRequest  {
    @IsString()
    @IsOptional()
    @ApiProperty()
    date: string

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    limit: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    page: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    userId: number;
    
    @IsEnum(STATUS)
    @IsOptional()
    @ApiProperty()
    status: STATUS;

    @IsOptional()
    @IsObject()
    orderBy: SortingOrders;
}