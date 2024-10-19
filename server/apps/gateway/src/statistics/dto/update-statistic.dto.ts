import { ApiProperty } from '@nestjs/swagger'
import { SetStatisticsRequest } from 'gen/statistics'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateStatisticDto implements SetStatisticsRequest {
    @IsString()
    @ApiProperty()
    date: string

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    amount: number
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    orders: number
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    reports: number
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    users: number
}