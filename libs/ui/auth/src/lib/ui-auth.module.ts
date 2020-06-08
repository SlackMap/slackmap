import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { UiApiModule } from '@slackmap/ui/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDialog } from './dialogs/login/login.dialog';
import * as fromAuth from './+auth/auth.reducer';
import { AuthEffects } from './+auth/auth.effects';
import { AuthFacade } from './+auth/auth.facade';
import { MatDialogModule } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { SignUpByFacebookComponent } from './components/sign-up-by-facebook/sign-up-by-facebook.component';
import { SignInDirective } from './directives/sign-in.directive';
import { DistancePipe } from './pipes/distance.pipe';

export const uiAuthRoutes: Route[] = [

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiAuthRoutes),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    UiApiModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthFacade,
  ],
  declarations: [
    LoginDialog,
    SignUpByFacebookComponent,
    SignInDirective,
    DistancePipe,
  ],
  exports: [
    SignInDirective,
    DistancePipe,
  ],
})
export class UiAuthModule {}
