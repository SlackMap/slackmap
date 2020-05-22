import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UiApiService } from '@slackmap/ui/api';
import { UiConfig } from '@slackmap/ui/config';
// import { Plugins, registerWebPlugin } from '@capacitor/core';
// import { FacebookLogin } from '@rdlabo/capacitor-facebook-login';

@Component({
  selector: 'sm-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnInit {

  constructor(
    private api: UiApiService,
    private config: UiConfig,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    console.log('CONFIG LOADED', this.config);
    if(this.config.isBrowser) {
      // registerWebPlugin(FacebookLogin as any);
      //@ts-ignore
      if(!this.document.defaultView.fbAsyncInit) {

        //@ts-ignore
        this.document.defaultView.fbAsyncInit = () => {
          //@ts-ignore
          FB.init({
            appId: this.config.FACEBOOK_APP_ID,
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
  async registerByFacebook(): Promise<void> {

  }
  async signIn(): Promise<void> {

    const result = await this.fbLogin(this.config.FACEBOOK_SCOPE);
    if (result && result.accessToken) {
      console.log('FB RESPONSE', result);
      this.api.authConnectFacebook({accessToken: result.accessToken}).subscribe({
        next: data => {
          console.log('LOGIN API RESPONSE', data)
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

  fbLogin(scope: string[]): Promise<{accessToken: string}> {
    // FB SDK
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.login(function(response) {
        if (response.authResponse) {
            resolve({
              accessToken: response.authResponse.accessToken
          });
        } else {
            reject({
                detail: 'login aborted or not authorized',
                data: response
            });

        }
    }, {scope: scope.join(',')});
    });

    // capacitor
    // return Plugins.FacebookLogin.login({ permissions: scope }).then(result => ({accessToken: result.accessToken.token}))
  }
}
