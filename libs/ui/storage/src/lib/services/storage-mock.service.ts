import {Injectable} from '@angular/core';
import {Observable, EMPTY} from 'rxjs';
import { StorageService } from './storage.service';

/**
 * on the server side we have to mock the IonicStorage module
 */
@Injectable({
  providedIn: 'root'
})
export class StorageMockService implements Partial<StorageService> {

  ready(): Observable<LocalForage> {
    return EMPTY;
  }

  get<T>(name: string): Observable<T> {
    return EMPTY;
  }

  set<T>(name: string, value: any): Observable<T> {
    return EMPTY;
  }

}
