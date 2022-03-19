import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FeedsComponent } from './components/feeds/feeds.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/profile/edit/edit.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['feeds']);
const belongsToAccount = (next: any) => hasCustomClaim(`account-${next.params.id}`);


const routes: Routes = [
  { 
    path: 'login', component: LoginComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  { 
    path: 'register', component: RegisterComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  { path: 'feeds', component: FeedsComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { path: 'about', component: AboutComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { path: 'profile/:profileID', component: ProfileComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { path: 'edit', component: EditComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  {
    path: "", redirectTo: 'feeds', pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }