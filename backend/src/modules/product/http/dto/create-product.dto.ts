import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Batata' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Preço do produto em centavos', example: 5000 })
  @IsNumber()
  @Min(0)
  price: number;
}
