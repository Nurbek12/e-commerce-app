import { ApiProperty } from '@nestjs/swagger'
import { CreateUserRequest, userRoles } from 'gen/users'
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator'

export class CreateUserDto implements CreateUserRequest {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    firstName: string
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName: string
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    password: string
    
    @IsString()
    @ApiProperty()
    phone: string

    @IsEnum(userRoles)
    @IsOptional()
    @ApiProperty({ enum: userRoles })
    role: userRoles
}
