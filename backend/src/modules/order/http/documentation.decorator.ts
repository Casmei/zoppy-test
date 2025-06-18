import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

export function CreateOrderDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo pedido' }),
    ApiBody({
      description:
        'Dados necessários para criar um novo pedido, incluindo nome do cliente e itens do pedido.',
      type: CreateOrderDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Pedido criado com sucesso',
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida (falha na validação)',
    }),
  );
}
