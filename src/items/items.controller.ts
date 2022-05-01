import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { UserStatus } from 'src/auth/user-status.enum';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
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
  @Role(UserStatus.FREE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() dto: CreateItemDto, @GetUser() user: User) {
    return await this.itemService.create(dto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @GetUser() user: User) {
    const item = this.itemService.updateStatus(id, user);
    return item;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetUser() user: User) {
    await this.itemService.delete(id, user);
  }
}
