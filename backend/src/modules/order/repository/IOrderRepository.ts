import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';
import { OrderItemEntity } from '../order-item.entity';
import { OrderEntity } from '../order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  createOrder(data: Partial<OrderEntity>): Promise<OrderEntity>;
  createOrderItems(
    orderId: number,
    data: Partial<OrderItemEntity>[],
  ): Promise<void>;
  all(params: PaginationQueryDto): Promise<{
    data: OrderEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
}
