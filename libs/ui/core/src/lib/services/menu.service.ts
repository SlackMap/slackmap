import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuView: ViewContainerRef;
  public mapTopMenuView: ViewContainerRef;
  public mapBottomMenuView: ViewContainerRef;

  constructor() { }
}
