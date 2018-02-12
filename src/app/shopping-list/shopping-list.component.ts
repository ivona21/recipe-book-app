import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { AppState } from "../shopping-list/ngrx/shopping-list.reducers";


import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}> ;

  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select("shoppingList");  
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}