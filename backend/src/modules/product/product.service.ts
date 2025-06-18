import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './http/dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { IProductRepository } from './repository/IProduct.repository';
import { UpdateProductDto } from './http/dto/update-product.dto';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async create(data: CreateProductDto) {
    this.productRepository.create(data);
  }

  async all(query: { page?: number; limit?: number }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    return this.productRepository.all({ page, limit });
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
  }
}
