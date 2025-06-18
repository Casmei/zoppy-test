import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../http/dto/create-product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from './IProduct.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  create(data: CreateProductDto): void {
    const transaction = this.productRepository.create(data);
    this.productRepository.save(transaction);
  }
}
