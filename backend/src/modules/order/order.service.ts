import { Cache } from 'cache-manager';
import { CreateOrderDto } from './http/dto/create-order.dto';
import { IOrderRepository } from './repository/IOrderRepository';
import { IProductRepository } from '../product/repository/IProduct.repository';
import { OrderItemEntity } from './order-item.entity';
import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { OrderEntity } from './order.entity';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private cacheManager: Cache,
  ) {}

  async create({ customerName, items }: CreateOrderDto) {
    let totalOrderValue = 0;

    const orderItems = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await this.productRepository.findOneById({
          id: productId,
        });

        if (!product) {
          throw new NotFoundException(
            `Produto com ID ${productId} não encontrado.`,
          );
        }

        const total = product.price * quantity;
        totalOrderValue += total;
        return {
          product,
          quantity,
          total,
          unitPrice: product.price,
        } as Partial<OrderItemEntity>;
      }),
    );

    const order = await this.orderRepository.createOrder({
      customerName,
      total: totalOrderValue,
    });

    this.orderRepository.createOrderItems(order.id, orderItems);
    this.cacheManager.clear();
  }

  async all({ page, limit }: PaginationQueryDto) {
    return this.orderRepository.all({ page, limit });
  }

  async cancel({ id }: Pick<OrderEntity, 'id'>) {
    const order = await this.orderRepository.findOneById({ id });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    this.cacheManager.clear();
    this.orderRepository.cancel(id);
  }
}
