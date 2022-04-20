import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.createUser(dto);
    return user;
  }
}
