import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toDisplay : string = "Recipes";
  title = 'app';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDFBcVDfNlIk2bjHhEZdFJzvEt05WpivZs",
      authDomain: "ng-recipe-book-b3d11.firebaseapp.com",
    });
  }

  onComponentChosen(component: string){
    this.toDisplay = component;
  }

  
}
