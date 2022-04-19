import { TItemStatus } from 'src/items/item.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: TItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
