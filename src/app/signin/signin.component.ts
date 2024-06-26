import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, User, user, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy {
  private router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  signinForm = new FormGroup({
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

  async signin() {
    if (this.signinForm.valid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          this.signinForm.value.email!,
          this.signinForm.value.password!,
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
