import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredStatus = this.reflector.get<string[]>(
      'statuses',
      context.getHandler(),
    );

    if (requiredStatus.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredStatus.includes(user.userStatus);
  }
}
