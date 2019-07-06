import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class UhfMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  config = {
    TOKEN_HEADER_NAME: 'apitoken'
  }
  use(req, res, next) {
    if (req.headers[this.config.TOKEN_HEADER_NAME]) {
      const payload =  this.jwt.tokenVerify(req.headers[this.config.TOKEN_HEADER_NAME]);
      if (payload) {
        req.user = payload.user;
      }
    }
    next();
  }
}
