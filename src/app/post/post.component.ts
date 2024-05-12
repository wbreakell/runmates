import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  addDoc,
  getFirestore,
  serverTimestamp,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NavigationComponent, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private _comments = [];
  private id = '';
  private timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  didIJustHitSubmitAndAmWaitingToLoad = false;

  public get comments(): any {
    return this._comments;
  }

  public set comments(val: any) {
    this._comments = val;
  }


  commentForm = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(firestore: Firestore, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id')!;
    const commentsQuery = query(collection(firestore, `posts/${this.id}/comments`), orderBy('timestamp', 'asc'));
    onSnapshot(commentsQuery, (snapshot) => {
      this.comments = [];
      snapshot.forEach((doc) => {
        const message = doc.data();
        this.comments.push(
          {
            id: doc.id,
            author: message['author'],
            content: message['content'],
            timestamp: message['timestamp']?.toDate().toLocaleString(undefined, this.timeOptions),
          },
        );
      });
    });
  }

  async comment() {
    this.commentForm.disable();
    this.didIJustHitSubmitAndAmWaitingToLoad = true;
    await addDoc(collection(getFirestore(), `posts/${this.id}/comments`), {
      author: "test2", // Get auth instead
      content: this.commentForm.value.content!,
      public: true,
      timestamp: serverTimestamp(),
    });
    this.commentForm.enable();
    this.commentForm.reset();
    this.didIJustHitSubmitAndAmWaitingToLoad = false;
  }
}
