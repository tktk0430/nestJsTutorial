import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/entities/item.entity';
import { ItemRepository } from './item.repository';
import { User } from 'src/entities/user.entity';
@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll() {
    return await this.itemRepository.find();
  }

  async findById(id: string) {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(dto: CreateItemDto, user: User) {
    return await this.itemRepository.createItem(dto, user);
  }

  async updateStatus(id: string, user: User) {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = 'SOLD_OUT';
    const newItem = await this.itemRepository.save(item);
    return newItem;
  }

  async delete(id: string, user: User) {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    await this.itemRepository.delete(id);
    return id;
  }
}
