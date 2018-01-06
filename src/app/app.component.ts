import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toDisplay : string = "Recipes";
  title = 'app';

  onComponentChosen(component: string){
    this.toDisplay = component;
  }
}
