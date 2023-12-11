import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';  // Add this line

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() updatedProduct: Product): Promise<Product> {
    return this.productService.updateProduct(id, updatedProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<{message:string}> {
    return this.productService.deleteProduct(id);
  }
}