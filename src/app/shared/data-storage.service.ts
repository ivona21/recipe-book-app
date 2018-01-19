import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import "rxjs/Rx";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    constructor(private recipesService : RecipesService,
                private http: Http) { };

    storeRecipes() {
        return this.http.put("https://ng-recipe-book-b3d11.firebaseio.com/recipes.json", this.recipesService.getRecipes());
    }

    retrieveRecipes(){
        this.http.get("https://ng-recipe-book-b3d11.firebaseio.com/recipes.json")
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();                
                    for (let recipe of recipes){
                        if (!recipe["ingredients"]){
                            console.log(recipe);
                            recipe.ingredients = [];
                        }
                    }
                    return recipes;
                }            
            )
            .subscribe(
                (recipes: Recipe[]) => {                
                this.recipesService.setRecipes(recipes);
            })
    }
}