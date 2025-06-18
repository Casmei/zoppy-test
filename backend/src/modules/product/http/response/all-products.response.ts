import { ApiProperty } from '@nestjs/swagger';
import { ProductCreatedResponse } from './product-created.response';

export class PaginatedProductResponse {
  @ApiProperty({
    description: 'Lista de produtos da página atual',
    type: [ProductCreatedResponse],
  })
  data: ProductCreatedResponse[];

  @ApiProperty({
    description: 'Total de produtos disponíveis',
    example: 57,
  })
  total: number;

  @ApiProperty({
    description: 'Número da página atual',
    example: 2,
  })
  page: number;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10,
  })
  limit: number;
}
