import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Auth, User, user, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnDestroy {
  private router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (!aUser) {
        this.router.navigate(['/signin']);
      }
    });
  }

  async signout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
