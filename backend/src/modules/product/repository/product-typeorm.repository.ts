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

  async all({ page, limit }: { page: number; limit: number }) {
    const [data, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    console.log(data, total, page, limit);

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }
}
