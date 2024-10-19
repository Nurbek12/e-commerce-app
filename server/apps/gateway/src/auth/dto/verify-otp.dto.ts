import { VerfyOTPRequest } from 'gen/auth';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerfyOTPDto implements VerfyOTPRequest {
  @IsString()
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  phone: string;
}
