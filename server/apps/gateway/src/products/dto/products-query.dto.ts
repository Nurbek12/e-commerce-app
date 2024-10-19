import { ApiProperty } from '@nestjs/swagger'
import { GetProductsRequest, SortingProducts } from 'gen/products'
import { IsNumber, IsString, IsOptional, IsArray } from 'class-validator'

export class ProductsQueryDto implements GetProductsRequest {
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    categoryId: number

    @IsArray()
    @ApiProperty()
    @IsOptional()
    ids: number[]

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    limit: number

    @ApiProperty()
    @IsOptional()
    orderBy: SortingProducts

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    page: number

    @IsString()
    @ApiProperty()
    @IsOptional()
    search: string
}