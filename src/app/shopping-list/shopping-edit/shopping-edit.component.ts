import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {  
  @ViewChild("nameInput") nameInput : ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;
  constructor() { }
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  ngOnInit() {
  }

  addNewIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement){
    const ingredient: Ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);   
    this.ingredientAdded.emit(ingredient);
  }
}