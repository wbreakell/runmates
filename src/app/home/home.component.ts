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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _posts = [];
  private timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

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
          const message = doc.data();
          this.posts.push(
            {
              id: doc.id,
              title: message['title'],
              content: message['content'],
              pace: message['pace'],
              location: message['location'],
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
}
