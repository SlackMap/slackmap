import { Injectable } from '@angular/core';
import { Observable, from, merge, EMPTY, of } from 'rxjs';
import {Storage} from '@ionic/storage';
// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  // storage.ready().then(() => {
  //   console.log('storage ready');
  // });
  }

  ready(): Observable<LocalForage> {
    return from(this.storage.ready());
  }

  get<T>(key: string): Observable<T> {
    return from(this.storage.get(key));
  }

  set<T>(key: string, value: any): Observable<T> {
    return from(this.storage.set(key, value));
  }

  /**
   * capacitor version
   */

  // get<T>(key: string): Observable<T> {
  //   return from(Storage.get({ key }).then(ret => JSON.parse(ret.value)));
  // }

  // set(key: string, value: any): Observable<void> {
  //   return from(Storage.set({
  //     key,
  //     value: JSON.stringify(value)
  //   }))
  // }
  // remove(key: string): Observable<void> {
  //   return from(Storage.remove({ key }));
  // }

  // keys(): Observable<string[]> {
  //   return from(Storage.keys().then(res => res.keys));
  // }

  // clear(): Observable<void> {
  //   return from(Storage.clear());
  // }

}
