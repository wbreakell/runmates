import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // Obviously we want to have some sort of pop up or page where the user
  // can input all this stuff, but this is just a test for now.
  async createPost() {
    const docRef = await addDoc(collection(getFirestore(), 'posts'), {
      author: "test2",
      content: "This is another test",
      location: "San Francisco",
      pace: "Fast",
      title: "Another test post",
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  }
}
