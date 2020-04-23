import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { <%= classify(name) %>RequestDto, <%= classify(name) %>Dto } from '../dto';

/**
 *
 */
@Injectable()
export class <%= classify(name) %>UseCase {
  constructor(

) { }
  process(request: <%= classify(name) %>RequestDto): Observable<<%= classify(name) %>Dto> {
    return of({} as any);
  }
}
