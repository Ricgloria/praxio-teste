import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {PasswordRecoverComponent} from './core/password-recover/password-recover.component';
import {RegisterComponent} from './core/register/register.component';
import {AuthGuard} from './core/guards/auth.guard';
import {LoggedGuard} from './core/guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      LoggedGuard
    ]
  },
  {
    path: 'recuperar-senha',
    component: PasswordRecoverComponent,
    canActivate: [
      LoggedGuard
    ]
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
    canActivate: [
      LoggedGuard
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
