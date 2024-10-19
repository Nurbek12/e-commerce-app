import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token);
      req['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return this.checkRole(context);
  }

  checkRole(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];

    if (!user) {
      return true;
    }

    return roles.includes(user.role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
