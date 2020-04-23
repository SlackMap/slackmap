import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';

/**
 *
 */
@Injectable()
export class AuthRegisterByFacebookUseCase {
  constructor(

) { }
  process(request: AuthRegisterByFacebookRequestDto): Observable<AuthRegisterByFacebookDto> {
    return of({} as any);
  }
}
