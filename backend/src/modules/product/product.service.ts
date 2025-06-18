import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './http/dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { IProductRepository } from './repository/IProduct.repository';
import { UpdateProductDto } from './http/dto/update-product.dto';
import { Cache } from 'cache-manager';
import { PaginationQueryDto } from '../common/pagination-query.dto';

export class ProductService {
  constructor(
    private productRepository: IProductRepository,
    private cacheManager: Cache,
  ) {}

  async create(data: CreateProductDto) {
    this.productRepository.create(data);
    this.cacheManager.clear();
  }

  async all({ limit, page, search }: PaginationQueryDto) {
    return this.productRepository.all({ page, limit, search });
  }

  async findOne({ id }: Pick<ProductEntity, 'id'>) {
    const product = await this.productRepository.findOneById({ id });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update({ id }: Pick<ProductEntity, 'id'>, data: UpdateProductDto) {
    const product = await this.productRepository.findOneById({ id });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    this.productRepository.update(product, data);
    this.cacheManager.clear();
  }
}
