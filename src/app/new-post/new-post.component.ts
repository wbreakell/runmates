import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  getDoc,
  doc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [NavigationComponent, ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  didIJustHitSubmitAndAmWaitingToLoad = false;

  newPostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    pace: new FormControl('', Validators.required),
  });

  // Need to validate that the fields are not empty.
  async createPost() {
    this.newPostForm.disable();
    this.didIJustHitSubmitAndAmWaitingToLoad = true;
    const currentId = this.auth.currentUser?.uid;
    const userDoc = await getDoc(doc(getFirestore(), `users/${currentId}`));
    await addDoc(collection(getFirestore(), 'posts'), {
      author: userDoc.data()!['name'],
      title: this.newPostForm.value.title!,
      content: this.newPostForm.value.content!,
      location: this.newPostForm.value.location!,
      pace: this.newPostForm.value.pace!,
      timestamp: serverTimestamp(),
    });
    this.router.navigateByUrl("/");
  }
}
