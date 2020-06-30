import { Injectable, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { UiConfig } from '@slackmap/ui/config';
import { DOCUMENT } from '@angular/common';
import { switchMap } from 'rxjs/operators';

interface FB {
  init: () => void;
  login: (cb, options) => void;
}
declare global {
  interface Window {
    fbAsyncInit: () => void
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  FB$ = new Observable<FB>(subscriber => {

    if (!this.config.isBrowser) {
      subscriber.error(`Facebook SDK is not supportend on ${this.config.platformId} platform`);
      return;
    }

    if (!this.config.FACEBOOK_APP_ID) {
      subscriber.error(`Application "FACEBOOK_APP_ID" configuration not availabke, please reload the page`);
      return;
    }

    // if FB already exists return it
    if (this.document.defaultView['FB']) {
      //@ts-ignore
      subscriber.next(FB);
      subscriber.complete();
    } else if (this.document.defaultView.fbAsyncInit) {
      subscriber.error('FB is loading, try again')
      return;
    } else {
      const zone = this.zone;
      this.document.defaultView.fbAsyncInit = () => {
        //@ts-ignore
        FB.init({
          appId: this.config.FACEBOOK_APP_ID,
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: false, // parse social plugins on this page
          version: 'v6.0' // use graph api version
        });

        zone.run(() => {
          //@ts-ignore
          subscriber.next(FB);
          subscriber.complete();
        });
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          d.getElementById(id).remove();
        };
        js = d.createElement(s); js.id = id;
        js.src = "/assets/facebook-sdk.js";
        js.onerror = function(e){
          //@ts-ignore
          delete document.fbAsyncInit;
          zone.run(() => subscriber.error('Facebook JavaScript SDK script Loading Error'));
        };
        fjs.parentNode.insertBefore(js, fjs);
        //@ts-ignore
      }(document, 'script', 'facebook-jssdk'));
    }

    return () => {
      // if FB is not loaded, remove the this.document.defaultView.fbAsyncInit function so we can try again
      //@ts-ignore
      if (!document['FB']) {
        delete this.document.defaultView.fbAsyncInit;
      }
    }
  })

  constructor(
    public config: UiConfig,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Use Facebook JS SDK to get the accessToken
   *
   * @param scope
   */
  fbLogin(scope: string[]): Observable<{ accessToken: string }> {
    return new Observable<any>(subscriber => {
      // @ts-ignore
      const fb = this.document.defaultView.FB;

      if(!fb) {
        return subscriber.error('Facebook SDK is not loaded')
      }
      fb.login(function (response) {
        if (response.authResponse) {
          subscriber.next({
            accessToken: response.authResponse.accessToken
          });
          subscriber.complete();
        } else {
          subscriber.error({
            detail: 'login aborted or not authorized',
            data: response
          });

        }
      }, { scope: (scope || []).join(',') });
    });
  }

}
