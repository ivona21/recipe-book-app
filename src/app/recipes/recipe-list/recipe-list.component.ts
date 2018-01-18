import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();

    this.recipesService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
  }

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}