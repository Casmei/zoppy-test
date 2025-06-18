import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  AllProductsDocumentation,
  CreateProductDocumentation,
} from './documentation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../product.service';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @CreateProductDocumentation()
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Get()
  @AllProductsDocumentation()
  async all(@Query() query: PaginationQueryDto) {
    return this.productService.all(query);
  }
}
