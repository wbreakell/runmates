import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, User, user, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent implements OnDestroy {
  private router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  newAccountForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.router.navigate(['/']);
      }
    });
  }

  async createAccount() {
    if (this.newAccountForm.valid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          this.auth,
          this.newAccountForm.value.email!,
          this.newAccountForm.value.password!,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
