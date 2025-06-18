import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

export function CreateProductDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo produto' }),
    ApiBody({
      description: 'Dados necessários para criar um novo produto',
      type: CreateProductDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Produto criado com sucesso',
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida (validação falhou)',
    }),
  );
}
