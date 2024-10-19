import { FileUpload } from '../files/upload';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ProductsServiceClient } from 'gen/products';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(@Inject('PRODUCTS_PACKAGE') private productsClient: ClientGrpc) {}

  productsService: ProductsServiceClient;

  onModuleInit() {
    this.productsService = this.productsClient.getService<ProductsServiceClient>('ProductsService');
  }

  @Post('upload/:productId')
  @UseInterceptors(FilesInterceptor('image', 6, FileUpload('products')))
  upload(
    @Param('productId') productId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = files.map(({ size, filename }) => ({
      size, productId, name: filename,
    }))

    return this.productsService.createImages({ images })
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() findQuery: ProductsQueryDto) {
    return this.productsService.getProducts(findQuery)
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productsService.getProduct({ slug });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct({ id, ...updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.deleteProduct({ id });
  }

  @Delete('image/:id')
  removeImage(@Param('id') id: number) {
    return this.productsService.deleteImage({ id });
  }
}
