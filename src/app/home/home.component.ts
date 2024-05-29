import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  Firestore,
  getFirestore,
  getDocs,
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
              timestamp: message['timestamp']?.toDate().toLocaleString('en-US', this.timeOptions),
            },
          );
        });
      });
    }

    searchLocation(location: String) {
      const locationQuery = query(collection(getFirestore(), 'posts'), where('lower_location', '==', location.toLowerCase()), orderBy('timestamp', 'desc'), limit(12));
      getDocs(locationQuery).then((snapshot) => {
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
              timestamp: message['timestamp']?.toDate().toLocaleString('en-US', this.timeOptions),
            },
          );
        });
      });
    }

    getPaceClass(pace: String) {
      if (pace === "Slow") {
        return 'post-tag slow';
      }
      if (pace === "Moderate") {
        return 'post-tag moderate';
      }
      return 'post-tag fast';
    }
}
