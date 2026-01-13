import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('[microvideo:auth-guard]~ canActivate ~ context:', context);
    if (context.getType() !== 'http') {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    console.log('[microvideo:auth-guard]~ canActivate ~ request:', request);
    const token = this.extractTokenFromHeader(request);
    console.log('[microvideo:auth-guard]~ canActivate ~ token:', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log('[microvideo:auth-guard]~ canActivate ~ token:', token);
    try {
      const payload = this.jwtService.verify(token);
      console.log('[microvideo:auth-guard]~ canActivate ~ payload:', payload);
      console.log('~ AuthGuard ~ canActivate ~ payload:', payload);
      request['user'] = payload;
      return true;
    } catch (e) {
      console.log('[microvideo:auth-guard]~ canActivate ~ e:', e);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
