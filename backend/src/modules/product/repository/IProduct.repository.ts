import { CreateProductDto } from '../http/dto/create-product.dto';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface IProductRepository {
  create(data: CreateProductDto): void;
}
