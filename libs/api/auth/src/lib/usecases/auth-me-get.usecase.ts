import { Injectable } from '@nestjs/common';
import { Observable, of} from 'rxjs';
import { JwtPayloadModel } from '../models';
import { AuthMeGetDto } from '../dto';

/**
 * Returns all info required for frontend about current user
 */
@Injectable()
export class AuthMeGetUseCase {

  process(payload: JwtPayloadModel): Observable<AuthMeGetDto> {

    return of({
      ...payload
    });
  }
}
