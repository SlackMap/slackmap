import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public vcr: ViewContainerRef;

  constructor() { }
}
