import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
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
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateItemDto, @GetUser() user: User) {
    return await this.itemService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string) {
    const item = this.itemService.updateStatus(id);
    return item;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    this.itemService.delete(id);
  }
}
