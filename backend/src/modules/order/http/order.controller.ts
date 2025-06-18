import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from '../order.service';
import { CreateOrderDocumentation } from './documentation.decorator';

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
}
