import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  readonly JWT_SECRET = process.env.JWT_SECRET;
}
