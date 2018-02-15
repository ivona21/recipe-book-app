import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../../shopping-list/ngrx/shopping-list.actions";
import { Ingredient } from "../../shared/ingredient.model";

import { Recipe } from "../recipe.model";
import { RecipesService } from '../recipes.service';
import { AuthService } from '../../auth/auth.service';
import { AppState } from "../../shopping-list/ngrx/shopping-list.reducers";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private router: Router,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipesService.getRecipeById(this.id);
      }
    )
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  private redirectToRecipeList() {
    this.router.navigate(["/recipes"]);
  }

  onEditRecipe() {
    console.log("in on edit recipe");
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["signin"])
    } else {
      console.log(":(")
      this.router.navigate(["edit"], { relativeTo: this.route });
    }
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.redirectToRecipeList();
  }
}
