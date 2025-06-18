import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './repository/IOrderRepository';
import { OrderRepository } from './repository/order-typeorm.repository';
import { OrderService } from './order.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { OrderController } from './http/order.controller';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../product/repository/IProduct.repository';
import { ProductModule } from '../product/product.module';

const repositories: Provider[] = [
  {
    provide: ORDER_REPOSITORY,
    useClass: OrderRepository,
  },
];

const services: Provider[] = [
  {
    provide: OrderService,
    useFactory: (
      orderRepository: IOrderRepository,
      productRepository: IProductRepository,
      cacheManager: Cache,
    ) => new OrderService(orderRepository, productRepository, cacheManager),
    inject: [ORDER_REPOSITORY, PRODUCT_REPOSITORY, CACHE_MANAGER],
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [...repositories, ...services],
})
export class OrderModule {}
