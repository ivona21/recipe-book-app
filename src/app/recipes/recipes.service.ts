import { EventEmitter} from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe("A Test Recipe", "This is simply a test",
            `http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg`),
        new Recipe("Pasta vegetale", "Delicious pasta!", "http://images.media-allrecipes.com/images/75131.jpg")
    ]

    getRecipes(){
        return this.recipes.slice();
    }

}