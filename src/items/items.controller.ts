import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get()
  index() {
    return this.itemService.findAll();
  }

  @Get(':id')
  retrieve(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateItemDto): Item {
    return this.itemService.create(dto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    const item = this.itemService.updateStatus(id);
    return item;
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.itemService.delete(id);
  }
}
