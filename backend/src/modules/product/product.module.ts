import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductController } from './http/product.controller';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from './repository/IProduct.repository';
import { ProductRepository } from './repository/product-typeorm.repository';
import { ProductService } from './product.service';

const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductRepository,
  },
];

const services: Provider[] = [
  {
    provide: ProductService,
    useFactory: (repository: IProductRepository) =>
      new ProductService(repository),
    inject: [PRODUCT_REPOSITORY],
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [...repositories, ...services],
})
export class ProductModule {}
