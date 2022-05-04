import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  @Length(2, 100)
  name: string;
}
