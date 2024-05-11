import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NewPostComponent } from './new-post/new-post.component';

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
  {
    path: 'new-post',
    title: 'New Post · RunMates',
    component: NewPostComponent,
  }
];
