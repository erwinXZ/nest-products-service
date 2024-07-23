import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  create(data: {
    name: string;
    description: string;
    price: number;
  }): Promise<Product> {
    return this.productsService.create(data);
  }

  @GrpcMethod('ProductService', 'GetProduct')
  findOne(data: { id: number }): Promise<Product> {
    return this.productsService.findOne(data.id);
  }

  @GrpcMethod('ProductService', 'GetAllProducts')
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  update(data: {
    id: number;
    name: string;
    description: string;
    price: number;
  }): Promise<Product> {
    return this.productsService.update(data.id, data);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  remove(data: { id: number }): Promise<void> {
    return this.productsService.remove(data.id);
  }
}
