import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { NgForm } from "@angular/forms";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from "rxjs/Subscription";
import * as ShoppingListActions from "../ngrx/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }
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
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
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
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}