import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-blog';
  constructor() {
    const config = {
        apiKey: "AIzaSyD1TrzzGu8xwJcxqvUiJqpWyHlggE1CteY",
        authDomain: "my-blog-48a8c.firebaseapp.com",
        databaseURL: "https://my-blog-48a8c.firebaseio.com",
        projectId: "my-blog-48a8c",
        storageBucket: "my-blog-48a8c.appspot.com",
        messagingSenderId: "765849792264",
        appId: "1:765849792264:web:f4f2a76c8782667f7946bd",
        measurementId: "G-YCGY14J0KB"
               };
    firebase.initializeApp(config);
  }
}
