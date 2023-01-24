import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';


const { expressjwt: expressJwt } = require('express-jwt');


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(
      expressJwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: this.configService.get('AUTH0_JWKSURI'),
        }),
        audience: this.configService.get('AUTH0_AUDIENCE'),
        issuer: this.configService.get('AUTH0_ISSUER'),
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

  }
}
