import { Component } from '@angular/core';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Firestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _posts = [];

  public get posts(): any {
    return this._posts;
  }

  public set posts(val: any) {
    this._posts = val;
  }

  constructor(firestore: Firestore) {
      const recentPostsQuery = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc'), limit(12));
      onSnapshot(recentPostsQuery, (snapshot) => {
        this.posts = [];
        snapshot.forEach( (doc) => {
          var message = doc.data();
          this.posts.push(
            {
              id: doc.id,
              title: message['title'],
              content: message['content'],
              pace: message['pace'],
              location: message['location'],
            },
          );
        });
      });
    }
}
