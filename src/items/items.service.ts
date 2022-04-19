import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = []
  findAll() {
    return this.items;
  }

  findById(id: string): Item {
    const item = this.items.find((i) => i.id === id);
    return item;
  }

  create(item: Item): Item {
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
