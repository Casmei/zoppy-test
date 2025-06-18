import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../order.entity';
import { ProductCreatedResponse } from 'src/modules/product/http/response/product-created.response';

export class OrderItemResponse {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 15000, type: 'integer' })
  total: number;

  @ApiProperty({ example: 3 })
  quantity: number;

  @ApiProperty({ example: 5000, type: 'integer' })
  unitPrice: number;

  @ApiProperty({ type: ProductCreatedResponse })
  product: ProductCreatedResponse;
}

export class OrderCreatedResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João da Silva' })
  customerName: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
  status: OrderStatus;

  @ApiProperty({
    description: 'Itens do pedido',
    type: [OrderItemResponse],
  })
  items: OrderItemResponse[];

  @ApiProperty({ example: '2025-06-18T13:45:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-18T14:12:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  paidAt: Date;

  @ApiProperty({ example: null, nullable: true })
  shippedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  canceledAt: Date;
}

export class PaginatedOrderResponse {
  @ApiProperty({
    description: 'Lista de pedidos da página atual',
    type: [OrderCreatedResponse],
  })
  data: OrderCreatedResponse[];

  @ApiProperty({
    description: 'Total de pedidos disponíveis',
    example: 125,
  })
  total: number;

  @ApiProperty({
    description: 'Número da página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10,
  })
  limit: number;
}
