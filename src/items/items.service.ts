import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll() {
    return this.items;
  }

  findById(id: string): Item {
    const item = this.items.find((i) => i.id === id);
    return item;
  }

  create(dto: CreateItemDto): Item {
    const item: Item = { ...dto, status: 'ON_SALE', id: uuid() };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
