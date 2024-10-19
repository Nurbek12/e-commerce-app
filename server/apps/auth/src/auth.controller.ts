import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserRequest } from 'gen/users'
import { GrpcMethod } from '@nestjs/microservices'
import { SendOTPRequest, VerfyOTPRequest, LoginRequest, RefreshRequest, AUTH_SERVICE_NAME } from 'gen/auth'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'SendOTP')
  sendOTP(sendOTPData: SendOTPRequest) {
    return this.authService.sendOTP(sendOTPData)
  }
  
  @GrpcMethod(AUTH_SERVICE_NAME, 'VerifyOTP')
  verifyOTP(verifyOTPData: VerfyOTPRequest) {
    return this.authService.verifyOTP(verifyOTPData)
  }
  
  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  login(loginData: LoginRequest) {
    return this.authService.login(loginData)
  }
  
  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  register(registerData: CreateUserRequest) {
    return this.authService.register(registerData)
  }
  
  @GrpcMethod(AUTH_SERVICE_NAME, 'RefreshToken')
  refreshToken(refreshData: RefreshRequest) {
    return this.authService.refreshToken(refreshData)
  }
}
