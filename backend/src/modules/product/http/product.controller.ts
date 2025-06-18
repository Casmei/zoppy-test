import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductDocumentation } from './documentation.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  @Post()
  @CreateProductDocumentation()
  async create(@Body() data: CreateProductDto) {
    console.log(data);
  }
}
