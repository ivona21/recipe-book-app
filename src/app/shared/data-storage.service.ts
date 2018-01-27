import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import "rxjs/Rx";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipesService: RecipesService,
                private authService: AuthService) { };

    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpClient.put("https://ng-recipe-book-b3d11.firebaseio.com/recipes.json?auth=" + token, 
               this.recipesService.getRecipes(), {
                   observe: "body",
                   headers: new HttpHeaders().set("Authorization", "bearer 435sd35f4s35c13s5")
               });
    }

    retrieveRecipes() {
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>("https://ng-recipe-book-b3d11.firebaseio.com/recipes.json?auth=" + token)
            .map(
            (recipes) => {               
                for (let recipe of recipes) {
                    if (!recipe["ingredients"]) {
                        console.log(recipe);
                        recipe.ingredients = [];
                    }
                }
                return recipes;
            })
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipesService.setRecipes(recipes);
            })      
    }
}