import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateItemDto } from './dto/create-item.dto';
@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.item.findMany();
  }

  async findById(id: number) {
    const item = await this.prisma.item.findFirst({ where: { id } });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(dto: CreateItemDto, user: User) {
    return await this.prisma.item.create({
      data: {
        ...dto,
        status: ItemStatus.ON_SALE,
        user: { connect: { id: user.id } },
      },
    });
  }

  async updateStatus(id: number, user: User) {
    const item = await this.prisma.item.findFirst({ where: { id } });
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    const newItem = await this.prisma.item.update({
      where: { id },
      data: item,
    });
    return newItem;
  }

  async delete(id: number, user: User) {
    const item = await this.prisma.item.findFirst({ where: { id } });
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    await this.prisma.item.delete({ where: { id } });
    return id;
  }
}
