import { Module } from '@nestjs/common'
import { clientService } from 'libs/utils'
import { ClientsModule } from '@nestjs/microservices'
import { ReviewsController } from './reviews.controller'

@Module({
  imports: [
    ClientsModule.register([
      clientService('USERS_PACKAGE')
    ])
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
