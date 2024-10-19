import { RefreshRequest } from 'gen/auth'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto implements RefreshRequest {
    @IsString()
    @ApiProperty()
    refreshToken: string
}