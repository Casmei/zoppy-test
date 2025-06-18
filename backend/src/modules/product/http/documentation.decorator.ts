import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginatedProductResponse } from './response/all-products.response';
import { ProductCreatedResponse } from './response/product-created.response';
import { DefaultPaginationDoc } from 'src/modules/common/default-pagination-doc.decorator';

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
    DefaultPaginationDoc({ hasSearch: true }),
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

export function FindOneProductDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca um produto pelo ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do produto a ser buscado',
      type: Number,
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'Produto encontrado',
      type: ProductCreatedResponse,
    }),
    ApiResponse({
      status: 404,
      description: 'Produto não encontrado',
    }),
    ApiResponse({
      status: 400,
      description: 'ID inválido',
    }),
  );
}

export function UpdateProductDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualiza um produto existente pelo ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do produto a ser atualizado',
      type: Number,
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: 'Produto atualizado com sucesso (sem conteúdo na resposta)',
    }),
    ApiResponse({
      status: 404,
      description: 'Produto não encontrado',
    }),
    ApiResponse({
      status: 400,
      description: 'Requisição inválida',
    }),
  );
}
