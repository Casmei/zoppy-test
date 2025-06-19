import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from '../order.service';
import {
  AllOrdersDocumentation,
  CancelOrderDocumentation,
  CreateOrderDocumentation,
} from './documentation.decorator';
import { DefaultPaginationQuery } from 'src/modules/common/default-pagination.query';
import { PaginationQueryDto } from 'src/modules/common/pagination-query.dto';
import { ResourceIdParamDto } from 'src/modules/common/resource-id-param.dto';

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
  async all(
    @DefaultPaginationQuery({ hasSearch: false }) query: PaginationQueryDto,
  ) {
    return this.orderService.all(query);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @CancelOrderDocumentation()
  async cancel(@Param('id') id: ResourceIdParamDto) {
    return this.orderService.cancel({ id: Number(id) });
  }
}
