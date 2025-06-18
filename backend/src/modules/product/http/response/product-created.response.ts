import { ApiProperty } from '@nestjs/swagger';

export class ProductCreatedResponse {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'potato',
  })
  name: string;

  @ApiProperty({
    description: 'The price of the procuct',
    example: 5000,
    type: 'integer',
  })
  price: string;
}
