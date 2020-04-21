import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';
import { registerWebPlugin } from '@capacitor/core';
import { FacebookLogin } from '@rdlabo/capacitor-facebook-login';
import { UiApiService } from '@slackmap/ui/api';

@Component({
  selector: 'sm-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnInit {

  constructor(
    private api: UiApiService,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      registerWebPlugin(FacebookLogin as any);
      //@ts-ignore
      if(!this.document.defaultView.fbAsyncInit) {

        //@ts-ignore
        this.document.defaultView.fbAsyncInit = function() {
          //@ts-ignore
          FB.init({
            // appId: '235127536543011', // prod
            appId: '306418119377317', // localhost
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: false, // parse social plugins on this page
            version: 'v2.8' // use graph api version
          });
          console.log('FB INIT')
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }

    }
  }
  async signIn(): Promise<void> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
      let user = { token: result.accessToken.token, userId: result.accessToken.userId }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          userinfo: JSON.stringify(user)
        }
      };
      console.log('RES', result, navigationExtras);
      this.api.authConnectFacebook({accessToken: result.accessToken.token}).subscribe({
        next: data => {
          console.log('TOKEN', data)
          this.api.setToken(data.apiToken);
          this.api.authMe().subscribe({
            next: u => {
              console.log('USER', u)
            },
            error: err => console.log('USER error', err),
          })
        },
        error: err => console.log('TOKEN Error', err),
      })
      // this.router.navigate(["/home"], navigationExtras);
    }
  }
  async getCurrentState() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    try {
      console.log(result);
      if (result && result.accessToken) {
        let user = { token: result.accessToken.token, userId: result.accessToken.userId }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            userinfo: JSON.stringify(user)
          }
        };
        // this.router.navigate(["/home"], navigationExtras);
      }
    } catch (e) {
      console.log(e)
    }
  }
}
