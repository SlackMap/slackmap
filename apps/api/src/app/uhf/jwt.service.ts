import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {

  constructor() {}

  tokenSign(payload): string {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
  tokenDecode(token: string): any | null {
    return jwt.decode(token);
  }
  tokenVerify(token: string): any | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}
