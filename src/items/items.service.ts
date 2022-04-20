import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from 'src/entities/item.entity';
import { ItemRepository } from './item.repository';
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

  async create(dto: CreateItemDto) {
    return await this.itemRepository.createItem(dto);
  }

  async updateStatus(id: string) {
    const item = await this.findById(id);
    item.status = 'SOLD_OUT';
    const newItem = await this.itemRepository.save(item);
    return newItem;
  }

  delete(id: string) {
    this.itemRepository.delete(id);
    return id;
  }
}
