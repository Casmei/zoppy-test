import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductDocumentation } from './documentation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../product.service';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @CreateProductDocumentation()
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }
}
