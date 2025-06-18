import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  AllProductsDocumentation,
  CreateProductDocumentation,
  FindOneProductDocumentation,
  UpdateProductDocumentation,
} from './documentation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../product.service';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';
import { ResourceIdParamDto } from 'src/modules/common/resource-id-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateProductDocumentation()
  async update(
    @Param('id') id: ResourceIdParamDto,
    @Body() data: UpdateProductDto,
  ) {
    return this.productService.update({ id: Number(id) }, data);
  }
}
