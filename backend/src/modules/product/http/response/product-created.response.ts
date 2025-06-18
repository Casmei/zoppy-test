import { ApiProperty } from '@nestjs/swagger';

export class ProductCreatedResponse {
  @ApiProperty({
    description: 'The unique identifier of the product',
    example: '6c76be07-b690-4903-93c8-395c30ddb69a',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'potato',
  })
  name: string;

  @ApiProperty({
    description: 'The price of the procuct',
    example: 5,
  })
  price: number;
}
