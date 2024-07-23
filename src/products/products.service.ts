import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: { name: string, description: string, price: number }): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<any> {
    const products = await this.productRepository.find();
    return { products };
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
