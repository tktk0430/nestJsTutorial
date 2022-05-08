import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.createUser(dto);
    return user;
  }

  async signIn(dto: CredentialsDto) {
    const { username, password } = dto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードを確認してください',
      );
    }
  }
}
