import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User) {
    const { name, price, description } = createItemDto;
    const item = this.create({
      name,
      price,
      description,
      status: 'ON_SALE',
      user: user,
    });

    await this.save(item);

    return item;
  }
}
