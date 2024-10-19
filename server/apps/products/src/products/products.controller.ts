import { Controller } from '@nestjs/common';
import { GetByIdRequest } from 'gen/constants';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { ProductImagesService } from './product-images.service';
import {
  ProductImage,
  GetProductBySlug,
  GetProductsRequest,
  CreateProductImages,
  CreateProductRequest,
  UpdateProductRequest,
  PRODUCTS_SERVICE_NAME,
} from 'gen/products';

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productImagseService: ProductImagesService,
  ) {}

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'CreateProduct')
  createProduct(createdProduct: CreateProductRequest) {
    const data = { ...createdProduct,
      slug: this.productsService.createSlug(createdProduct.name) };
    return this.productsService.createProduct(data as any);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'GetProducts')
  getProducts(findProducts: GetProductsRequest) {
    return this.productsService.paginatedProducts(findProducts);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'GetProduct')
  getProduct(findProduct: GetProductBySlug) {
    return this.productsService.findProduct(findProduct.slug);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'UpdateProduct')
  updateProduct(updatedCategory: UpdateProductRequest) {
    const { id, ...body } = updatedCategory;
    return this.productsService.updateProduct(id, body);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'DeleteProduct')
  deleteProduct(removedProduct: GetByIdRequest) {
    return this.productsService.removeProduct(removedProduct.id);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'CreateImage')
  createImage(image: ProductImage) {
    return this.productImagseService.createImage(image as any);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'CreateImages')
  createImages(images: CreateProductImages) {
    return this.productImagseService.createImages(images.images);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'DeleteImage')
  deleteImage(removedImage: GetByIdRequest) {
    return this.productImagseService.removeImage(removedImage.id);
  }
}
