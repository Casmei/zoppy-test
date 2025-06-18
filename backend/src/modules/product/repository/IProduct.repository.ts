import { CreateProductDto } from '../http/dto/create-product.dto';
import { UpdateProductDto } from '../http/dto/update-product.dto';
import { ProductEntity } from '../product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface IProductRepository {
  create(data: CreateProductDto): void;
  all(params: { page: number; limit: number }): Promise<{
    data: ProductEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
  findOneById({ id }: Pick<ProductEntity, 'id'>): Promise<ProductEntity | null>;
  update({ id }: Pick<ProductEntity, 'id'>, data: UpdateProductDto): void;
}
