import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma';
import { Prisma, UserStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const withoutPasswordSelect = Object.keys(
      Prisma.UserScalarFieldEnum,
    ).reduce((obj, x) => Object.assign(obj, { [x]: x !== 'password' }), {});
    const user = await this.prismaService.user.create({
      data: { ...dto, password: hashedPassword, userStatus: UserStatus.FREE },
      select: withoutPasswordSelect,
    });
    return user;
  }

  async signIn(dto: CredentialsDto) {
    const { username, password } = dto;
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードを確認してください',
      );
    }
  }
}
