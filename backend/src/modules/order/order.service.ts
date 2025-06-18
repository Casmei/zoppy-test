import { Cache } from 'cache-manager';
import { CreateOrderDto } from './http/dto/create-order.dto';
import { IOrderRepository } from './repository/IOrderRepository';
import { IProductRepository } from '../product/repository/IProduct.repository';
import { OrderItemEntity } from './order-item.entity';
import { NotFoundException } from '@nestjs/common';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private cacheManager: Cache,
  ) {}

  async create(data: CreateOrderDto) {
    const orderItems = await Promise.all(
      data.items.map(async ({ productId, quantity }) => {
        const product = await this.productRepository.findOneById({
          id: productId,
        });

        if (!product) {
          throw new NotFoundException(
            `Produto com ID ${productId} não encontrado.`,
          );
        }

        return {
          product,
          quantity,
          unitPrice: product.price,
          subtotal: product.price * quantity,
        } as Partial<OrderItemEntity>;
      }),
    );

    const order = await this.orderRepository.createOrder(data);
    this.orderRepository.createOrderItems(order.id, orderItems);

    this.cacheManager.clear();
  }
}
