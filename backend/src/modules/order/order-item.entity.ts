import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float',
    nullable: false,
  })
  total: number;

  @Column()
  quantity: number;

  @Column({
    type: 'float',
    nullable: false,
  })
  unitPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.items)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  get subtotal(): number {
    return Number(this.unitPrice) * this.quantity;
  }
}
