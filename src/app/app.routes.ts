import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home · RunMates',
    component: HomeComponent,
  },
  {
    path: 'signin',
    title: 'Sign in · RunMates',
    component: SigninComponent,
  },
];
