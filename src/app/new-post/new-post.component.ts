import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router } from '@angular/router';
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [NavigationComponent, ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {

  constructor(
    private router: Router,
  ) {}

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
    await addDoc(collection(getFirestore(), 'posts'), {
      author: "test1", // Get auth instead
      title: this.newPostForm.value.title!,
      content: this.newPostForm.value.content!,
      location: this.newPostForm.value.location!,
      pace: this.newPostForm.value.pace!,
      timestamp: serverTimestamp(),
    });
    this.router.navigateByUrl("/");
  }
}
