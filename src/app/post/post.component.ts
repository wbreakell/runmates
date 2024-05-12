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
  getDoc,
  doc,
} from '@angular/fire/firestore';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NavigationComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private _comments = [];
  private timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  didIJustHitSubmitAndAmWaitingToLoad = false;
  title = "";
  content = "";
  pace = "";
  location = "";
  timestamp = "";

  public get comments(): any {
    return this._comments;
  }

  public set comments(val: any) {
    this._comments = val;
  }


  commentForm = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(private firestore: Firestore, private route: ActivatedRoute) {

    const postQuery = getDoc(doc(this.firestore, `posts/${this.route.snapshot.paramMap.get('id')}`));
    postQuery.then((resp) => {
      const message = resp.data();
      if (message) {
        this.title = message['title'];
        this.content = message['content'];
        this.pace = message['pace'];
        this.location = message['location'];
        this.timestamp = message['timestamp']?.toDate().toLocaleString(undefined, this.timeOptions);
      }
    })
    
    const commentsQuery = query(collection(this.firestore, `posts/${this.route.snapshot.paramMap.get('id')}/comments`), orderBy('timestamp', 'asc'));
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

  getPaceStyle(pace: String) {
    if (pace === "Slow") {
      return 'color: rgb(0, 91, 38); background-color: rgba(46, 204, 113, 0.08); border-color: rgba(32, 142, 79, 0.2);';
    }
    if (pace === "Moderate") {
      return 'color: rgb(130, 130, 0); background-color: rgba(243, 243, 18, 0.08); border-color: rgba(170, 170, 12, 0.2);';
    }
    return 'color: rgb(201, 7, 81); background-color: rgba(247, 39, 136, 0.08); border-color: rgba(172, 27, 102, 0.2);';
  }

  async comment() {
    this.commentForm.disable();
    this.didIJustHitSubmitAndAmWaitingToLoad = true;
    await addDoc(collection(getFirestore(), `posts/${this.route.snapshot.paramMap.get('id')}/comments`), {
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
