import { LoginDto } from './dto/login.dto'
import { SendOTPDto } from './dto/send-otp.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { RegisterDto } from './dto/register.dto'
import { VerfyOTPDto } from './dto/verify-otp.dto'
import { ClientGrpc } from '@nestjs/microservices'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthServiceClient, AUTH_SERVICE_NAME } from 'gen/auth'
import { Controller, Post, Body, Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common'

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(@Inject('AUTH_PACKAGE') private authClient: ClientGrpc) {}

  authService: AuthServiceClient

  onModuleInit() {
    this.authService = this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  @Post('login')
  @ApiOkResponse()
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto).toPromise()
    if(result.error) throw new UnauthorizedException(result.error)
    return result
  }
  
  @Post('register')
  @ApiOkResponse()
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto as any).toPromise()
    if(result.error) throw new UnauthorizedException(result.error)
    return result
  }
  
  @Post('send-otp')
  @ApiOkResponse()
  async sendOTP(@Body() sendOTPDto: SendOTPDto) {
    const result = await this.authService.sendOtp(sendOTPDto).toPromise()
    if(result.error) throw new UnauthorizedException(result.error)
    return result
  }
  
  @Post('verify-otp')
  @ApiOkResponse()
  async verifyOTP(@Body() verifyOTPDto: VerfyOTPDto) {
    const result = await this.authService.verifyOtp(verifyOTPDto).toPromise()
    if(result.error) throw new UnauthorizedException(result.error)
    return result
  }
  
  @Post('refresh')
  @ApiOkResponse()
  async refreshToken(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto)
  }
}
