import { IOrderRepository } from './IOrderRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderStatus } from '../order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../order-item.entity';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async cancel(id: number): Promise<void> {
    this.orderRepository.update(
      { id },
      { canceledAt: new Date(), status: OrderStatus.CANCELED },
    );
  }

  async findOneById({
    id,
  }: Pick<OrderEntity, 'id'>): Promise<OrderEntity | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async createOrderItems(orderId: number, data: Partial<OrderItemEntity>[]) {
    const orderItems = data.map((item) => {
      return this.orderItemRepository.create({
        ...item,
        order: { id: orderId },
      });
    });

    await this.orderItemRepository.save(orderItems);
  }

  async createOrder(data: Partial<OrderEntity>) {
    const order = this.orderRepository.create(data);
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
