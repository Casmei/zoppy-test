import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DefaultPaginationDoc } from 'src/modules/common/default-pagination-doc.decorator';
import { PaginatedOrderResponse } from './reponse/all-orders.response';
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

export function AllOrdersDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Lista todos os pedidos com paginação' }),
    DefaultPaginationDoc(),
    ApiResponse({
      status: 200,
      description: 'Lista de pedidos',
      type: PaginatedOrderResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida',
    }),
  );
}

export function CancelOrderDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Cancela um pedido' }),
    ApiParam({
      name: 'id',
      description: 'ID do pedido que será cancelado',
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: 'Pedido cancelado com sucesso (sem corpo de resposta)',
    }),
    ApiResponse({
      status: 404,
      description: 'Pedido não encontrado',
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida',
    }),
  );
}
