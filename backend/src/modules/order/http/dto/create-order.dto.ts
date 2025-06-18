import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID do produto a ser incluído no pedido',
    example: 42,
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 3,
  })
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nome do cliente que está realizando o pedido',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Lista de itens que compõem o pedido',
    type: [CreateOrderItemDto],
    example: [
      { productId: 42, quantity: 3 },
      { productId: 17, quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
