import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get()
  async index() {
    return await this.itemService.findAll();
  }

  @Get(':id')
  async retrieve(@Param('id') id: string) {
    return await this.itemService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateItemDto) {
    return await this.itemService.create(dto);
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
