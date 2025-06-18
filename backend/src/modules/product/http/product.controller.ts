import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  @Post()
  async create(@Body() data: CreateProductDto) {
    console.log(data);
  }
}
