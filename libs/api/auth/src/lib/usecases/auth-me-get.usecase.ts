import { Injectable } from '@nestjs/common';
import { Observable, of} from 'rxjs';
import { JwtPayloadModel } from '../models';
import { UserService } from '../services';
import { AuthMeGetDto } from '../dto';

/**
 * Returns all info required for frontend about current user
 */
@Injectable()
export class AuthMeGetUseCase {

  constructor(private userService: UserService) { }

  process(payload: JwtPayloadModel): Observable<AuthMeGetDto> {

    return of({
      ...payload
    });
  }
}
