import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { AddRecipeComponent } from "./recipes/add-recipe/add-recipe.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "recipes", pathMatch: "full" },
    { path: "shopping-list", component: ShoppingListComponent },
    {
        path: "recipes", component: RecipesComponent, children: [
            { path: "new", component: AddRecipeComponent },
            { path: ":id/edit", component: AddRecipeComponent },
            { path: ":id", component: RecipeDetailComponent },
            { path: "", component: RecipeStartComponent }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}