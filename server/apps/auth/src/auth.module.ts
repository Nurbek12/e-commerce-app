import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { clientService } from 'libs/utils'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ClientsModule } from '@nestjs/microservices'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'JWT_MODULE_SECRET',
    }),
    ClientsModule.register([
      clientService('USERS_PACKAGE')
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}