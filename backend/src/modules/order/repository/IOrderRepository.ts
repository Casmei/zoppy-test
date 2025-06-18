import { CreateOrderDto } from '../http/dto/create-order.dto';
import { OrderItemEntity } from '../order-item.entity';
import { OrderEntity } from '../order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  createOrder(data: CreateOrderDto): Promise<OrderEntity>;
  createOrderItems(
    orderId: number,
    data: Partial<OrderItemEntity>[],
  ): Promise<void>;
}
