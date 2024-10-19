import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client-users'
import { PrismaService } from '../prisma.service'
import { GetReviewsRequest } from 'gen/users'
import { ExcludePaginationFields, PickPaginationFields } from 'libs/utils/types'

type ReviewsPagitanion = PickPaginationFields<GetReviewsRequest>
type ReviewsFiltering = ExcludePaginationFields<GetReviewsRequest>

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  private buildReviewFilter(filters: ReviewsFiltering) { 
    const where: Prisma.ReviewWhereInput = {}
    const { search, productId, userId } = filters

    if(search) Object.assign(where, {
      text: { contains: search },
    })

    if(userId) Object.assign(where, { 
      userId
    })
    
    if(productId) Object.assign(where, { 
      productId
    })

    return where
  }

  async paginatedReviews(findReviews: GetReviewsRequest) {
    const { page, limit, orderBy, ...filter } = findReviews
    const where = this.buildReviewFilter(filter)

    const [count, reviews] = await this.prismaService.$transaction([
      this.countReviews(where),
      this.findReviews({page, limit, orderBy}, where),
    ])

    return {count, reviews}
  }

  findReviews(sorting: ReviewsPagitanion, where: Prisma.ReviewWhereInput) {
    const { page = 1, limit = 20, orderBy } = sorting
    return this.prismaService.review.findMany({
      where,
      skip: (page-1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        } 
      },
      // orderBy, TODO: fix the 0, 1 enum
    })
  }

  countReviews(where: Prisma.ReviewWhereInput) {
    return this.prismaService.review.count({ where })
  }

  async findReview(id: number) {
    const review = await this.prismaService.review.findMany({
      where: { id }
    })

    return { review }
  }

  async createReview(createdReview: Prisma.ReviewCreateInput) {
    const review = await this.prismaService.review.create({ data: createdReview })
    return { review }
  }

  async updateReview(id: number, updatedReview: Prisma.ReviewUpdateInput) {
    const review = await this.prismaService.review.update({
      where: { id },
      data: updatedReview
    })
    return { review }
  }

  async removeReview(id: number) {
    const { review } = await this.findReview(id)
    if(review) await this.prismaService.review.delete({ where: { id } })
    return { success: true }
  }
}