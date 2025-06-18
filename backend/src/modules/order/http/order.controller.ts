import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from '../order.service';
import {
  AllOrdersDocumentation,
  CreateOrderDocumentation,
} from './documentation.decorator';
import { DefaultPaginationQuery } from 'src/modules/common/default-pagination.query';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @CreateOrderDocumentation()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get()
  @AllOrdersDocumentation()
  @HttpCode(HttpStatus.CREATED)
  async all(
    @DefaultPaginationQuery({ hasSearch: false }) query: PaginationQueryDto,
  ) {
    return this.orderService.all(query);
  }
}
