import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { NgForm } from "@angular/forms";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from "rxjs/Subscription";
import * as ShoppingListActions from "../ngrx/shopping-list.actions";
import { AppState } from "../../shopping-list/ngrx/shopping-list.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) { }
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient; 
  @ViewChild("shoppingListEditForm") shoppingListForm: NgForm;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: ingredient}));
    } else {
     this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));   
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}