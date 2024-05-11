import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Firestore,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private _comments = [];
  private timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  public get comments(): any {
    return this._comments;
  }

  public set comments(val: any) {
    this._comments = val;
  }

  constructor(firestore: Firestore, route: ActivatedRoute) {
    const commentsQuery = query(collection(firestore, 'posts/' + route.snapshot.paramMap.get('id') +  '/comments'), orderBy('timestamp', 'asc'));
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
}
