import { IOrderRepository } from './IOrderRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../order-item.entity';
import { CreateOrderDto } from '../http/dto/create-order.dto';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrderItems(orderId: number, data: Partial<OrderItemEntity>[]) {
    const orderItems = data.map((item) => {
      return this.orderItemRepository.create({
        ...item,
        order: { id: orderId },
      });
    });

    await this.orderItemRepository.save(orderItems);
  }

  async createOrder(data: CreateOrderDto) {
    const order = this.orderRepository.create({
      customerName: data.customerName,
    });

    await this.orderRepository.save(order);

    return order;
  }

  async all({ page, limit }: PaginationQueryDto) {
    const [data, total] = await this.orderRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        items: {
          product: true,
        },
      },
    });

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }
}
