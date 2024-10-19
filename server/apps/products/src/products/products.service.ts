import slugify from 'slugify'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client-products'
import { PrismaService } from '../prisma.service'
import { GetProductsRequest } from 'gen/products'
import { includeProduct } from '../constants/products'
import { CategoriesService } from '../categories/categories.service'

import { ExcludePaginationFields, PickPaginationFields } from 'libs/utils/types'

type ProductPagitanion = PickPaginationFields<GetProductsRequest>
type ProductFiltering = ExcludePaginationFields<GetProductsRequest>

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService
  ) {}

  private async buildProductFilters(filters: ProductFiltering) { 
    const where: Prisma.ProductWhereInput = {}
    const { search, categoryId, ids } = filters

    if(search) Object.assign(where, {
      name: { contains: search },
      description: { contains: search },
    })

    if(categoryId) Object.assign(where, { 
      categoryId: { in: await this.categoriesService.getCategoriesId(categoryId) }
    })

    if(ids && ids.length) Object.assign(where, {
      id: { in: ids }
    })

    return where
  }

  async paginatedProducts(findProducts: GetProductsRequest) {
    const { page, limit, orderBy, ...filter } = findProducts
    const where = await this.buildProductFilters(filter)
    
    const [count, products] = await this.prismaService.$transaction([
      this.сountProducts(where),
      this.findProducts({page, limit, orderBy}, where),
    ])

    return {count, products}
  }

  findProducts(pagination: ProductPagitanion, where: Prisma.ProductWhereInput) {
    const { page = 1, limit = 20, orderBy } = pagination

    return this.prismaService.product.findMany({
      where,
      include: includeProduct,
      skip: (page-1) * limit,
      take: limit,
      // orderBy, TODO: fix the 0, 1 enum
    })
  }

  сountProducts(where: Prisma.ProductWhereInput) {
    return this.prismaService.product.count({ where })
  }

  async findProduct(identifier: number | string) {
    const where = {} as Prisma.ProductWhereUniqueInput

    if(typeof identifier === 'number') where.id = identifier
    if(typeof identifier === 'string') where.slug = identifier

    const product = await this.prismaService.product.findUnique({ where, include: includeProduct })
    return { product }
  }

  async createProduct(createdProduct: Prisma.ProductCreateInput) {
    const product = await this.prismaService.product.create({ data: createdProduct })
    return { product }
  }

  async updateProduct(id: number, updatedProduct: Prisma.ProductUpdateInput) {
    const product = await this.prismaService.product.update({
      where: { id }, data: updatedProduct
    })
    return { product }
  }

  async removeProduct(id: number) {
    const { product } = await this.findProduct(id)
    if(product) await this.prismaService.product.delete({ where: { id } })
    return { success: true }
  }

  createSlug(name: string) {
    return slugify(name, { lower: true, strict: true })
  }
}