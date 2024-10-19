import { ApiProperty } from '@nestjs/swagger'
import { GetCategoriesRequest } from 'gen/products'
import { IsNumber, IsString, IsOptional } from 'class-validator'

export class CategoriesQueryDto implements GetCategoriesRequest {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    page: number

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    limit: number

    @IsString()
    @IsOptional()
    @ApiProperty()
    search: string
}