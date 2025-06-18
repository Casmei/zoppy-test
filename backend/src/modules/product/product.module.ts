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
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductRepository,
  },
];

const services: Provider[] = [
  {
    provide: ProductService,
    useFactory: (repository: IProductRepository, cacheManager: Cache) =>
      new ProductService(repository, cacheManager),
    inject: [PRODUCT_REPOSITORY, CACHE_MANAGER],
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [PRODUCT_REPOSITORY],
  controllers: [ProductController],
  providers: [...repositories, ...services],
})
export class ProductModule {}
