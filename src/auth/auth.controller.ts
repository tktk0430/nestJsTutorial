import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAllUser() {
    return this.authService.getUsers();
  }

  @Post('signup')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.authService.createUser(dto);
    return user;
  }

  @Post('signin')
  async signIn(@Body() dto: CredentialsDto) {
    return await this.authService.signIn(dto);
  }
}
