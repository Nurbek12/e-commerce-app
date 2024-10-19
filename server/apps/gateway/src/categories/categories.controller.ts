import { ClientGrpc } from '@nestjs/microservices'
import { CategoriesServiceClient } from 'gen/products'
import { CategoriesQueryDto } from './dto/categories-query.dto'
import { CreateCategoriesDto } from './dto/create-categories.dto'
import { UpdateCategoriesDto } from './dto/update-categories.dto'
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit, Query } from '@nestjs/common'

@Controller('categories')
export class CategoriesController implements OnModuleInit {
  constructor(@Inject('PRODUCTS_PACKAGE') private categoriesClient: ClientGrpc) {}
  
  categoriesService: CategoriesServiceClient

  onModuleInit() {
    this.categoriesService = this.categoriesClient.getService<CategoriesServiceClient>('CategoriesService')
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoriesDto) {
    return this.categoriesService.createCategory(createCategoryDto)
  }

  @Get()
  async findAll(@Query() findCategories: CategoriesQueryDto) {
    return this.categoriesService.getCategories(findCategories)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoriesDto) {
    return this.categoriesService.updateCategory({ id, ...updateCategoryDto })
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.deleteCategory({ id });
  }
}
