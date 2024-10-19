import { LoginRequest } from 'gen/auth'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto implements LoginRequest {
    @IsString()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}