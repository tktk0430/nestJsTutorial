import { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: UserStatus.FREE })
  userStatus: UserStatus;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
