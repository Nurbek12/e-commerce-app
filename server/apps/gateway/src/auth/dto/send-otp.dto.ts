import { SendOTPRequest } from 'gen/auth';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOTPDto implements SendOTPRequest {
  @IsString()
  @ApiProperty()
  phone: string;
}
