import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipesService.getRecipeById(this.id);
      }
    )
  }

  addIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
