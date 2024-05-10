import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private auth: Auth = inject(Auth);
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  async signin() {
    if (this.signinForm.valid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          this.signinForm.value.email!,
          this.signinForm.value.password!,
        );
        console.log(userCredential.user);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
