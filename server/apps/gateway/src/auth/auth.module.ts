import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { clientService } from 'libs/utils'
import { AuthController } from './auth.controller'
import { ClientsModule} from '@nestjs/microservices'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'JWT_MODULE_SECRET',
    }),
    ClientsModule.register([
      clientService('AUTH_PACKAGE')
    ])
  ],
  controllers: [AuthController]
})
export class AuthModule {}
