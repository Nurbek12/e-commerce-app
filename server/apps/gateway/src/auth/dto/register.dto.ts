import { CreateUserRequest } from 'gen/users';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RegisterDto implements Partial<CreateUserRequest> {
  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName: string;
}
