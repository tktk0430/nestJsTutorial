import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Item } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) { }
  @Get()
  index() {
    return this.itemService.findAll();
  }

  @Get(':id')
  retrieve(@Param('id') id: string) {
    return this.itemService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string): Item {
    const item: Item = { id, name, price, description, status: 'ON_SALE' }
    return this.itemService.create(item);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string) {
    const item = this.itemService.updateStatus(id);
    return item;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.itemService.delete(id);
  }
}
