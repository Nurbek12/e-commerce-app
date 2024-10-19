import { ApiProperty } from '@nestjs/swagger'
import { CreateProductRequest } from 'gen/products'
import { IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateProductDto implements CreateProductRequest {
    @IsString()
    @ApiProperty()
    name: string
    
    @IsNumber()
    @ApiProperty()
    count: number
    
    @IsNumber()
    @ApiProperty()
    price: number

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    discount?: number

    @IsNumber()
    @ApiProperty()
    categoryId: number
    
    @IsString()
    @ApiProperty()
    description: string
}