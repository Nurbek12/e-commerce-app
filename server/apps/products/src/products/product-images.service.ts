import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client-products'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ProductImagesService {
  constructor(private readonly prismaService: PrismaService) {}

  createImage(image: Prisma.ProductImageCreateInput) {
    return this.prismaService.productImage.create({
      data: image
    })
  }

  async createImages(data: Prisma.ProductImageCreateManyInput[]) {
    const images = await this.prismaService.productImage.createManyAndReturn({
      data,
      select: {
        id: true,
        name: true,
        size: true,
      }
    })

    return { images }
  }

  findImage(id: number) {
    return this.prismaService.productImage.findUnique({ where: { id } })
  }

  async removeImage(id: number) {
    const image = await this.findImage(id)
    if(image) await this.prismaService.productImage.delete({ where: { id } })
    return { success: true }
  }
}