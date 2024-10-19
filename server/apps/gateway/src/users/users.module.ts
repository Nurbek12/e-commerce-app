import { Module } from '@nestjs/common'
import { clientService } from 'libs/utils'
import { UsersController } from './users.controller'
import { ClientsModule } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      clientService('USERS_PACKAGE')
    ])
  ],
  controllers: [UsersController]
})
export class UsersModule {}
