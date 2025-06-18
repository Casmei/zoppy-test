import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
