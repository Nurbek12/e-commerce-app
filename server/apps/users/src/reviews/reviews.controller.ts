import { Controller } from '@nestjs/common'
import { GetByIdRequest } from 'gen/constants'
import { GrpcMethod } from '@nestjs/microservices'
import { ReviewsService } from './reviews.service'
import { GetReviewsRequest, CreateReviewRequest, UpdateReviewRequest, REVIEWS_SERVICE_NAME } from 'gen/users'

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @GrpcMethod(REVIEWS_SERVICE_NAME, 'GetReviews')
  findAll(findReviews: GetReviewsRequest) {
    return this.reviewsService.paginatedReviews(findReviews)
  }
  
  @GrpcMethod(REVIEWS_SERVICE_NAME, 'CreateReview')
  create(createdReview: CreateReviewRequest) {
    return this.reviewsService.createReview(createdReview as any)
  }
  
  @GrpcMethod(REVIEWS_SERVICE_NAME, 'UpdateReview')
  update(updatedReview: UpdateReviewRequest) {
    const { id, ...reviewData } = updatedReview
    return this.reviewsService.updateReview(id, reviewData)
  }
  
  @GrpcMethod(REVIEWS_SERVICE_NAME, 'DeleteReview')
  remove(removedReview: GetByIdRequest) {
    return this.reviewsService.removeReview(removedReview.id)
  }
}
