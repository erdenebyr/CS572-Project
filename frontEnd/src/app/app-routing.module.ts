import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { ProfileComponent } from './profile/profile.component';
// import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthGuard } from '../app/_helpers/auth.guard'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // { path: 'profileEdit', component: ProfileEditComponent, canActivate: [AuthGuard]}, 
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);