import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItemEntity } from '../order/order-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  price: number;

  @OneToMany(() => OrderItemEntity, (item) => item.product)
  items: OrderItemEntity[];
}
