import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hashedPassword = password;
    const user = this.create({ ...dto, password: hashedPassword });
    await this.save(user);
    return user;
  }
}
