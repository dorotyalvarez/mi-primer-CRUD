// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    return product;
  }

  async updateProduct(id: number, updatedProduct: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { id } });
  
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    this.productRepository.merge(existingProduct, updatedProduct);
  
    return await this.productRepository.save(existingProduct);
  }

  async deleteProduct(id: number): Promise<{message:string}> {
    await this.productRepository.delete(id);
    return {message:"elimindo"}
  }
}