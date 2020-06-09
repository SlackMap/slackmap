import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiAuthDomainConfig } from '../api-auth-domain.config';
import { JwtPayloadModel } from '@slackmap/api/auth/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ApiAuthDomainConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  validate(payload: JwtPayloadModel) {
    return payload; // TODO in the future, we can look up the database to verify the session
  }
}
