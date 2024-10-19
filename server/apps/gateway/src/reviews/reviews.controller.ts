import { ClientGrpc } from '@nestjs/microservices'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ReviewsServiceClient, REVIEWS_SERVICE_NAME, GetReviewsRequest } from 'gen/users'
import { Controller, Get, Post, Body, Put, Param, Delete, Query, Inject, OnModuleInit } from '@nestjs/common'

@Controller('reviews')
export class ReviewsController implements OnModuleInit {
  constructor(@Inject('USERS_PACKAGE') private reviewsClient: ClientGrpc) {}

  reviewsService: ReviewsServiceClient

  onModuleInit() {
    this.reviewsService = this.reviewsClient.getService<ReviewsServiceClient>(REVIEWS_SERVICE_NAME)
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto)
  }

  @Get()
  findAll(@Query() reviewQueries: GetReviewsRequest) {
    return this.reviewsService.getReviews(reviewQueries)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview({ id, ...updateReviewDto});
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reviewsService.deleteReview({ id });
  }
}
