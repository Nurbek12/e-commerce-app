import { ApiProperty } from '@nestjs/swagger'
import { CreateReviewRequest } from 'gen/users'
import { IsString, IsNumber } from 'class-validator'

export class CreateReviewDto implements CreateReviewRequest {
    @IsString()
    @ApiProperty()
    text: string
    
    @IsNumber()
    @ApiProperty()
    rating: number
    
    @IsNumber()
    @ApiProperty()
    userId: number
    
    @IsNumber()
    @ApiProperty()
    productId: number
}
