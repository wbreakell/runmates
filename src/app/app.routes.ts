import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NewAccountComponent } from './new-account/new-account.component';

const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['signin']);

export const routes: Routes = [
  {
    path: '',
    title: 'Home · RunMates',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToSignin },
  },
  {
    path: 'signin',
    title: 'Sign In · RunMates',
    component: SigninComponent,
  },
  {
    path: 'new-post',
    title: 'New Post · RunMates',
    component: NewPostComponent,
  },
  {
    path: 'new-account',
    title: 'Create Account · RunMates',
    component: NewAccountComponent,
  },
];
