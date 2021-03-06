import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

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
        const requestConfiguration = new HttpRequest("PUT", "https://ng-recipe-book-b3d11.firebaseio.com/recipes.json",
                this.recipesService.getRecipes(), {
                    reportProgress: true                  
                } )
        return this.httpClient.request(requestConfiguration);
    }

    retrieveRecipes() {      
        this.httpClient.get<Recipe[]>("https://ng-recipe-book-b3d11.firebaseio.com/recipes.json")
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