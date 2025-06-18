import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'potato' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price', example: 5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
