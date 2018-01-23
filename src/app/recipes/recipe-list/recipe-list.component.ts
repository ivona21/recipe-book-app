import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();

    this.subscription = this.recipesService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
  }

  onNewRecipe(){
    if (!this.authService.isAuthenticated()){
      this.router.navigate(["signin"])
    } else {
      this.router.navigate(["new"], {relativeTo: this.route});
    }  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}