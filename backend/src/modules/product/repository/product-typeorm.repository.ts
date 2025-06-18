import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../http/dto/create-product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from './IProduct.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UpdateProductDto } from '../http/dto/update-product.dto';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async update({ id }: Pick<ProductEntity, 'id'>, data: UpdateProductDto) {
    await this.productRepository.update({ id }, data);
  }

  findOneById({ id }: Pick<ProductEntity, 'id'>) {
    return this.productRepository.findOneBy({ id });
  }

  create(data: CreateProductDto) {
    const transaction = this.productRepository.create(data);
    this.productRepository.save(transaction);
  }

  async all({ page, limit, search }: PaginationQueryDto) {
    const where = search ? { name: ILike(`%${search}%`) } : {};

    const [data, total] = await this.productRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }
}
