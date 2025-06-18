import { CreateProductDto } from './http/dto/create-product.dto';
import { IProductRepository } from './repository/IProduct.repository';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async create(data: CreateProductDto) {
    this.productRepository.create(data);
  }
}
