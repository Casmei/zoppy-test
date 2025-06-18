import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginatedProductResponse } from './response/all-products.response';

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

export function AllProductsDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Lista todos os produtos com paginação' }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }),
    ApiResponse({
      status: 200,
      description: 'Lista de produtos',
      type: PaginatedProductResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida',
    }),
  );
}
