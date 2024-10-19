import { ApiProperty } from '@nestjs/swagger'
import { CreateCategoryRequest } from 'gen/products'
import { IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateCategoriesDto implements CreateCategoryRequest {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    image: string

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    parentId?: number

    @IsString()
    @ApiProperty()
    description: string
}