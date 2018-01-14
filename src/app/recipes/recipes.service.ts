import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipesService {
    constructor(private shoppingListService: ShoppingListService) { };

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            "Losos",
            "Delicious and healthy",
            "https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg",
            [
                new Ingredient("losos", 1),
                new Ingredient("lemon", 2),
                new Ingredient("rosemary", 4)
            ]),
        new Recipe(
            "Pasta_vegetale",
            "Delicious pasta!",
            "http://images.media-allrecipes.com/images/75131.jpg",
            [
                new Ingredient("pasta", 1),
                new Ingredient("zuchini", 3),
                new Ingredient("cherry tomato", 10),
                new Ingredient("olive oil", 3)
            ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }

   getRecipeById(index: number){
    return this.recipes[index];
   }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}