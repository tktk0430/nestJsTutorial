import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAllUser() {
    return this.authService.getUsers();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const user = this.authService.createUser(dto);
    return user;
  }
}
