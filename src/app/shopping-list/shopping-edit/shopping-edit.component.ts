import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { NgForm } from "@angular/forms";
import { Ingredient } from "../../shared/ingredient.model";
import { Subscription } from "rxjs/Subscription";
import * as ShoppingListActions from "../ngrx/shopping-list.actions";
import { AppState } from "../../shopping-list/ngrx/shopping-list.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) { }
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;
  @ViewChild("shoppingListEditForm") shoppingListForm: NgForm;

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(
      (data) => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: ingredient }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}