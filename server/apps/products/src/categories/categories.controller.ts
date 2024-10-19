import { Controller } from '@nestjs/common'
import { GetByIdRequest } from 'gen/constants'
import { GrpcMethod } from '@nestjs/microservices'
import { CategoriesService } from './categories.service'
import { GetCategoriesRequest, CreateCategoryRequest, UpdateCategoryRequest, CATEGORIES_SERVICE_NAME } from 'gen/products'

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @GrpcMethod(CATEGORIES_SERVICE_NAME, 'CreateCategory')
  createCategory(createCategoryDto: CreateCategoryRequest) {
    return this.categoriesService.createCategory(createCategoryDto)
  }

  @GrpcMethod(CATEGORIES_SERVICE_NAME, 'GetCategories')
  findAll(findCategories: GetCategoriesRequest) {
    return this.categoriesService.paginatedCategories(findCategories)
  }

  @GrpcMethod(CATEGORIES_SERVICE_NAME, 'UpdateCategory')
  update(updateCategoryDto: UpdateCategoryRequest) {
    return this.categoriesService.updateCategory(updateCategoryDto.id, updateCategoryDto);
  }

  @GrpcMethod(CATEGORIES_SERVICE_NAME, 'DeleteCategory')
  remove(removedCategory: GetByIdRequest) {
    return this.categoriesService.removeCategory(removedCategory.id)
  }
}
