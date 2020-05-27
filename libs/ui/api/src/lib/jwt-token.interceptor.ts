import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UiApiService } from './ui-api.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private apiService: UiApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiToken = this.apiService.getToken();
    if(apiToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${apiToken}`
        }
      });
    }
    return next.handle(request);
  }
}
