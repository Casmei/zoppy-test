import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  AllProductsDocumentation,
  CreateProductDocumentation,
  FindOneProductDocumentation,
} from './documentation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../product.service';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';
import { ResourceIdParamDto } from 'src/modules/common/resource-id-param.dto';

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

  @Get(':id')
  @FindOneProductDocumentation()
  async findOne(@Param('id') id: ResourceIdParamDto) {
    return this.productService.findOne({ id: Number(id) });
  }
}
