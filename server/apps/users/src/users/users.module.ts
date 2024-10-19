import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaService } from '../prisma.service'
import { UsersController } from './users.controller'
import { ReviewsModule } from '../reviews/reviews.module'

@Module({
  imports: [ReviewsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
