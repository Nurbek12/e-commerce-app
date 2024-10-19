import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client-products'
import { PrismaService } from '../prisma.service'
import { GetCategoriesRequest } from 'gen/products'
import { ExcludePaginationFields, PickPaginationFields } from 'libs/utils/types'

type CategoryPagitanion = PickPaginationFields<GetCategoriesRequest>
type CategoryFiltering = ExcludePaginationFields<GetCategoriesRequest>

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  private buildCategoryFilters(filters: CategoryFiltering) {
    const where: Prisma.CategoryWhereInput = {}
    const { parentId, search } = filters

    if(search) Object.assign(where, {
      name: { contains: search },
      description: { contains: search },
    })

    if(parentId) Object.assign(where, { parentId: parentId == -1 ? null : parentId })

    return where
  }

  async getCategoriesId(parentId: number) {
    const categories = await this.prismaService.category.findMany({
      where: { parentId },
      include: {
        childrens: {
          select: { id: true }
        }
      }
    })
    
    return categories.reduce((acc, category) => {
      const childrenIds = category.childrens.map(c => c.id)
      return [...acc, category.id, ...childrenIds]
    }, [parentId] as number[])
  }

  async paginatedCategories(findCategories: GetCategoriesRequest) {
    const { page, limit, ...filter } = findCategories
    const where = this.buildCategoryFilters(filter)

    const [ count, categories ] = await this.prismaService.$transaction([
      this.countCategories(where),
      this.findCategories({ page, limit }, where)
    ])

    return { count, categories }
  }
  
  countCategories(where: Prisma.CategoryWhereInput) {
    return this.prismaService.category.count({ where })
  }

  findCategories(pagination: CategoryPagitanion, where: Prisma.CategoryWhereInput) {
    const { page = 1, limit = 20 } = pagination
    
    return this.prismaService.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit
    })
  }

  async findCategory(id: number) {
    const category = await this.prismaService.category.findUnique({ where: { id } })
    return { category }
  }

  async createCategory(createdCategory: Prisma.CategoryCreateInput) {
    const category = await this.prismaService.category.create({ data: createdCategory })
    return { category }
  }

  async updateCategory(id: number, updatedCategory: Prisma.CategoryUpdateInput) {
    const category = await this.prismaService.category.update({ where: { id }, data: updatedCategory })
    return { category }
  }

  async removeCategory(id: number) {
    const { category } = await this.findCategory(id)
    if(category) await this.prismaService.category.delete({ where: { id } })
    return { success: true }
  }
}
