import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = this.create({ ...dto, password: hashedPassword });
    await this.save(user);
    return user;
  }
}
