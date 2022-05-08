import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    });
  }

  async validate(payload: { id: number; username: string }) {
    const { id, username } = payload;
    const user = await this.prismaService.user.findFirst({
      where: { id, username },
    });

    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
